/**
 * "Opus" effect — a machine trying to reconstruct photo data, disturbed by noise.
 * Triggered by top-right corner.
 *
 * Concept: an AI image processor is crunching pixel data. Floating pixel blocks
 * of vivid photo-like colors drift in 3D space. The mouse is electromagnetic
 * interference that corrupts the data stream — particles glitch, scatter, and
 * accumulate visual noise. Sacred geometry scanlines and data-grid overlays
 * give the machine-processing feel.
 *
 * Visual layers:
 * 1. Data grid — faint orthogonal scan grid that warps near mouse
 * 2. Pixel blocks — colored rectangles at various z-depths (3D parallax)
 * 3. Glitch fragments — sharp angular shards ejected near mouse
 * 4. Data streams — vertical/horizontal lines of flowing "bits"
 * 5. Noise accumulation — static grain builds up where mouse lingers
 *
 * Implements the effect interface expected by bg.js.
 */

const TAU = Math.PI * 2;
let frame = 0;

// ── Photo-like color palette: vivid, punchy, diverse ────────────────
const PHOTO_COLORS = [
  [255, 87, 51],   // coral red
  [255, 195, 0],   // golden yellow
  [0, 200, 83],    // vivid green
  [0, 176, 255],   // sky blue
  [156, 39, 176],  // deep purple
  [255, 64, 129],  // hot pink
  [0, 230, 180],   // turquoise
  [255, 145, 77],  // tangerine
  [100, 120, 255], // periwinkle
  [230, 230, 230], // near white
  [255, 82, 82],   // bright red
  [38, 166, 154],  // teal
  [255, 215, 140], // cream
  [120, 200, 120], // soft green
  [200, 150, 255], // lavender
];

// ── Pixel block system — the floating "photo data" ──────────────────
const pixelBlocks = [];
const MAX_PIXELS = 120;

// ── Glitch fragment system ──────────────────────────────────────────
const glitchFrags = [];
const MAX_FRAGS = 40;

// ── Noise map — tracks where mouse has been ─────────────────────────
const NOISE_GRID = 20;
let noiseMap = null;
let noiseW = 0, noiseH = 0;

// ── Data stream system ──────────────────────────────────────────────
const dataStreams = [];
const MAX_STREAMS = 15;

function initNoiseMap(w, h) {
  noiseW = Math.ceil(w / NOISE_GRID);
  noiseH = Math.ceil(h / NOISE_GRID);
  noiseMap = new Float32Array(noiseW * noiseH);
}

class PixelBlock {
  constructor(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.z = 0.2 + Math.random() * 0.8;         // depth layer
    this.w = 3 + Math.random() * 12 * this.z;    // larger at front
    this.h = 3 + Math.random() * 12 * this.z;
    this.color = PHOTO_COLORS[Math.floor(Math.random() * PHOTO_COLORS.length)];
    this.alpha = 0.3 + this.z * 0.5;
    this.vx = (Math.random() - 0.5) * 0.3 * this.z;
    this.vy = -0.1 - Math.random() * 0.4 * this.z; // drift upward (data rising)
    this.rotation = (Math.random() - 0.5) * 0.1;
    this.spin = (Math.random() - 0.5) * 0.005;
    this.noise = 0;         // corruption level from mouse
    this.noiseDecay = 0.98;
    this.life = 1;
    this.screenW = w;
    this.screenH = h;
  }

  update(transition) {
    this.x += this.vx * (1 + transition * 0.5);
    this.y += this.vy * (1 + transition * 0.5);
    this.rotation += this.spin * (1 + this.noise * 5);
    this.noise *= this.noiseDecay;

    // wrap around edges
    if (this.x < -30) this.x = this.screenW + 20;
    if (this.x > this.screenW + 30) this.x = -20;
    if (this.y < -30) this.y = this.screenH + 20;
    if (this.y > this.screenH + 30) {
      this.y = -20;
      this.color = PHOTO_COLORS[Math.floor(Math.random() * PHOTO_COLORS.length)];
    }
  }

