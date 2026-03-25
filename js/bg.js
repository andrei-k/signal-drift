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

  // Funky Pop Theme Colors (RGB) for high luminosity
  const colorOrange  = '255, 106, 0';
  const colorCyan    = '0, 229, 255';
  const colorEmerald = '28, 231, 131';
  const colors = [colorOrange, colorCyan, colorEmerald];

  let mouse = { x: -1000, y: -1000, radius: 120, active: false };

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
      return;
    }

    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.x = -1000;
    mouse.y = -1000;
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
    }

    update(centerX, centerY) {
      if (this.axis === 'x') {
        this.x += this.baseSpeed * this.dir;
      } else {
        this.y += this.baseSpeed * this.dir;
      }

      this.screenX = this.x;
      this.screenY = this.y;

      // Mouse interaction
      this.staticJitter.x = 0;
      this.staticJitter.y = 0;
      this.isFreakingOut = false;
      this.staticFlash--;

      if (mouse.active) {
        let mx   = mouse.x - this.screenX;
        let my   = mouse.y - this.screenY;
        let dist = Math.sqrt(mx * mx + my * my);

        if (dist < mouse.radius) {
          this.isFreakingOut = true;
          const intensity   = (mouse.radius - dist) / mouse.radius;
          const staticForce = 12 * intensity;

          this.staticJitter.x = (Math.random() - 0.5) * staticForce * 2;
          this.staticJitter.y = (Math.random() - 0.5) * staticForce * 2;
          this.staticFlash = 6;
        }
      }

      this.drawX = this.screenX + this.staticJitter.x;
      this.drawY = this.screenY + this.staticJitter.y;

      this.history.unshift({
        x: this.drawX, y: this.drawY,
        freak: this.isFreakingOut,
        flash: this.staticFlash > 0
      });

      if (this.history.length > this.historyLen) this.history.pop();

      if (
        (this.axis === 'x' && this.dir ===  1 && this.x > width + 200)  ||
        (this.axis === 'x' && this.dir === -1 && this.x < -200)         ||
        (this.axis === 'y' && this.dir ===  1 && this.y > height + 200) ||
        (this.axis === 'y' && this.dir === -1 && this.y < -200)
      ) {
        this.reset(false);
      }
    }

    // ── Drawing ─────────────────────────────────────────────────────

    drawTrail() {
      if (this.history.length <= 1) return;

      const opacity    = Math.min(0.9, 0.3 + this.z * 0.25);
      const trailColor = `rgba(${this.color}, ${opacity * 0.55})`;

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
      ctx.lineWidth   = 0.8 * this.z * 0.75;
      ctx.stroke();
    }

    drawNode() {
      const opacity = Math.min(0.9, 0.3 + this.z * 0.25);
      const size    = 1.8 * this.z;

      if (this.staticFlash > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(this.drawX - size * 1.4, this.drawY - size * 1.4, size * 2.8, size * 2.8);

        ctx.fillStyle = `rgba(${this.color}, 1)`;
        ctx.fillRect(this.drawX - size, this.drawY - size, size * 2, size * 2);
      } else {
        ctx.fillStyle = `rgba(${this.color}, ${opacity})`;
        ctx.fillRect(this.drawX - size / 2, this.drawY - size / 2, size, size);
      }
    }
  }

  // ── Particle management ────────────────────────────────────────────

  const baseParticleCount = () => Math.floor((width * height) / 6000);

  function initParticles() {
    particles = [];
    const n = baseParticleCount();
    for (let i = 0; i < n; i++) particles.push(new SignalNode());
  }

  // ── Connection drawing ─────────────────────────────────────────────

  function drawConnection(p1, p2, opacity, isFreaking) {
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
      ctx.lineWidth   = 0.6 * 0.7;
      ctx.moveTo(p1.drawX, p1.drawY);
      ctx.lineTo(p2.drawX, p2.drawY);
    }

    ctx.stroke();
  }

  // ── Main loop ──────────────────────────────────────────────────────

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // Connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].drawX - particles[j].drawX;
        let dy = particles[i].drawY - particles[j].drawY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        let zDiff = Math.abs(particles[i].z - particles[j].z);
        const maxDist = 90;

        if (distance < maxDist && zDiff < 1.0) {
          const opacity    = (1 - distance / maxDist) * 0.18;
          const isFreaking = particles[i].isFreakingOut || particles[j].isFreakingOut;
          drawConnection(particles[i], particles[j], opacity, isFreaking);
        }
      }
    }

    // Update + trails
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(centerX, centerY);
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
