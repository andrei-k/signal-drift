/**
 * "Gemini" effect — psychedelic rainbow, triggered by bottom-right corner.
 *
 * Implements the effect interface expected by bg.js:
 *   modifyParticleUpdate(particle, transition)
 *   modifyMouseInteract(particle, intensity, staticForce, transition)
 *   drawTrail(ctx, particle, transition)   → boolean (true = handled)
 *   drawNode(ctx, particle, transition)    → boolean
 *   drawConnection(ctx, p1, p2, distance, maxDist, opacity, isFreaking, transition) → boolean
 *   onFrame(shared)                        → void
 */

export const geminiEffect = {
  id: 'gemini',
  corner: 'bottom-right',

  // ── Particle update overrides ──────────────────────────────────────

  modifyParticleUpdate(particle, transition) {
    particle.hueOffset = (particle.hueOffset || 0) + particle.z * 2.5;
  },

  modifyMouseInteract(particle, intensity, staticForce, transition) {
    particle.hueOffset = (particle.hueOffset || 0) + 15 * intensity;
    particle.hue = (particle.hue + Date.now() * 0.1 * intensity) % 360;

    particle.staticJitter.x =
      Math.sin(Date.now() * 0.005 + particle.y * 0.05) * staticForce * 6;
    particle.staticJitter.y =
      Math.cos(Date.now() * 0.004 + particle.x * 0.05) * staticForce * 6;

    return true; // we handled jitter — skip default
  },

  // ── Drawing: trail ─────────────────────────────────────────────────

  drawTrail(ctx, particle, transition) {
    if (particle.history.length <= 1) return true;

    const baseOpacity = Math.min(0.9, 0.3 + particle.z * 0.25);
    const opacity = Math.min(1, baseOpacity + transition * 0.3);

    let currentHue = particle.hue;
    if (particle.isFreakingOut) {
      currentHue = (currentHue + Date.now() * 0.5) % 360;
    }

    ctx.beginPath();
    ctx.moveTo(particle.history[0].x, particle.history[0].y);

    for (let i = 1; i < particle.history.length; i++) {
      const pt = particle.history[i];
      if (pt.freak) {
        ctx.lineTo(
          pt.x + (Math.random() - 0.5) * 5,
          pt.y + (Math.random() - 0.5) * 5
        );
      } else {
        ctx.lineTo(pt.x, pt.y);
      }
    }

    const last = particle.history[particle.history.length - 1];
    const grad = ctx.createLinearGradient(
      particle.history[0].x, particle.history[0].y,
      last.x, last.y
    );

    let h1 = particle.history[0].hue || particle.hue;
    let h2 = last.hue || particle.hue;
    if (particle.history[0].intensity > 0) h1 = (h1 + Date.now() * 0.5) % 360;
    if (last.intensity > 0) h2 = (h2 + Date.now() * 0.5) % 360;

    grad.addColorStop(0, `hsla(${h1}, 100%, 65%, ${opacity * 0.55})`);
    grad.addColorStop(1, `hsla(${h2}, 100%, 65%, 0)`);
    ctx.strokeStyle = grad;

    ctx.lineWidth = (0.8 + transition) * particle.z * 0.75;
    ctx.stroke();

    return true;
  },

  // ── Drawing: node ──────────────────────────────────────────────────

  drawNode(ctx, particle, transition) {
    const baseOpacity = Math.min(0.9, 0.3 + particle.z * 0.25);
    const opacity = Math.min(1, baseOpacity + transition * 0.3);

    let currentHue = particle.hue;
    if (particle.isFreakingOut) {
      currentHue = (currentHue + Date.now() * 0.5) % 360;
    }

    const size = (1.8 + transition * 1.2) * particle.z;

    if (particle.isFreakingOut) {
      ctx.fillStyle = `hsla(${currentHue}, 100%, 65%, ${opacity})`;
      ctx.beginPath();
      ctx.arc(particle.drawX, particle.drawY, size * 2.0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `hsla(${currentHue}, 100%, 65%, ${opacity * 0.3})`;
      ctx.beginPath();
      ctx.arc(particle.drawX, particle.drawY, size * 3.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = `hsla(${currentHue}, 100%, 65%, ${opacity})`;
      ctx.beginPath();
      ctx.arc(particle.drawX, particle.drawY, size * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    return true;
  },

  // ── Drawing: connection between two particles ──────────────────────

  drawConnection(ctx, p1, p2, distance, maxDist, opacity, isFreaking, transition) {
    ctx.beginPath();

    if (isFreaking) {
      const grad = ctx.createLinearGradient(
        p1.drawX, p1.drawY, p2.drawX, p2.drawY
      );
      grad.addColorStop(0, `hsla(${(p1.hue + Date.now() * 0.5) % 360}, 100%, 75%, ${opacity * 2})`);
      grad.addColorStop(1, `hsla(${(p2.hue + Date.now() * 0.5) % 360}, 100%, 75%, ${opacity * 2})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3.5;

      const midX = (p1.drawX + p2.drawX) / 2 + (Math.random() - 0.5) * 18;
      const midY = (p1.drawY + p2.drawY) / 2 + (Math.random() - 0.5) * 18;
      ctx.moveTo(p1.drawX, p1.drawY);
      ctx.lineTo(midX, midY);
      ctx.lineTo(p2.drawX, p2.drawY);
    } else {
      const grad = ctx.createLinearGradient(
        p1.drawX, p1.drawY, p2.drawX, p2.drawY
      );
      grad.addColorStop(0, `hsla(${p1.hue}, 100%, 65%, ${opacity})`);
      grad.addColorStop(1, `hsla(${p2.hue}, 100%, 65%, ${opacity})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2 * (0.7 + transition * 0.4);
      ctx.moveTo(p1.drawX, p1.drawY);
      ctx.lineTo(p2.drawX, p2.drawY);
    }

    ctx.stroke();
    return true;
  },

  // ── Per-frame hook (spawn extra particles, etc.) ───────────────────

  onFrame(shared) {
    if (Math.random() < 0.25) {
      const p = new shared.SignalNode();
      p.x = shared.centerX + (Math.random() - 0.5) * shared.width / 2;
      p.y = shared.centerY + (Math.random() - 0.5) * shared.height / 2;
      p.z = 0.2;
      shared.particles.push(p);
    }
  }
};