  draw(ctx, transition) {
    const a = this.alpha * transition;
    const [r, g, b] = this.color;
    const n = this.noise;

    // 3D parallax: closer blocks are bigger, more opaque, move more
    const scale = 0.5 + this.z * 0.5;
    const bw = this.w * scale * (1 + n * 2);
    const bh = this.h * scale * (1 + n * 0.5);

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    // main pixel block
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a * (0.6 + n * 0.4)})`;
    ctx.fillRect(-bw / 2, -bh / 2, bw, bh);

    // corruption: split RGB channels when noisy
    if (n > 0.15) {
      const shift = n * 6;
      ctx.globalAlpha = n * 0.5 * transition;
      ctx.fillStyle = `rgba(${r}, 0, 0, 0.5)`;
      ctx.fillRect(-bw / 2 + shift, -bh / 2 - shift * 0.5, bw, bh);
      ctx.fillStyle = `rgba(0, 0, ${b}, 0.5)`;
      ctx.fillRect(-bw / 2 - shift, -bh / 2 + shift * 0.5, bw, bh);
      ctx.globalAlpha = 1;
    }

    // subtle 3D edge highlight (depth cue)
    if (this.z > 0.5) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${a * 0.15 * this.z})`;
      ctx.lineWidth = 0.5;
      ctx.strokeRect(-bw / 2, -bh / 2, bw, bh);
    }

    ctx.restore();
  }
}

