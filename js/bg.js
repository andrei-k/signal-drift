import { geminiEffect } from './effects/gemini.js';
import { opusEffect }   from './effects/opus.js';

// ── Effect Registry ──────────────────────────────────────────────────
// Each corner maps to an effect module. Register new effects here.
// Top-left = exit, bottom-left = reserved for future effect.
const effects = {
  'bottom-right': geminiEffect,
  'top-right':    opusEffect,
  'bottom-left':  null,
};

export function initBackground(appState) {
  const canvas = document.createElement('canvas');
  canvas.id = 'cyber-bg';
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '-1',
    pointerEvents: 'none',
    opacity: '1'
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  // ── Effect state ───────────────────────────────────────────────────
  let activeEffect = null;      // currently active effect object (or null)
  let effectTransition = 0;     // smooth 0 → 1 ramp while an effect is on

  const appEl = document.getElementById('app');
  if (appEl) {
    appEl.style.transition =
      'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), ' +
      'filter 0.8s cubic-bezier(0.4, 0, 0.2, 1), ' +
      'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  // Funky Pop Theme Colors (RGB) for high luminosity
  const colorOrange  = '255, 106, 0';
  const colorCyan    = '0, 229, 255';
  const colorEmerald = '28, 231, 131';
  const colors = [colorOrange, colorCyan, colorEmerald];

  let mouse = { x: -1000, y: -1000, radius: 120, active: false };

  // ── Helpers ────────────────────────────────────────────────────────

  function activateEffect(effect) {
    if (!effect || activeEffect === effect) return;
    activeEffect = effect;
    if (appEl) {
      appEl.style.opacity = '0';
      appEl.style.pointerEvents = 'none';
      appEl.style.filter = 'blur(10px)';
      appEl.style.transform = 'scale(0.95)';
      appEl.style.visibility = 'hidden';
    }
  }

  function deactivateEffect() {
    if (!activeEffect) return;
    activeEffect = null;
    if (appEl) {
      appEl.style.visibility = 'visible';
      appEl.style.opacity = '1';
      appEl.style.pointerEvents = 'auto';
      appEl.style.filter = 'blur(0px)';
      appEl.style.transform = 'scale(1)';
    }
  }

  /**
   * Detect which corner the mouse is in.
   * Returns { action: 'activate', effect } or { action: 'exit' } or null.
   * When an effect is active, only the top-left exit corner is recognised;
   * all activation corners are locked out until the effect is dismissed.
   */
  function detectCorner(mx, my) {
    const d = 60; // trigger distance from edge
    if (mx < d && my < d) return { action: 'exit' };
    if (activeEffect) return null;
    if (mx > width  - d && my > height - d) return { action: 'activate', effect: effects['bottom-right'] };
    if (mx > width  - d && my < d)          return { action: 'activate', effect: effects['top-right'] };
    if (mx < d          && my > height - d) return { action: 'activate', effect: effects['bottom-left'] };
    return null;
  }

  // ── Resize ─────────────────────────────────────────────────────────

  function resize() {
    width  = canvas.width  = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  window.addEventListener('resize', resize);

  // ── Mouse ──────────────────────────────────────────────────────────

  window.addEventListener('mousemove', (e) => {
    if (appState && (appState.hasStarted || appState.isDemoLoaded)) {
      mouse.active = false;
      deactivateEffect();
      return;
    }

    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;

    // Corner detection
    const corner = detectCorner(mouse.x, mouse.y);
    if (corner) {
      if (corner.action === 'exit') {
        deactivateEffect();
      } else if (corner.action === 'activate' && !activeEffect && corner.effect) {
        activateEffect(corner.effect);
      }
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // ESC exits any active effect
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') deactivateEffect();
  });

  // ── Signal Node (core particle) ────────────────────────────────────

  class SignalNode {
    constructor() {
      this.reset(true);
      const sliceX = Math.floor(Math.random() * 6);
      const sliceY = Math.floor(Math.random() * 6);
      this.x = (width / 6 * sliceX) + 20 + (Math.random() * (width / 6 - 40));
      this.y = (height / 6 * sliceY) + 20 + (Math.random() * (height / 6 - 40));
    }

    reset(initial = false) {
      this.axis = Math.random() > 0.5 ? 'x' : 'y';
      this.dir  = Math.random() > 0.5 ? 1 : -1;

      if (!initial) {
        if (this.axis === 'x') {
          this.x = this.dir === 1 ? -100 : width + 100;
          this.y = Math.random() * height;
        } else {
          this.x = Math.random() * width;
          this.y = this.dir === 1 ? -100 : height + 100;
        }
      }

      this.z         = Math.random() * 0.8 + 0.4;
      this.baseSpeed = (Math.random() * 0.8 + 0.3) * this.z;
      this.color     = colors[Math.floor(Math.random() * colors.length)];

      this.history    = [];
      this.historyLen = Math.floor(Math.random() * 28 + 12);

      this.staticJitter = { x: 0, y: 0 };
      this.staticFlash  = 0;
      this.hueOffset    = 0;
    }

    update(scaleOffset, centerX, centerY) {
      const speedMult = 1 + (effectTransition * 0.8);

      if (this.axis === 'x') {
        this.x += this.baseSpeed * this.dir * speedMult;
      } else {
        this.y += this.baseSpeed * this.dir * speedMult;
      }

      let dxFromCenter = this.x - centerX;
      let dyFromCenter = this.y - centerY;
      const currentScale = 1 + (scaleOffset * this.z * 0.4);

      this.screenX = centerX + dxFromCenter * currentScale;
      this.screenY = centerY + dyFromCenter * currentScale;

      // Base hue (always computed — effects may override further)
      if (activeEffect) {
        activeEffect.modifyParticleUpdate(this, effectTransition);
      }
      this.hue = (Date.now() * 0.05 + this.screenX * 0.2 + this.screenY * 0.2 + this.z * 150 + (this.hueOffset || 0)) % 360;

      // Mouse interaction
      this.staticJitter.x = 0;
      this.staticJitter.y = 0;
      this.isFreakingOut = false;
      this.staticFlash--;

      if (mouse.active) {
        let mx   = mouse.x - this.screenX;
        let my   = mouse.y - this.screenY;
        let dist = Math.sqrt(mx * mx + my * my);

        let interactRadius = mouse.radius * (1 + effectTransition * 1.5);

        if (dist < interactRadius) {
          this.isFreakingOut = true;
          const intensity   = (interactRadius - dist) / interactRadius;
          const staticForce = 12 * intensity * (1 + effectTransition * 2.0);

          let handled = false;
          if (activeEffect && activeEffect.modifyMouseInteract) {
            handled = activeEffect.modifyMouseInteract(this, intensity, staticForce, effectTransition);
          }

          if (!handled) {
            this.staticJitter.x = (Math.random() - 0.5) * staticForce * 2;
            this.staticJitter.y = (Math.random() - 0.5) * staticForce * 2;
            this.staticFlash = 6;
          }
        }
      }

      this.drawX = this.screenX + this.staticJitter.x;
      this.drawY = this.screenY + this.staticJitter.y;

      this.history.unshift({
        x: this.drawX, y: this.drawY,
        freak: this.isFreakingOut,
        flash: this.staticFlash > 0,
        hue: this.hue,
        intensity: this.isFreakingOut ? 1 : 0
      });

      const maxLen = this.historyLen + (effectTransition * 6);
      if (this.history.length > maxLen) this.history.pop();

      if (
        (this.axis === 'x' && this.dir ===  1 && this.x > width + 200)  ||
        (this.axis === 'x' && this.dir === -1 && this.x < -200)         ||
        (this.axis === 'y' && this.dir ===  1 && this.y > height + 200) ||
        (this.axis === 'y' && this.dir === -1 && this.y < -200)
      ) {
        this.reset(false);
      }
    }

    // ── Default drawing (no effect active) ───────────────────────────

    drawTrailDefault() {
      if (this.history.length <= 1) return;

      const baseOpacity = Math.min(0.9, 0.3 + this.z * 0.25);
      const opacity     = Math.min(1, baseOpacity + effectTransition * 0.3);
      const trailColor  = `rgba(${this.color}, ${opacity * 0.55})`;

      ctx.beginPath();
      ctx.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 1; i < this.history.length; i++) {
        let pt = this.history[i];
        if (pt.freak) {
          ctx.lineTo(
            pt.x + (Math.random() - 0.5) * 5,
            pt.y + (Math.random() - 0.5) * 5
          );
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }

      ctx.strokeStyle = trailColor;
      ctx.lineWidth   = (0.8 + effectTransition) * this.z * 0.75;
      ctx.stroke();
    }

    drawNodeDefault() {
      const baseOpacity  = Math.min(0.9, 0.3 + this.z * 0.25);
      const opacity      = Math.min(1, baseOpacity + effectTransition * 0.3);
      const displayColor = `rgba(${this.color}, 1)`;
      const size         = (1.8 + effectTransition * 1.2) * this.z;

      if (this.staticFlash > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(this.drawX - size * 1.4, this.drawY - size * 1.4, size * 2.8, size * 2.8);

        ctx.fillStyle = displayColor;
        ctx.fillRect(this.drawX - size, this.drawY - size, size * 2, size * 2);
      } else {
        ctx.fillStyle = `rgba(${this.color}, ${opacity})`;
        ctx.fillRect(this.drawX - size / 2, this.drawY - size / 2, size, size);
      }
    }

    // ── Delegating draw calls ────────────────────────────────────────

    drawTrail() {
      if (activeEffect && activeEffect.drawTrail) {
        if (activeEffect.drawTrail(ctx, this, effectTransition)) return;
      }
      this.drawTrailDefault();
    }

    drawNode() {
      if (activeEffect && activeEffect.drawNode) {
        if (activeEffect.drawNode(ctx, this, effectTransition)) return;
      }
      this.drawNodeDefault();
    }
  }

  // ── Particle management ────────────────────────────────────────────

  const baseParticleCount = () => Math.floor((width * height) / 6000);

  function initParticles() {
    particles = [];
    const n = baseParticleCount();
    for (let i = 0; i < n; i++) particles.push(new SignalNode());
  }

  // ── Default connection drawing ─────────────────────────────────────

  function drawConnectionDefault(p1, p2, opacity, isFreaking, transition) {
    ctx.beginPath();

    if (isFreaking) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 1.8})`;
      ctx.lineWidth   = 2;

      const midX = (p1.drawX + p2.drawX) / 2 + (Math.random() - 0.5) * 18;
      const midY = (p1.drawY + p2.drawY) / 2 + (Math.random() - 0.5) * 18;
      ctx.moveTo(p1.drawX, p1.drawY);
      ctx.lineTo(midX, midY);
      ctx.lineTo(p2.drawX, p2.drawY);
    } else {
      ctx.strokeStyle = `rgba(${p1.color}, ${opacity})`;
      ctx.lineWidth   = 0.6 * (0.7 + transition * 0.4);
      ctx.moveTo(p1.drawX, p1.drawY);
      ctx.lineTo(p2.drawX, p2.drawY);
    }

    ctx.stroke();
  }

  // ── Main loop ──────────────────────────────────────────────────────

  function animate() {
    // Smooth transition ramp
    if (activeEffect) {
      effectTransition += (1 - effectTransition) * 0.04;
    } else {
      effectTransition += (0 - effectTransition) * 0.04;
    }

    ctx.clearRect(0, 0, width, height);

    const centerX     = width / 2;
    const centerY     = height / 2;
    const scaleOffset = effectTransition * 4.0;

    // Let active effect run per-frame logic (spawn particles, etc.)
    if (activeEffect && activeEffect.onFrame) {
      activeEffect.onFrame({
        ctx, width, height, centerX, centerY,
        effectTransition, particles, SignalNode
      });
    }

    // Trim excess particles when no effect is active
    if (!activeEffect && particles.length > baseParticleCount()) {
      particles.pop();
    }

    // Connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].drawX - particles[j].drawX;
        let dy = particles[i].drawY - particles[j].drawY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        let zDiff  = Math.abs(particles[i].z - particles[j].z);
        const maxDist = 90 + (effectTransition * 150);

        if (distance < maxDist && zDiff < 1.0) {
          const opacity    = (1 - distance / maxDist) * (0.18 + effectTransition * 0.25);
          const isFreaking = particles[i].isFreakingOut || particles[j].isFreakingOut;

          let handled = false;
          if (activeEffect && activeEffect.drawConnection) {
            handled = activeEffect.drawConnection(
              ctx, particles[i], particles[j],
              distance, maxDist, opacity, isFreaking, effectTransition
            );
          }
          if (!handled) {
            drawConnectionDefault(particles[i], particles[j], opacity, isFreaking, effectTransition);
          }
        }
      }
    }

    // Update + trails
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(scaleOffset, centerX, centerY);
      particles[i].drawTrail();
    }

    // Nodes (on top)
    for (let i = 0; i < particles.length; i++) {
      particles[i].drawNode();
    }

    requestAnimationFrame(animate);
  }

  resize();
  animate();
}