class GlitchFragment {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.w = 2 + Math.random() * 20;
    this.h = 1 + Math.random() * 4;
    this.color = color || PHOTO_COLORS[Math.floor(Math.random() * PHOTO_COLORS.length)];
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = (Math.random() - 0.5) * 8;
    this.life = 0.8 + Math.random() * 0.4;
    this.decay = 0.015 + Math.random() * 0.02;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96;
    this.vy *= 0.96;
    this.life -= this.decay;
  }

  draw(ctx, transition) {
    if (this.life <= 0) return;
    const [r, g, b] = this.color;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.life * transition * 0.8})`;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

class DataStream {
  constructor(w, h) {
    this.vertical = Math.random() > 0.3;
    if (this.vertical) {
      this.x = Math.random() * w;
      this.y = -20;
      this.len = 40 + Math.random() * 120;
    } else {
      this.x = -20;
      this.y = Math.random() * h;
      this.len = 40 + Math.random() * 120;
    }
    this.speed = 1.5 + Math.random() * 3;
    this.color = PHOTO_COLORS[Math.floor(Math.random() * PHOTO_COLORS.length)];
    this.alpha = 0.1 + Math.random() * 0.2;
    this.width = 0.5 + Math.random() * 1.5;
    this.alive = true;
    this.screenW = w;
    this.screenH = h;
  }

  update() {
    if (this.vertical) {
      this.y += this.speed;
      if (this.y - this.len > this.screenH) this.alive = false;
    } else {
      this.x += this.speed;
      if (this.x - this.len > this.screenW) this.alive = false;
    }
  }

  draw(ctx, transition) {
    if (!this.alive) return;
    const [r, g, b] = this.color;
    const a = this.alpha * transition;

    ctx.beginPath();
    if (this.vertical) {
      const grad = ctx.createLinearGradient(this.x, this.y - this.len, this.x, this.y);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
      grad.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${a})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${a * 1.5})`);
      ctx.strokeStyle = grad;
      ctx.moveTo(this.x, this.y - this.len);
      ctx.lineTo(this.x, this.y);
    } else {
      const grad = ctx.createLinearGradient(this.x - this.len, this.y, this.x, this.y);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
      grad.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${a})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${a * 1.5})`);
      ctx.strokeStyle = grad;
      ctx.moveTo(this.x - this.len, this.y);
      ctx.lineTo(this.x, this.y);
    }
    ctx.lineWidth = this.width;
    ctx.stroke();
  }
}

// ── Particle color: assign photo-color on init, corrupt with noise ──
function getCorruptedColor(base, noise) {
  const n = Math.min(1, noise);
  // at low noise: original color. at high: channel-shifted, blown out
  return {
    r: Math.min(255, base[0] + n * 80 * (Math.random() > 0.5 ? 1 : -0.5)),
    g: Math.min(255, base[1] + n * 60 * (Math.random() > 0.5 ? 1 : -0.5)),
    b: Math.min(255, base[2] + n * 80 * (Math.random() > 0.5 ? 1 : -0.5)),
  };
}

let lastMouseX = -1000, lastMouseY = -1000;

export const opusEffect = {
  id: 'opus',
  corner: 'top-right',

  modifyParticleUpdate(particle, transition) {
    if (!particle._opusInit) {
      particle._opusInit = true;
      particle._photoColor = PHOTO_COLORS[Math.floor(Math.random() * PHOTO_COLORS.length)];
      particle._noise = 0;
      particle._depth = 0.3 + Math.random() * 0.7;    // pseudo-3D depth
      particle._rotation = Math.random() * TAU;
      particle._shape = ['rect', 'tri', 'diamond', 'cross'][Math.floor(Math.random() * 4)];
      particle._blockW = 1.5 + Math.random() * 3;
      particle._blockH = 1.5 + Math.random() * 3;
    }

    particle._rotation += 0.003 * (1 + particle._noise * 8);
    particle._noise *= 0.97;

    // 3D parallax: modify screenX/Y based on depth relative to center
    const parallax = (particle._depth - 0.5) * transition * 0.06;
    particle.screenX += (particle.screenX - particle.x) * parallax;
    particle.screenY += (particle.screenY - particle.y) * parallax;
  },

  modifyMouseInteract(particle, intensity, staticForce, transition) {
    // accumulate noise (corruption from interference)
    particle._noise = Math.min(1, (particle._noise || 0) + intensity * 0.35);

    // glitch displacement: sharp angular offset
    const angle = Math.floor(Math.random() * 8) * (Math.PI / 4);
    const force = staticForce * (1 + particle._noise * 2);
    particle.staticJitter.x = Math.cos(angle) * force;
    particle.staticJitter.y = Math.sin(angle) * force;
    particle.staticFlash = 3;

    // eject glitch fragments
    if (Math.random() < intensity * 0.12 && glitchFrags.length < MAX_FRAGS) {
      glitchFrags.push(new GlitchFragment(
        particle.drawX || particle.screenX,
        particle.drawY || particle.screenY,
        particle._photoColor
      ));
    }

    return true;
  },

  // ── Trail: data-echo with chromatic aberration ─────────────────────

  drawTrail(ctx, particle, transition) {
    if (particle.history.length <= 2) return true;
    const n = particle._noise || 0;
    const [r, g, b] = particle._photoColor || [180, 190, 200];
    const depth = particle._depth || 0.5;
    const baseAlpha = (0.1 + depth * 0.15 + n * 0.15) * transition;

    // main trail
    ctx.beginPath();
    ctx.moveTo(particle.history[0].x, particle.history[0].y);
    for (let i = 1; i < particle.history.length; i++) {
      const pt = particle.history[i];
      ctx.lineTo(pt.x, pt.y);
    }
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha * 0.5})`;
    ctx.lineWidth = (0.4 + n * 1.2) * depth;
    ctx.stroke();

    // chromatic ghost trails when corrupted
    if (n > 0.1 && particle.history.length > 3) {
      const shift = n * 4;
      ctx.beginPath();
      ctx.moveTo(particle.history[0].x + shift, particle.history[0].y);
      for (let i = 1; i < particle.history.length; i++) {
        ctx.lineTo(particle.history[i].x + shift, particle.history[i].y);
      }
      ctx.strokeStyle = `rgba(${r}, 0, 0, ${baseAlpha * 0.25 * n})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(particle.history[0].x - shift, particle.history[0].y);
      for (let i = 1; i < particle.history.length; i++) {
        ctx.lineTo(particle.history[i].x - shift, particle.history[i].y);
      }
      ctx.strokeStyle = `rgba(0, 0, ${b}, ${baseAlpha * 0.25 * n})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    return true;
  },

  // ── Node: photo-pixel blocks, various shapes, 3D depth ────────────

  drawNode(ctx, particle, transition) {
    const n = particle._noise || 0;
    const [r, g, b] = particle._photoColor || [180, 190, 200];
    const depth = particle._depth || 0.5;
    const baseAlpha = (0.2 + depth * 0.4 + n * 0.3) * transition;
    const scale = (0.8 + depth * 0.8 + transition * 0.5 + n * 0.8);
    const bw = (particle._blockW || 2) * scale;
    const bh = (particle._blockH || 2) * scale;
    const rot = particle._rotation || 0;
    const shape = particle._shape || 'rect';

    ctx.save();
    ctx.translate(particle.drawX, particle.drawY);
    ctx.rotate(rot);

    const col = getCorruptedColor(particle._photoColor || [180, 190, 200], n);

    // shadow for 3D depth
    if (depth > 0.4) {
      const shadowOff = depth * 3;
      ctx.fillStyle = `rgba(0, 0, 0, ${0.1 * depth * transition})`;
      if (shape === 'rect') {
        ctx.fillRect(-bw / 2 + shadowOff, -bh / 2 + shadowOff, bw, bh);
      } else if (shape === 'diamond') {
        ctx.beginPath();
        ctx.moveTo(shadowOff, -bh + shadowOff);
        ctx.lineTo(bw + shadowOff, shadowOff);
        ctx.lineTo(shadowOff, bh + shadowOff);
        ctx.lineTo(-bw + shadowOff, shadowOff);
        ctx.closePath();
        ctx.fill();
      }
    }

    // main shape
    ctx.fillStyle = `rgba(${col.r | 0}, ${col.g | 0}, ${col.b | 0}, ${baseAlpha})`;

    if (shape === 'rect') {
      ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
    } else if (shape === 'tri') {
      ctx.beginPath();
      ctx.moveTo(0, -bh);
      ctx.lineTo(bw * 0.8, bh * 0.6);
      ctx.lineTo(-bw * 0.8, bh * 0.6);
      ctx.closePath();
      ctx.fill();
    } else if (shape === 'diamond') {
      ctx.beginPath();
      ctx.moveTo(0, -bh);
      ctx.lineTo(bw, 0);
      ctx.lineTo(0, bh);
      ctx.lineTo(-bw, 0);
      ctx.closePath();
      ctx.fill();
    } else {
      // cross
      const cw = bw * 0.35;
      ctx.fillRect(-cw / 2, -bh, cw, bh * 2);
      ctx.fillRect(-bw, -cw / 2, bw * 2, cw);
    }

    // RGB channel split at high noise
    if (n > 0.25) {
      const shift = n * 4;
      ctx.globalAlpha = n * 0.4 * transition;
      ctx.fillStyle = `rgba(${r}, 0, 0, 0.6)`;
      ctx.fillRect(-bw / 2 + shift, -bh / 2, bw, bh);
      ctx.fillStyle = `rgba(0, 0, ${b}, 0.6)`;
      ctx.fillRect(-bw / 2 - shift, -bh / 2, bw, bh);
      ctx.globalAlpha = 1;
    }

    // white flash on staticFlash
    if (particle.staticFlash > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * transition})`;
      ctx.fillRect(-bw / 2 - 1, -bh / 2 - 1, bw + 2, bh + 2);
    }

    ctx.restore();
    return true;
  },

  // ── Connections: subtle data-wire lines with depth fading ──────────

  drawConnection(ctx, p1, p2, distance, maxDist, opacity, isFreaking, transition) {
    const d1 = p1._depth || 0.5;
    const d2 = p2._depth || 0.5;
    const depthDiff = Math.abs(d1 - d2);

    // only connect particles at similar depths (3D coherence)
    if (depthDiff > 0.35) return true;

    const avgDepth = (d1 + d2) / 2;
    const depthFade = avgDepth * 0.6;
    const n1 = p1._noise || 0;
    const n2 = p2._noise || 0;
    const avgNoise = (n1 + n2) / 2;

    const [r1, g1, b1] = p1._photoColor || [180, 190, 200];
    const [r2, g2, b2] = p2._photoColor || [180, 190, 200];

    ctx.save();

    if (isFreaking) {
      // corrupted: jagged data-wire
      const segs = 3 + Math.floor(avgNoise * 5);
      ctx.beginPath();
      ctx.moveTo(p1.drawX, p1.drawY);
      for (let i = 1; i < segs; i++) {
        const t = i / segs;
        // step-wise movement: horizontal then vertical (data-bus style)
        if (i % 2 === 1) {
          ctx.lineTo(
            p1.drawX + (p2.drawX - p1.drawX) * t,
            p1.drawY + (p2.drawY - p1.drawY) * (t - 1 / segs)
          );
        } else {
          ctx.lineTo(
            p1.drawX + (p2.drawX - p1.drawX) * (t - 1 / segs),
            p1.drawY + (p2.drawY - p1.drawY) * t
          );
        }
      }
      ctx.lineTo(p2.drawX, p2.drawY);

      ctx.strokeStyle = `rgba(${(r1 + r2) >> 1}, ${(g1 + g2) >> 1}, ${(b1 + b2) >> 1}, ${opacity * depthFade * 2})`;
      ctx.lineWidth = 1 + avgNoise * 2;
      ctx.stroke();
    } else {
      // clean: thin dotted data line
      ctx.setLineDash([1, 4 + (1 - avgDepth) * 4]);
      ctx.beginPath();
      ctx.moveTo(p1.drawX, p1.drawY);
      ctx.lineTo(p2.drawX, p2.drawY);
      ctx.strokeStyle = `rgba(${(r1 + r2) >> 1}, ${(g1 + g2) >> 1}, ${(b1 + b2) >> 1}, ${opacity * depthFade * 0.5})`;
      ctx.lineWidth = 0.4 + avgDepth * 0.3;
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();
    return true;
  },

  // ── Per-frame: manage pixel blocks, data streams, noise map, grid ──

  onFrame(shared) {
    frame++;
    const { ctx, width, height, centerX, centerY, effectTransition, particles, SignalNode } = shared;

    // init noise map
    if (!noiseMap || Math.ceil(width / NOISE_GRID) !== noiseW) {
      initNoiseMap(width, height);
    }

    // get mouse position from canvas
    const canvas = ctx.canvas;
    const mouseX = lastMouseX;
    const mouseY = lastMouseY;

    // track mouse for noise map by checking particles that are freaking out
    for (const p of particles) {
      if (p.isFreakingOut && p.drawX !== undefined) {
        lastMouseX = p.drawX;
        lastMouseY = p.drawY;
        break;
      }
    }

    // ── Update noise map: deposit where mouse is, decay everywhere ──
    if (noiseMap) {
      // decay
      for (let i = 0; i < noiseMap.length; i++) {
        noiseMap[i] *= 0.995;
      }
      // deposit
      if (mouseX > 0 && mouseY > 0) {
        const gx = Math.floor(mouseX / NOISE_GRID);
        const gy = Math.floor(mouseY / NOISE_GRID);
        const radius = 3;
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const nx = gx + dx;
            const ny = gy + dy;
            if (nx >= 0 && nx < noiseW && ny >= 0 && ny < noiseH) {
              const dist = Math.sqrt(dx * dx + dy * dy);
              noiseMap[ny * noiseW + nx] = Math.min(1, noiseMap[ny * noiseW + nx] + 0.05 / (1 + dist));
            }
          }
        }
      }
    }

    // ── Draw data processing grid (faint scanlines) ──
    if (effectTransition > 0.1) {
      const gridAlpha = 0.025 * effectTransition;
      ctx.strokeStyle = `rgba(120, 160, 200, ${gridAlpha})`;
      ctx.lineWidth = 0.3;

      // horizontal scanlines
      const spacing = 40;
      for (let y = 0; y < height; y += spacing) {
        const warp = noiseMap ? (noiseMap[Math.floor(y / NOISE_GRID) * noiseW] || 0) * 15 : 0;
        ctx.beginPath();
        ctx.moveTo(0, y + warp);
        ctx.lineTo(width, y - warp);
        ctx.stroke();
      }

      // vertical scanlines (sparser)
      for (let x = 0; x < width; x += spacing * 2) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
    }

    // ── Draw accumulated noise (static grain) ──
    if (effectTransition > 0.2 && noiseMap) {
      for (let gy = 0; gy < noiseH; gy++) {
        for (let gx = 0; gx < noiseW; gx++) {
          const val = noiseMap[gy * noiseW + gx];
          if (val > 0.02) {
            const sx = gx * NOISE_GRID;
            const sy = gy * NOISE_GRID;
            // static grain: random pixels within the cell
            const grainCount = Math.floor(val * 8);
            for (let g = 0; g < grainCount; g++) {
              const px = sx + Math.random() * NOISE_GRID;
              const py = sy + Math.random() * NOISE_GRID;
              const pc = PHOTO_COLORS[Math.floor(Math.random() * PHOTO_COLORS.length)];
              const size = 0.5 + Math.random() * 2 * val;
              ctx.fillStyle = `rgba(${pc[0]}, ${pc[1]}, ${pc[2]}, ${val * effectTransition * 0.4})`;
              ctx.fillRect(px, py, size, size);
            }
          }
        }
      }
    }

    // ── Pixel blocks: spawn, update, draw ──
    while (pixelBlocks.length < MAX_PIXELS * effectTransition) {
      pixelBlocks.push(new PixelBlock(width, height));
    }

    for (let i = pixelBlocks.length - 1; i >= 0; i--) {
      const pb = pixelBlocks[i];
      pb.screenW = width;
      pb.screenH = height;
      pb.update(effectTransition);

      // corrupt pixel blocks near mouse
      if (mouseX > 0) {
        const dx = pb.x - mouseX;
        const dy = pb.y - mouseY;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 150) {
          pb.noise = Math.min(1, pb.noise + 0.03 * (1 - d / 150));
        }
      }

      pb.draw(ctx, effectTransition);
    }

    // trim excess blocks when fading out
    while (pixelBlocks.length > MAX_PIXELS * effectTransition + 1) {
      pixelBlocks.pop();
    }

    // ── Data streams ──
    if (effectTransition > 0.2 && frame % 8 === 0 && dataStreams.length < MAX_STREAMS) {
      dataStreams.push(new DataStream(width, height));
    }

    for (let i = dataStreams.length - 1; i >= 0; i--) {
      dataStreams[i].update();
      dataStreams[i].draw(ctx, effectTransition);
      if (!dataStreams[i].alive) dataStreams.splice(i, 1);
    }

    // ── Glitch fragments ──
    for (let i = glitchFrags.length - 1; i >= 0; i--) {
      glitchFrags[i].update();
      glitchFrags[i].draw(ctx, effectTransition);
      if (glitchFrags[i].life <= 0) glitchFrags.splice(i, 1);
    }

    // ── Processing indicator: rotating segmented ring at center ──
    if (effectTransition > 0.3) {
      const ringAlpha = 0.06 * effectTransition;
      const ringR = 35 + Math.sin(frame * 0.02) * 5;
      const rot = frame * 0.008;
      ctx.save();
      ctx.translate(centerX, centerY);

      for (let i = 0; i < 8; i++) {
        const a = rot + (TAU / 8) * i;
        const gap = 0.15;
        ctx.beginPath();
        ctx.arc(0, 0, ringR, a + gap, a + (TAU / 8) - gap);
        const segColor = PHOTO_COLORS[i % PHOTO_COLORS.length];
        ctx.strokeStyle = `rgba(${segColor[0]}, ${segColor[1]}, ${segColor[2]}, ${ringAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();
    }

    // ── Spawn extra particles ──
    if (Math.random() < 0.12 * effectTransition && particles.length < 350) {
      const p = new SignalNode();
      p.x = Math.random() * width;
      p.y = Math.random() * height;
      p.z = 0.3 + Math.random() * 0.5;
      particles.push(p);
    }

    // ── Cleanup on deactivation ──
    if (effectTransition < 0.01) {
      pixelBlocks.length = 0;
      glitchFrags.length = 0;
      dataStreams.length = 0;
      if (noiseMap) noiseMap.fill(0);
      for (const p of particles) {
        p._opusInit = false;
      }
    }
  }
};
