import { renderStepIndicator, renderNav, attachNavListeners } from '../ui/wizard.js';
import { MODELS, getModel } from '../ui/models.js';
import { SAMPLE_IMAGES, DEMO_IMAGE_CHAINS, IMAGE_OBSERVATIONS } from '../data/demo-image.js';
import { EVOLUTION_STEPS, PROJECT_TIMELINE, ARTICLE_SECTIONS } from '../data/demo-evolution.js';

const IMAGE_STEPS = [
  { label: 'Select Image' },
  { label: 'Describe' },
  { label: 'Generate' },
  { label: 'Comparison' },
];

const VISION_MODELS = ['chatgpt', 'copilot', 'gemini-pro'];

const IMAGE_GEN_TOOLS = [
  { id: 'gpt-image', name: 'ChatGPT (GPT Image)', url: 'https://chatgpt.com', note: 'Ranked #1 in community blind tests. Best text rendering and prompt adherence. ~$0.04–0.12/image', color: '#10B981', bestFor: 'Text-heavy design, branding, precision', rank: '#1 overall' },
  { id: 'nano-banana', name: 'Nano Banana Pro', url: 'https://gemini.google.com', note: 'Ranked #2 in community blind tests. Native 4K output, 97% text accuracy across 100+ languages. Conversational editing via Gemini', color: '#3B82F6', bestFor: 'Speed, conversational editing, multilingual', rank: '#2 overall' },
  { id: 'copilot-designer', name: 'Copilot Designer', url: 'https://designer.microsoft.com', note: 'Microsoft Designer: free DALL-E-powered image generation, integrated into Copilot', color: '#0EA5E9', bestFor: 'Free, accessible, no setup needed', rank: 'Free tier' },
  { id: 'flux', name: 'Flux 2', url: 'https://blackforestlabs.ai', note: '5 variants (max/pro/flex/dev/klein). Open-weight dev model. 4MP output, multi-reference editing, precise color matching. ~$0.015–0.03/image', color: '#2563EB', bestFor: 'Photorealism, customization, production pipelines', rank: 'Top 12' },
  { id: 'midjourney', name: 'Midjourney V7', url: 'https://midjourney.com', note: 'Gold standard for aesthetics — composition, lighting, texture. Weak at text rendering. $10–120/mo', color: '#7C3AED', bestFor: 'Concept art, mood boards, visual beauty', rank: 'Top tier (aesthetics)' },
  { id: 'grok-aurora', name: 'Grok (Aurora)', url: 'https://grok.com', note: 'Experimental generator from xAI. Known quality issues — gibberish anatomy, ignored instructions', color: '#000000', bestFor: 'Experimental only', rank: 'Experimental' },
  { id: 'ideogram', name: 'Ideogram 3.0', url: 'https://ideogram.ai', note: '~90% text rendering accuracy. Behind frontier models but best for typography-heavy work', color: '#F43F5E', bestFor: 'Logos, posters, packaging with text', rank: 'Niche leader (text)' },
  { id: 'recraft', name: 'Recraft V4', url: 'https://recraft.ai', note: 'Feb 2026. Design-focused: balanced composition, refined detail. Production-ready SVG/vector export. Standard (1MP) and Pro (4MP) variants', color: '#F59E0B', bestFor: 'Logos, vector graphics, design assets', rank: 'Niche leader (design)' },
  { id: 'hunyuan', name: 'Hunyuan 3.0', url: 'https://hunyuan.tencent.com', note: 'Top open-source model. Excels at anime, character art, Eastern aesthetics. Commercial license', color: '#EC4899', bestFor: 'Anime, character art, open-source', rank: 'Top open-source' },
  { id: 'kimi', name: 'Kimi K2.5', url: 'https://kimi.moonshot.cn', note: 'Moonshot AI. Native multimodal with 256K context. Agent Swarm mode coordinates up to 100 parallel sub-agents', color: '#8B5CF6', bestFor: 'Cross-modal, CJK content, agentic workflows', rank: '—' },
  { id: 'meta-ai-img', name: 'Meta AI (Imagine)', url: 'https://meta.ai', note: 'Free image generation via Meta AI. Based on Llama + Emu models', color: '#6366F1', bestFor: 'Free, social sharing', rank: 'Free tier' },
  { id: 'canva-ai', name: 'Canva AI', url: 'https://www.canva.com/ai-image-generator/', note: 'Free AI image generation in Canva. Good for quick social media assets', color: '#00C4CC', bestFor: 'Quick social media assets', rank: 'Free tier' },
];

const CHEVRON_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

function getGenTool(id) {
  return IMAGE_GEN_TOOLS.find(t => t.id === id);
}

function buildDescriptionPrompt() {
  return `You are creating a reconstruction-grade description for an AI image generator.

Describe ONLY what is literally visible in the image. Do not infer story, meaning, or symbolism. Be specific and concrete. If you're unsure, say "unclear".

Output requirements:
- Text only (no markdown, no bullets).
- Keep it as long as necessary to completely describe the image.
- Include: subject(s), environment, composition/framing, viewpoint/camera distance, lighting, color palette, textures/materials, key objects and their positions (left/right/foreground/background), any text/logos, and approximate counts (e.g., "three birds").
- If you recognize the location or subject, mention it.
- Do NOT mention "AI", "prompt", or "image generator".
- Aspect ratio note: the recreated image should be 1:1 (square). Describe the scene as it would appear in a square crop.`;
}

function buildGenerationPrompt(description) {
  return `Create a single square (1:1) image that matches the description as literally as possible.

Do not add new objects or text. Do not change the setting, time of day, or art medium unless the description specifies it.

DESCRIPTION:
${description}`;
}

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function modelTip(name, model) {
  if (!model) return escHtml(name);
  const role = model.roleTag || '';
  const detail = model.strength || '';
  const bench = model.benchmark || '';
  return `<span class="model-tip">${escHtml(name)}<span class="model-tip__bubble"><span class="model-tip__role">${escHtml(role)}${bench ? ` <span class="model-tip__arena">${escHtml(bench)}</span>` : ''}</span><span class="model-tip__detail">${escHtml(detail)}</span></span></span>`;
}

function genToolTip(name, tool) {
  if (!tool) return escHtml(name);
  const rank = tool.rank || '';
  const bestFor = tool.bestFor || '';
  const note = tool.note || '';
  return `<span class="model-tip">${escHtml(name)}<span class="model-tip__bubble"><span class="model-tip__role">${escHtml(name)}${rank && rank !== '—' ? ` <span class="model-tip__arena">${escHtml(rank)}</span>` : ''}</span><span class="model-tip__detail">${escHtml(note)}</span>${bestFor ? `<span class="model-tip__best-for">Best for: ${escHtml(bestFor)}</span>` : ''}</span></span>`;
}

function createEmptyChain() {
  return { descriptionModel: '', description: '', generationTool: '', generatedImageDataUrl: null };
}

export class ImageFlow {
  constructor(globalState, rerender) {
    this.globalState = globalState;
    this.rerender = rerender;
    this.state = {
      hasStarted: false,
      currentStep: 0,
      selectedImage: null,
      chain: createEmptyChain(),
      isDemoLoaded: false,
      expandedDescription: -1,
    };
  }

  get currentImageSrc() {
    return this.state.selectedImage?.path || null;
  }

  render() {
    if (this.state.showEvolution) return this.renderEvolution();
    if (!this.state.hasStarted) return this.renderWelcome();
    switch (this.state.currentStep) {
      case 0: return this.renderSelectStep();
      case 1: return this.renderDescribeStep();
      case 2: return this.renderGenerateStep();
      case 3: return this.renderComparisonStep();
      default: return '';
    }
  }

  attachListeners() {
    if (this.state.showEvolution) { this._attachEvolutionListeners(); return; }
    if (!this.state.hasStarted) { this._attachWelcomeListeners(); return; }
    switch (this.state.currentStep) {
      case 0: this._attachSelectListeners(); break;
      case 1: this._attachDescribeListeners(); break;
      case 2: this._attachGenerateListeners(); break;
      case 3: this._attachComparisonListeners(); break;
    }
  }

  _syncGlobal() {
    this.globalState.hasStarted = this.state.hasStarted;
    this.globalState.isDemoLoaded = this.state.isDemoLoaded;
  }

  loadDemo() {
    const demo = DEMO_IMAGE_CHAINS;
    this.state.hasStarted = true;
    this.state.currentStep = 3;
    this.state.selectedImage = SAMPLE_IMAGES.find(s => s.id === demo.sampleId);
    this.state.isDemoLoaded = true;
    this._syncGlobal();
    this.state.chain = createEmptyChain();
    this.state.expandedDescription = -1;
    this.state.demoPage = 0;
    this.state.sgPage = 0;
    this.state.activeTab = this.state.activeTab || 'samePrompt';

    const sp = demo.samePrompt;
    const sg = demo.sameGenerator;
    this.state.demoSections = {
      samePrompt: {
        descriptionModel: sp.descriptionModel,
        descriptionModelName: sp.descriptionModelName,
        rows: sp.rows.map(row => ({
          imagePath: SAMPLE_IMAGES.find(s => s.id === row.sampleId)?.path,
          description: sp.descriptions?.[row.sampleId] || sp.description || '',
          items: row.generators.map(g => ({
            generationTool: g.generationTool,
            generationToolName: g.generationToolName,
            generatedImageDataUrl: g.generatedImagePath,
            isControl: !!g.isControl,
          })),
        })),
      },
      sameGenerator: {
        generationTool: sg.generationTool,
        generationToolName: sg.generationToolName,
        rows: (sg.rows || [{ originalImagePath: sg.originalImagePath, descriptions: sg.descriptions }]).map(row => ({
          originalImagePath: row.originalImagePath,
          items: row.descriptions.map(d => ({
            descriptionModel: d.descriptionModel,
            descriptionModelName: d.descriptionModelName,
            description: d.description,
            generatedImageDataUrl: d.generatedImagePath,
            isControl: !!d.isControl,
          })),
        })),
      },
    };

    this.rerender();
  }

  switchSection(section) {
    if (section === this.state.activeTab) return;
    this.state.activeTab = section;
    this.state.expandedDescription = -1;
    this.rerender();
  }

  // ---- WELCOME ----
  renderWelcome() {
    return `
      <section class="welcome-view">
        <div class="welcome-hero">
          <h2 class="welcome-title">The Visual Telephone Game</h2>
          <p class="welcome-tagline">Same image. Same instructions. Different models. Different results.</p>
          <p class="welcome-subtitle">AI models don't just have different abilities — they have different <em>perspectives</em>.</p>
        </div>

        <div class="welcome-cta">
          <button class="btn btn--ghost btn--lg" id="welcome-evolution">Behind the Scenes</button>
          <button class="btn btn--primary btn--lg" id="welcome-demo">See the Demo</button>
          <button class="btn btn--secondary btn--lg" id="welcome-start">Start Your Own</button>
        </div>
      </section>
    `;
  }

  _attachWelcomeListeners() {
    document.getElementById('welcome-start')?.addEventListener('click', () => {
      this.state.hasStarted = true;
      this.state.currentStep = 0;
      this._syncGlobal();
      this.rerender();
    });
    document.getElementById('welcome-demo')?.addEventListener('click', () => {
      this.loadDemo();
    });
    document.getElementById('welcome-evolution')?.addEventListener('click', () => {
      this.state.showEvolution = true;
      this.state.hasStarted = true;
      this.state.evolutionIdx = 0;
      this._syncGlobal();
      this.rerender();
    });
  }

  // ---- EVOLUTION / BEHIND THE SCENES (Blog Post) ----
  _renderArticleSection(section) {
    switch (section.type) {
      case 'header':
        return `
          <header class="blog-header">
            <h1 class="blog-title">${escHtml(section.title)}</h1>
            <p class="blog-subtitle">${escHtml(section.subtitle)}</p>
            <div class="blog-byline">By <strong>${escHtml(section.author.split(' — ')[0])}</strong>${section.author.includes(' — ') ? ' — ' + escHtml(section.author.split(' — ').slice(1).join(' — ')) : ''}</div>
            <div class="blog-divider"></div>
          </header>`;

      case 'heading':
        return `
          <div class="blog-section-heading">
            <span class="blog-section-number">${escHtml(section.number)}</span>
            <h2 class="blog-section-title">${escHtml(section.title)}</h2>
          </div>`;

      case 'prose':
        return `<div class="blog-prose">${section.html}</div>`;

      case 'callout':
        return `
          <blockquote class="blog-callout">
            <p>${escHtml(section.text)}</p>
          </blockquote>`;

      case 'image':
        return `
          <figure class="blog-figure" data-lightbox-src="${escAttr(section.src)}">
            <div class="blog-figure__img-wrap">
              <img src="${escAttr(section.src)}" alt="${escAttr(section.caption)}" loading="lazy" />
            </div>
            <figcaption class="blog-figure__caption">
              <span class="blog-figure__tool">${escHtml(section.tool)}</span>
              <span class="blog-figure__text">${escHtml(section.caption)}</span>
            </figcaption>
          </figure>`;

      case 'image-pair':
        return `
          <div class="blog-image-pair">
            ${section.images.map(img => `
              <figure class="blog-figure blog-figure--half" data-lightbox-src="${escAttr(img.src)}">
                <div class="blog-figure__img-wrap">
                  <img src="${escAttr(img.src)}" alt="${escAttr(img.caption)}" loading="lazy" />
                </div>
                <figcaption class="blog-figure__caption">
                  <span class="blog-figure__tool">${escHtml(img.tool)}</span>
                  <span class="blog-figure__text">${escHtml(img.caption)}</span>
                </figcaption>
              </figure>
            `).join('')}
          </div>`;

      case 'model-cards':
        return `
          <div class="blog-model-cards">
            ${section.cards.map(c => `
              <div class="blog-model-card" style="--card-accent: ${c.color}">
                <div class="blog-model-card__header">
                  <strong class="blog-model-card__name">${escHtml(c.model)}</strong>
                  <span class="blog-model-card__nick">${escHtml(c.nickname)}</span>
                </div>
                <p class="blog-model-card__text">${escHtml(c.text)}</p>
              </div>
            `).join('')}
          </div>`;

      case 'rebuild-table':
        return `
          <div class="blog-rebuild-table">
            ${section.rows.map(r => `
              <div class="blog-rebuild-row ${r.name === section.winner ? 'blog-rebuild-row--winner' : ''}">
                <code class="blog-rebuild-row__name">${escHtml(r.name)}</code>
                <span class="blog-rebuild-row__stack">${escHtml(r.stack)}</span>
                ${r.name === section.winner ? '<span class="blog-rebuild-row__badge">Winner</span>' : ''}
              </div>
            `).join('')}
          </div>`;

      case 'tools-grid':
        return `
          <div class="blog-tools-grid">
            ${section.tools.map(t => `
              <div class="blog-tool-card">
                <div class="blog-tool-card__name">${escHtml(t.name)}</div>
                <div class="blog-tool-card__models">${escHtml(t.models)}</div>
                <p class="blog-tool-card__role">${escHtml(t.role)}</p>
              </div>
            `).join('')}
          </div>`;

      default:
        return '';
    }
  }

  renderEvolution() {
    const showTimeline = this.state.evoTimelineExpanded;
    const timelineRows = PROJECT_TIMELINE.map((t, i) => {
      const tagCls = t.tag === 'pivot' ? 'evo-tl__tag--pivot' : t.tag === 'decision' ? 'evo-tl__tag--decision' : '';
      const tagLabel = t.tag === 'pivot' ? '↩ pivot' : t.tag === 'decision' ? '✓ decision' : '';
      return `<tr class="evo-tl__row ${tagCls}">
        <td class="evo-tl__num">${i + 1}</td>
        <td class="evo-tl__step">${escHtml(t.step)}${tagLabel ? `<span class="evo-tl__tag ${tagCls}">${tagLabel}</span>` : ''}</td>
        <td class="evo-tl__detail">${escHtml(t.detail)}</td>
        <td class="evo-tl__models">${escHtml(t.models)}</td>
      </tr>`;
    }).join('');

    const articleBody = ARTICLE_SECTIONS.map(s => this._renderArticleSection(s)).join('');

    return `
      <article class="blog-article">
        <nav class="blog-back-nav">
          <button class="btn btn--ghost" id="blog-back-home">← Back to Home</button>
        </nav>

        ${articleBody}

        <details class="blog-timeline-details" ${showTimeline ? 'open' : ''}>
          <summary class="blog-timeline-summary">Project Timeline — All 16 Steps</summary>
          <div class="blog-timeline-content">
            <table class="evo-tl__table">
              <thead><tr>
                <th class="evo-tl__th">#</th>
                <th class="evo-tl__th">Step</th>
                <th class="evo-tl__th">What happened</th>
                <th class="evo-tl__th">Models</th>
              </tr></thead>
              <tbody>${timelineRows}</tbody>
            </table>
          </div>
        </details>

        <footer class="blog-footer">
          <div class="blog-divider"></div>
          <p class="blog-footer__text">Built with Cursor, Claude Code, GPT Codex, Gemini CLI, and a lot of model-swapping.</p>
          <button class="btn btn--primary btn--lg" id="blog-see-demo">See the Demo</button>
        </footer>
      </article>
    `;
  }

  _exitEvolution({ silent = false } = {}) {
    this.state.showEvolution = false;
    this.state.hasStarted = false;
    this._syncGlobal();
    if (this._evoKeyHandler) { document.removeEventListener('keydown', this._evoKeyHandler); this._evoKeyHandler = null; }
    if (this._evoLightboxKeyHandler) { document.removeEventListener('keydown', this._evoLightboxKeyHandler); this._evoLightboxKeyHandler = null; }
    if (!silent) this.rerender();
  }

  _attachEvolutionListeners() {
    document.getElementById('blog-back-home')?.addEventListener('click', () => {
      this._exitEvolution();
    });

    document.getElementById('blog-see-demo')?.addEventListener('click', () => {
      this._exitEvolution({ silent: true });
      this.loadDemo();
    });

    const blogFigures = document.querySelectorAll('.blog-figure[data-lightbox-src]');
    const allImages = Array.from(blogFigures).map(fig => ({
      src: fig.getAttribute('data-lightbox-src'),
      label: fig.querySelector('.blog-figure__text')?.textContent || '',
      original: null,
    }));

    blogFigures.forEach((fig, i) => {
      fig.addEventListener('click', () => {
        this._lightboxItems = allImages;
        this._lightboxIdx = i;
        this._skipLens = true;
        const item = allImages[i];
        this._openLightbox(item.src, item.label, null);
      });
    });

    const handler = (e) => {
      if (!this.state.showEvolution) return;
      const lightboxOpen = document.querySelector('.lightbox-overlay--visible');
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          this._closeLightbox();
        } else {
          this._exitEvolution();
        }
        return;
      }
      if (lightboxOpen && this._lightboxItems?.length > 1) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          e.stopImmediatePropagation();
          const len = this._lightboxItems.length;
          this._lightboxIdx = (this._lightboxIdx + 1) % len;
          const next = this._lightboxItems[this._lightboxIdx];
          this._openLightbox(next.src, next.label, next.original);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          e.stopImmediatePropagation();
          const len = this._lightboxItems.length;
          this._lightboxIdx = (this._lightboxIdx - 1 + len) % len;
          const prev = this._lightboxItems[this._lightboxIdx];
          this._openLightbox(prev.src, prev.label, prev.original);
        }
      }
    };

    if (this._evoKeyHandler) document.removeEventListener('keydown', this._evoKeyHandler);
    this._evoKeyHandler = handler;
    document.addEventListener('keydown', handler);
  }

  // ---- STEP 0: SELECT IMAGE ----
  renderSelectStep() {
    const indicator = renderStepIndicator(0, IMAGE_STEPS);
    const canNext = !!(this.currentImageSrc);
    const nav = renderNav({ canGoBack: false, canGoNext: canNext, nextLabel: 'Next Step' });

    const sampleGrid = SAMPLE_IMAGES.map(img => {
      const isSelected = this.state.selectedImage?.id === img.id;
      return `
      <button class="image-card ${isSelected ? 'image-card--selected' : ''}"
        data-sample-id="${img.id}" aria-label="Select image ${img.id}" aria-pressed="${isSelected}">
        <div class="image-card__img-wrap">
          <img src="${img.path}" alt="Sample image" class="image-card__img" loading="lazy">
          ${isSelected ? `<div class="image-card__check" aria-hidden="true">✓</div>` : ''}
        </div>
      </button>
    `}).join('');

    const selectionStatus = this.currentImageSrc
      ? `<div class="selection-confirm">✓ Image selected. Click <em>Next Step</em> to continue</div>`
      : `<div class="selection-prompt">Click an image below to select it, then continue</div>`;

    return `
      <div class="wizard-step">
        ${indicator}
        <div class="step-content card">
          <h2 class="step-title">Choose an Image</h2>
          <p class="step-desc">Click any image to select it. We'll ask an AI model to describe it, then ask an AI tool to recreate it, and compare what survives.</p>

          ${selectionStatus}

          <div class="field-group">
            <div class="image-grid">${sampleGrid}</div>
          </div>

        </div>
        ${nav}
      </div>
    `;
  }

  _attachSelectListeners() {
    document.querySelectorAll('.image-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-sample-id');
        this.state.selectedImage = SAMPLE_IMAGES.find(s => s.id === id);
        this.rerender();
      });
    });

    attachNavListeners(null, () => {
      if (this.currentImageSrc) { this.state.currentStep = 1; this.rerender(); }
    });
  }

  // ---- STEP 1: DESCRIBE ----
  renderDescribeStep() {
    const indicator = renderStepIndicator(1, IMAGE_STEPS);
    const chain = this.state.chain;
    const prompt = buildDescriptionPrompt();
    const visionModels = MODELS.filter(m => VISION_MODELS.includes(m.id));
    const selectedModel = MODELS.find(m => m.id === chain.descriptionModel);
    const canNext = !!chain.descriptionModel && chain.description.trim().length > 0;
    const nav = renderNav({ canGoBack: true, canGoNext: canNext, nextLabel: 'Next Step' });

    return `
      <div class="wizard-step">
        ${indicator}
        <div class="step-content card">
          <h2 class="step-title">Step 1: AI Image Description</h2>
          <p class="step-desc">Copy the image and paste it into a vision-capable AI model along with the prompt below. Then paste the AI's description back here.</p>

          <div class="image-display">
            <img src="${this.currentImageSrc}" alt="Selected image" class="image-display__img">
          </div>

          <div class="field-group">
            <label class="field-label">Prompt to paste into your AI tool (along with the image)</label>
            <div class="prompt-block">
              <pre class="prompt-block__pre">${escHtml(prompt)}</pre>
              <button class="btn btn--ghost btn--sm copy-btn" data-copy="${escAttr(prompt)}" aria-label="Copy description prompt">Copy Prompt</button>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label" for="desc-model-select">Which model described the image?</label>
            <select class="select" id="desc-model-select" aria-label="Select vision model used">
              <option value="">Select a model</option>
              ${visionModels.map(m => `<option value="${m.id}" ${m.id === chain.descriptionModel ? 'selected' : ''}>${m.name}</option>`).join('')}
            </select>
            ${selectedModel ? `
            <div class="model-card">
              <div class="model-card__inner" style="border-left: 3px solid ${selectedModel.color}">
                <span class="model-card__tag">${selectedModel.roleTag}</span>
                <span class="model-card__strength">${selectedModel.strength}</span>
                ${selectedModel.url ? `<a href="${selectedModel.url}" target="_blank" rel="noopener" class="model-card__link">Open ${selectedModel.name} ↗</a>` : ''}
              </div>
            </div>` : ''}
          </div>

          <div class="field-group">
            <label class="field-label" for="description-output">Paste the AI's image description here</label>
            <textarea class="textarea" id="description-output" rows="8" placeholder="Paste the AI's detailed description of the image…" aria-label="AI image description">${escHtml(chain.description)}</textarea>
          </div>
        </div>
        ${nav}
      </div>
    `;
  }

  _attachDescribeListeners() {
    const chain = this.state.chain;

    document.getElementById('desc-model-select')?.addEventListener('change', e => {
      chain.descriptionModel = e.target.value;
      this.rerender();
    });

    document.getElementById('description-output')?.addEventListener('input', e => {
      chain.description = e.target.value;
      this._updateNavState();
    });

    this._attachCopyButtons();

    attachNavListeners(
      () => { this.state.currentStep = 0; this.rerender(); },
      () => {
        if (chain.descriptionModel && chain.description.trim()) {
          this.state.currentStep = 2; this.rerender();
        }
      }
    );
  }

  // ---- STEP 2: GENERATE ----
  renderGenerateStep() {
    const indicator = renderStepIndicator(2, IMAGE_STEPS);
    const chain = this.state.chain;
    const prompt = buildGenerationPrompt(chain.description);
    const selectedTool = IMAGE_GEN_TOOLS.find(t => t.id === chain.generationTool);
    const canNext = !!chain.generationTool && !!chain.generatedImageDataUrl;
    const nav = renderNav({ canGoBack: true, canGoNext: canNext, nextLabel: 'View Comparison' });

    const descModel = getModel(chain.descriptionModel);

    return `
      <div class="wizard-step">
        ${indicator}
        <div class="step-content card">
          <h2 class="step-title">Step 2: AI Image Generation</h2>
          <p class="step-desc">Copy the AI description into an image generation tool, then upload the result.</p>

          <div class="image-description-block" style="margin-bottom:var(--space-lg)">
            <div class="image-description-block__label">
              Description used
              <span class="image-description-block__model" style="border-left: 3px solid ${descModel?.color || '#ccc'}">
                by ${descModel?.name || chain.descriptionModel}
              </span>
            </div>
            <p class="image-description-block__text" style="font-size:0.9rem;max-height:6rem;overflow-y:auto">${escHtml(chain.description)}</p>
          </div>

          <div class="field-group">
            <label class="field-label">Generation prompt (from the AI's description)</label>
            <div class="prompt-block">
              <pre class="prompt-block__pre">${escHtml(prompt)}</pre>
              <button class="btn btn--ghost btn--sm copy-btn" data-copy="${escAttr(prompt)}" aria-label="Copy generation prompt">Copy Prompt</button>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label" for="gen-tool-select">Which tool generated the image?</label>
            <select class="select" id="gen-tool-select" aria-label="Select image generation tool">
              <option value="">Select a tool</option>
              ${IMAGE_GEN_TOOLS.map(t => `<option value="${t.id}" ${t.id === chain.generationTool ? 'selected' : ''}>${t.name}</option>`).join('')}
            </select>
            ${selectedTool ? `
            <div class="model-card">
              <div class="model-card__inner" style="border-left: 3px solid #6b7280">
                <span class="model-card__tag">${selectedTool.note}</span>
                <a href="${selectedTool.url}" target="_blank" rel="noopener" class="model-card__link">Open ${selectedTool.name} ↗</a>
              </div>
            </div>` : ''}
          </div>

          <div class="field-group">
            <label class="field-label">Upload the generated image</label>
            <label class="upload-zone upload-zone--generated ${chain.generatedImageDataUrl ? 'upload-zone--active' : ''}" for="generated-upload" tabindex="0" role="button" aria-label="Upload generated image">
              ${chain.generatedImageDataUrl
                ? `<img src="${chain.generatedImageDataUrl}" class="upload-zone__preview" alt="Generated image">`
                : `<div class="upload-zone__placeholder">
                    <span class="upload-zone__icon">🖼️</span>
                    <span>Upload the AI-generated image</span>
                    <span class="upload-zone__hint">Download it from the AI tool, then upload here</span>
                  </div>`
              }
              <input type="file" id="generated-upload" accept="image/*" class="upload-zone__input" aria-label="Upload generated image file">
            </label>
          </div>
        </div>
        ${nav}
      </div>
    `;
  }

  _attachGenerateListeners() {
    const chain = this.state.chain;

    document.getElementById('gen-tool-select')?.addEventListener('change', e => {
      chain.generationTool = e.target.value;
      this.rerender();
    });

    const genUpload = document.getElementById('generated-upload');
    const genZone = document.querySelector('.upload-zone--generated');

    genUpload?.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) this._readGeneratedFile(file);
    });

    genZone?.addEventListener('dragover', e => { e.preventDefault(); genZone.classList.add('upload-zone--dragover'); });
    genZone?.addEventListener('dragleave', () => genZone.classList.remove('upload-zone--dragover'));
    genZone?.addEventListener('drop', e => {
      e.preventDefault();
      genZone.classList.remove('upload-zone--dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) this._readGeneratedFile(file);
    });

    this._attachCopyButtons();

    attachNavListeners(
      () => { this.state.currentStep = 1; this.rerender(); },
      () => {
        if (chain.generationTool && chain.generatedImageDataUrl) {
          this.state.currentStep = 3; this.rerender();
        }
      }
    );
  }

  _readGeneratedFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
      this.state.chain.generatedImageDataUrl = e.target.result;
      this._updateNavState();
      this.rerender();
    };
    reader.readAsDataURL(file);
  }

  // ---- STEP 3: COMPARISON ----
  renderComparisonStep() {
    if (this.state.isDemoLoaded && this.state.demoSections) {
      return this._renderDemoComparison();
    }
    return this._renderUserComparison();
  }

  _renderUserComparison() {
    const origSrc = this.currentImageSrc;
    const chain = this.state.chain;
    const descModel = getModel(chain.descriptionModel);
    const genTool = getGenTool(chain.generationTool);
    const dotColor = descModel?.color || '#6b7280';
    const expandedIdx = this.state.expandedDescription;
    const isExpanded = expandedIdx === 0;
    const prompt = buildGenerationPrompt(chain.description);

    return `
      <div class="comparison-view comparison-view--image">
        <div class="comparison-header">
          <h2 class="comparison-title">The Visual Telephone Game</h2>
          <p class="comparison-subtitle">Same image. Different models. What did each one see?</p>
          <div class="model-chain-desc">
            <span class="chain-tab__dot" style="background:${dotColor};width:8px;height:8px;border-radius:50%;display:inline-block"></span>
            <span class="model-badge" style="border-color:${dotColor}">${escHtml(descModel?.name || chain.descriptionModel)}</span>
            <span class="chain-arrow">→ generated by</span>
            <span class="model-badge" style="border-color:#6b7280">${escHtml(genTool?.name || chain.generationTool)}</span>
          </div>
        </div>

        <div class="image-sbs image-sbs--multi" style="grid-template-columns: 1fr 1fr">
          <div class="image-sbs__col image-sbs__col--original">
            <div class="col-header col-header--neutral">
              <span class="col-label">Original</span>
            </div>
            <div class="image-sbs__img-wrap"><img src="${origSrc}" alt="Original" class="image-sbs__img"></div>
          </div>
          <div class="image-sbs__col" style="border-top:3px solid ${dotColor}">
            <div class="col-header">
              <span class="col-label" style="display:flex;align-items:center;gap:0.4rem">
                <span class="chain-tab__dot" style="background:${dotColor};width:10px;height:10px;border-radius:50%;display:inline-block;flex-shrink:0"></span>
                ${escHtml(descModel?.name || chain.descriptionModel)}
              </span>
              <span class="col-sublabel">→ ${escHtml(genTool?.name || chain.generationTool)}</span>
            </div>
            <div class="image-sbs__img-wrap"><img src="${chain.generatedImageDataUrl}" alt="Generated" class="image-sbs__img"></div>
          </div>
        </div>

        <div class="comp-prompts">
          <div class="comp-prompt-block ${isExpanded ? 'comp-prompt-block--expanded' : ''}" style="border-left:3px solid ${dotColor}">
            <div class="comp-prompt-block__header desc-toggle-btn" data-desc-idx="0">
              <div class="comp-prompt-block__who">
                <strong>${escHtml(descModel?.name || chain.descriptionModel)}</strong>
                <span style="color:var(--color-text-muted)">→ ${escHtml(genTool?.name || chain.generationTool)}</span>
              </div>
              <span class="comp-prompt-block__chevron">${CHEVRON_SVG}</span>
            </div>
            <div class="image-sbs__prompt-preview ${isExpanded ? 'image-sbs__prompt-preview--expanded' : ''}">
              <pre class="image-sbs__prompt-text">${escHtml(prompt)}</pre>
            </div>
          </div>
        </div>

        <div class="comparison-actions">
          <button class="btn btn--secondary" id="comp-back">← Back</button>
          <button class="btn btn--primary" id="new-chain">Start Over</button>
        </div>
      </div>
    `;
  }

  _renderDemoComparison() {
    const origSrc = this.currentImageSrc;
    const ds = this.state.demoSections;
    const expandedIdx = this.state.expandedDescription;
    const page = this.state.demoPage || 0;

    const sp = ds.samePrompt;
    const spDescModel = getModel(sp.descriptionModel);
    const spDotColor = spDescModel?.color || '#6b7280';
    const spIsExpanded = expandedIdx === 's0';

    const totalPages = sp.rows.length;
    const currentRow = sp.rows[page] || sp.rows[0];
    const spPrompt = buildGenerationPrompt(currentRow.description);
    const visibleItems = currentRow.items.filter(item => item.generatedImageDataUrl);

    const spGenCards = visibleItems.map(item => {
      const genTool = getGenTool(item.generationTool);
      const genColor = genTool?.color || '#6b7280';
      const controlBadge = item.isControl ? `<span class="control-badge">Baseline</span>` : '';
      const label = genTool?.name || item.generationToolName;
      return `
        <div class="demo-card ${item.isControl ? 'demo-card--control' : ''}" style="border-top: 3px solid ${genColor}">
          <div class="demo-card__header">
            <span class="demo-card__label">
              <span class="chain-tab__dot" style="background:${genColor};width:10px;height:10px;border-radius:50%;display:inline-block;flex-shrink:0"></span>
              ${genToolTip(label, genTool)}
              ${controlBadge}
            </span>
          </div>
          <div class="demo-card__img-wrap" data-lightbox-src="${item.generatedImageDataUrl}" data-lightbox-label="${escAttr(label)}" data-lightbox-original="${currentRow.imagePath}">
            <img src="${item.generatedImageDataUrl}" alt="Generated by ${escAttr(item.generationToolName)}" class="demo-card__img" loading="lazy">
          </div>
        </div>
      `;
    }).join('');

    const sg = ds.sameGenerator;
    const sgGenTool = getGenTool(sg.generationTool);
    const sgPage = this.state.sgPage || 0;
    const sgCurrentRow = sg.rows[sgPage] || sg.rows[0];

    const sgVisibleItems = sgCurrentRow.items.filter(item => item.generatedImageDataUrl);
    const sgGenLabel = sgGenTool?.name || sg.generationToolName;
    const sgCards = sgVisibleItems.map((item, i) => {
      const descModel = getModel(item.descriptionModel);
      const dotColor = descModel?.color || '#6b7280';
      const controlBadge = item.isControl ? `<span class="control-badge">Baseline</span>` : '';
      const label = descModel?.name || item.descriptionModelName;
      return `
        <div class="demo-card ${item.isControl ? 'demo-card--control' : ''}" style="border-top:3px solid ${dotColor}">
          <div class="demo-card__header">
            <span class="demo-card__label">
              <span class="chain-tab__dot" style="background:${dotColor};width:10px;height:10px;border-radius:50%;display:inline-block;flex-shrink:0"></span>
              Described by ${modelTip(label, descModel)}
              ${controlBadge}
            </span>
            <span class="col-sublabel" style="font-size:0.75rem;color:var(--color-text-subtle);margin-top:2px">Generated by ${escHtml(sgGenLabel)}</span>
          </div>
          <div class="demo-card__img-wrap" data-lightbox-src="${item.generatedImageDataUrl}" data-lightbox-label="Described by ${escAttr(label)}" data-lightbox-original="${sgCurrentRow.originalImagePath || origSrc}">
            <img src="${item.generatedImageDataUrl}" alt="From ${escAttr(item.descriptionModelName)} description" class="demo-card__img">
          </div>
        </div>
      `;
    }).join('');

    const sgPromptBlocks = sgCurrentRow.items.map((item, i) => {
      const descModel = getModel(item.descriptionModel);
      const dotColor = descModel?.color || '#6b7280';
      const isExpanded = expandedIdx === `g${i}`;
      const prompt = buildGenerationPrompt(item.description);
      const controlBadge = item.isControl ? `<span class="control-badge">Baseline</span>` : '';

      return `
        <div class="comp-prompt-block ${isExpanded ? 'comp-prompt-block--expanded' : ''}" style="border-left:3px solid ${dotColor}">
          <div class="comp-prompt-block__header desc-toggle-btn" data-desc-key="g${i}">
            <div class="comp-prompt-block__who">
              <strong>${modelTip(descModel?.name || item.descriptionModelName, descModel)}</strong>
              ${controlBadge}
            </div>
            <span class="comp-prompt-block__chevron">${CHEVRON_SVG}</span>
          </div>
          <div class="image-sbs__prompt-preview ${isExpanded ? 'image-sbs__prompt-preview--expanded' : ''}">
            <pre class="image-sbs__prompt-text">${escHtml(prompt)}</pre>
            <button class="btn btn--ghost btn--sm copy-btn demo-copy-btn" data-copy="${escAttr(prompt)}" aria-label="Copy description prompt">Copy Prompt</button>
          </div>
        </div>
      `;
    }).join('');

    const sgPageDots = sg.rows.map((_, i) =>
      `<button class="page-dot sg-page-dot ${i === sgPage ? 'page-dot--active' : ''}" data-sg-page="${i}" aria-label="Go to example ${i + 1}">${i + 1}</button>`
    ).join('');

    const pageDots = sp.rows.map((_, i) =>
      `<button class="page-dot ${i === page ? 'page-dot--active' : ''}" data-page="${i}" aria-label="Go to example ${i + 1}">${i + 1}</button>`
    ).join('');

    return `
      <div class="comparison-view comparison-view--image">
        <div class="comparison-header">
          <div class="demo-badge">Demo</div>
          <h2 class="comparison-title">The Visual Telephone Game</h2>
        </div>

        <div class="demo-section" data-demo-tab="samePrompt" style="${this.state.activeTab === 'samePrompt' ? '' : 'display:none'}">
          <div class="demo-section__header">
            <h3 class="demo-section__title">Same words in. Different images out.</h3>
            <p class="demo-section__subtitle">
              <strong>${modelTip(sp.descriptionModelName || spDescModel?.name, spDescModel)}</strong> wrote the most detailed description possible.
              The exact same prompt was sent to ${visibleItems.length} generators — any differences are purely about the tool.
            </p>
          </div>

          <div class="comp-prompts" style="margin-bottom:var(--space-lg)">
            <div class="comp-prompt-block ${spIsExpanded ? 'comp-prompt-block--expanded' : ''}" style="border-left:3px solid ${spDotColor}">
              <div class="comp-prompt-block__header desc-toggle-btn" data-desc-key="s0">
                <div class="comp-prompt-block__who">
                  <strong>${modelTip(sp.descriptionModelName || spDescModel?.name, spDescModel)}</strong>
                  <span class="comp-prompt-block__label comp-prompt-block__label--shared">↳ One prompt, ${visibleItems.length} generators</span>
                </div>
                <span class="comp-prompt-block__chevron">${CHEVRON_SVG}</span>
              </div>
              <div class="image-sbs__prompt-preview ${spIsExpanded ? 'image-sbs__prompt-preview--expanded' : ''}">
                <pre class="image-sbs__prompt-text">${escHtml(spPrompt)}</pre>
                <button class="btn btn--ghost btn--sm copy-btn demo-copy-btn" data-copy="${escAttr(spPrompt)}" aria-label="Copy description prompt">Copy Prompt</button>
              </div>
            </div>
          </div>

          <div class="demo-pager">
            <div class="demo-pager__dots">${pageDots}</div>
          </div>

          <div class="demo-showcase">
            <div class="demo-showcase__original">
              <div class="demo-card demo-card--original">
                <div class="demo-card__header">
                  <span class="demo-card__label"><strong>Original</strong></span>
                </div>
                <div class="demo-card__img-wrap" data-lightbox-src="${currentRow.imagePath}" data-lightbox-label="Original">
                  <img src="${currentRow.imagePath}" alt="Original" class="demo-card__img" loading="lazy">
                </div>
              </div>
            </div>
            <div class="demo-showcase__generated">
              ${spGenCards}
            </div>
          </div>

          <div class="comparison-takeaway">
            <p>Same words in. Different worlds out. The generator doesn't just follow instructions — it interprets them.</p>
          </div>
        </div>

        <div class="demo-section" data-demo-tab="sameGenerator" style="${this.state.activeTab === 'sameGenerator' ? '' : 'display:none'}">
          <div class="demo-section__header">
            <h3 class="demo-section__title">Same image. Different eyes. Different stories.</h3>
            <p class="demo-section__subtitle">
              Three models describe the same photo. All descriptions go to <strong>${genToolTip(sgGenTool?.name || sg.generationToolName, sgGenTool)}</strong>.
              The only variable is who wrote the prompt.
            </p>
          </div>

          <div class="comp-prompts" style="margin-bottom:var(--space-lg)">
            ${sgPromptBlocks}
          </div>

          <div class="demo-pager">
            <div class="demo-pager__dots">${sgPageDots}</div>
          </div>

          <div class="demo-showcase demo-showcase--sg">
            <div class="demo-showcase__original">
              <div class="demo-card demo-card--original">
                <div class="demo-card__header">
                  <span class="demo-card__label"><strong>Original</strong></span>
                </div>
                <div class="demo-card__img-wrap" data-lightbox-src="${sgCurrentRow.originalImagePath || origSrc}" data-lightbox-label="Original">
                  <img src="${sgCurrentRow.originalImagePath || origSrc}" alt="Original" class="demo-card__img">
                </div>
              </div>
            </div>
            <div class="demo-showcase__generated">
              ${sgCards}
            </div>
          </div>

          <div class="comparison-takeaway">
            <p>Every model edits what it sees. The question isn't whether your AI changes the picture — it's whether you notice.</p>
          </div>
        </div>

        <div class="comparison-actions">
          <button class="btn btn--primary" id="new-chain">Try It Yourself</button>
        </div>
      </div>
    `;
  }

  _attachComparisonListeners() {
    document.getElementById('comp-back')?.addEventListener('click', () => {
      this.state.currentStep = 2; this.rerender();
    });
    document.getElementById('new-chain')?.addEventListener('click', () => {
      this.state = {
        hasStarted: true,
        currentStep: 0,
        selectedImage: null,
        chain: createEmptyChain(),
        isDemoLoaded: false,
        expandedDescription: -1,
        demoSections: null,
        demoPage: 0,
        sgPage: 0,
        activeTab: 'samePrompt',
      };
      this.rerender();
    });

    document.querySelectorAll('.desc-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-desc-key');
        const idx = btn.getAttribute('data-desc-idx');
        const id = key != null ? key : parseInt(idx, 10);
        this.state.expandedDescription = this.state.expandedDescription === id ? -1 : id;
        this._updateDescToggleUI();
      });
    });

    document.querySelectorAll('.page-dot[data-page]').forEach(dot => {
      dot.addEventListener('click', () => {
        const p = parseInt(dot.getAttribute('data-page'), 10);
        if (!isNaN(p) && p !== this.state.demoPage) {
          this.state.demoPage = p;
          this.rerender();
        }
      });
    });

    document.querySelectorAll('.sg-page-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const p = parseInt(dot.getAttribute('data-sg-page'), 10);
        if (!isNaN(p) && p !== this.state.sgPage) {
          this.state.sgPage = p;
          this.state.expandedDescription = -1;
          this.rerender();
        }
      });
    });

    document.querySelectorAll('[data-lightbox-src]').forEach(wrap => {
      wrap.addEventListener('click', () => {
        const showcase = wrap.closest('.demo-showcase') || wrap.closest('.comparison-view');
        if (!showcase) return;
        const allSiblings = [...showcase.querySelectorAll('[data-lightbox-src]')];
        const generatedOnly = allSiblings.filter(el => el.getAttribute('data-lightbox-original'));
        const navItems = generatedOnly.map(el => {
          const src = el.getAttribute('data-lightbox-src');
          return {
            src,
            label: el.getAttribute('data-lightbox-label') || '',
            original: el.getAttribute('data-lightbox-original') || null,
            observations: IMAGE_OBSERVATIONS[src] || null,
          };
        });

        const isOriginal = !wrap.getAttribute('data-lightbox-original');
        if (isOriginal) {
          this._lightboxItems = navItems;
          this._lightboxIdx = -1;
          const src = wrap.getAttribute('data-lightbox-src');
          const label = wrap.getAttribute('data-lightbox-label') || '';
          this._openLightbox(src, label, null);
        } else {
          this._lightboxItems = navItems;
          this._lightboxIdx = generatedOnly.indexOf(wrap);
          const item = navItems[this._lightboxIdx];
          this._openLightbox(item.src, item.label, item.original);
        }
      });
    });

    if (this._demoPagerKeyHandler) {
      document.removeEventListener('keydown', this._demoPagerKeyHandler);
    }
    this._demoPagerKeyHandler = (e) => {
      if (e.key === 'Escape') { this._closeLightbox(); return; }
      const overlay = document.querySelector('.lightbox-overlay--visible');
      if (!overlay || !this._lightboxItems?.length) return;
      const len = this._lightboxItems.length;
      if (e.key === 'ArrowRight') {
        this._lightboxIdx = (this._lightboxIdx + 1) % len;
        const next = this._lightboxItems[this._lightboxIdx];
        this._openLightbox(next.src, next.label, next.original);
      } else if (e.key === 'ArrowLeft') {
        this._lightboxIdx = (this._lightboxIdx - 1 + len) % len;
        const prev = this._lightboxItems[this._lightboxIdx];
        this._openLightbox(prev.src, prev.label, prev.original);
      }
    };
    document.addEventListener('keydown', this._demoPagerKeyHandler);

    this._attachCopyButtons();
  }

  _getObservations(src) {
    if (!src) return null;
    const obs = IMAGE_OBSERVATIONS[src];
    if (obs && obs.length) return obs;
    const item = this._lightboxItems?.[this._lightboxIdx];
    if (item?.observations?.length) return item.observations;
    return null;
  }

  _openLightbox(src, label, originalSrc) {
    const hasOriginal = originalSrc && originalSrc !== src;
    const hasNav = this._lightboxItems && this._lightboxItems.length > 1;
    const observations = this._getObservations(src);

    const existing = document.querySelector('.lightbox-overlay--visible');
    if (existing) {
      const genImg = existing.querySelector('.lightbox__img--generated');
      const origImg = existing.querySelector('.lightbox__img--original');
      const structureMatches = hasOriginal ? !!origImg : !origImg;
      if (structureMatches) {
        if (genImg) { genImg.src = src; genImg.alt = escAttr(label); }
        if (origImg) { origImg.src = originalSrc || ''; origImg.classList.remove('lightbox__img--visible'); }
        const caption = existing.querySelector('.lightbox__caption');
        if (caption) caption.textContent = label;
        const toggleBtn = existing.querySelector('.lightbox__toggle-btn');
        if (toggleBtn) toggleBtn.textContent = 'Click to compare original';
        const lens = existing.querySelector('.lightbox__lens');
        if (lens) lens.classList.remove('lightbox__lens--active');
        const obsBtn = existing.querySelector('.lightbox__obs-btn');
        const obsPanel = existing.querySelector('.lightbox__obs-panel');
        const existingContainer = existing.querySelector('.lightbox__img-container');
        existingContainer?.classList.remove('lightbox__img-container--obs-active');
        if (obsBtn && obsPanel) {
          obsPanel.classList.remove('lightbox__obs-panel--visible');
          obsBtn.classList.remove('lightbox__obs-btn--active');
          if (observations?.length) {
            obsBtn.style.display = '';
            obsPanel.querySelector('.lightbox__obs-items').innerHTML =
              observations.map(o => `<p class="lightbox__obs-item">${escHtml(o)}</p>`).join('');
          } else {
            obsBtn.style.display = 'none';
          }
        }
        return;
      }
      existing.remove();
    }

    let overlay = document.querySelector('.lightbox-overlay');
    if (overlay) overlay.remove();

    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <div class="lightbox__inner">
        <button class="lightbox__close" aria-label="Close">✕</button>
        ${hasNav ? `<button class="lightbox__nav lightbox__nav--prev" aria-label="Previous image">‹</button>` : ''}
        ${hasNav ? `<button class="lightbox__nav lightbox__nav--next" aria-label="Next image">›</button>` : ''}
        <div class="lightbox__img-container">
          <img src="${src}" alt="${escAttr(label)}" class="lightbox__img lightbox__img--generated">
          ${hasOriginal ? `<img src="${originalSrc}" alt="Original" class="lightbox__img lightbox__img--original">` : ''}
          <div class="lightbox__lens"></div>
          <div class="lightbox__obs-panel"><div class="lightbox__obs-items">
            ${observations ? observations.map(o => `<p class="lightbox__obs-item">${escHtml(o)}</p>`).join('') : ''}
          </div></div>
        </div>
        <div class="lightbox__caption-bar">
          ${label ? `<span class="lightbox__caption">${escHtml(label)}</span>` : ''}
          ${hasOriginal ? `<button class="lightbox__toggle-btn" aria-label="Toggle original image">Click to compare original</button>` : ''}
          <button class="lightbox__obs-btn" aria-label="Show observations" ${observations ? '' : 'style="display:none"'}>Signal Lost</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('lightbox-overlay--visible'));
    });

    if (!this._skipLens) this._attachLightboxLens(overlay);

    if (hasNav) {
      overlay.querySelector('.lightbox__nav--prev')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const len = this._lightboxItems.length;
        this._lightboxIdx = (this._lightboxIdx - 1 + len) % len;
        const item = this._lightboxItems[this._lightboxIdx];
        this._openLightbox(item.src, item.label, item.original);
      });
      overlay.querySelector('.lightbox__nav--next')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const len = this._lightboxItems.length;
        this._lightboxIdx = (this._lightboxIdx + 1) % len;
        const item = this._lightboxItems[this._lightboxIdx];
        this._openLightbox(item.src, item.label, item.original);
      });
    }

    const obsBtn = overlay.querySelector('.lightbox__obs-btn');
    const obsPanel = overlay.querySelector('.lightbox__obs-panel');
    const imgContainer = overlay.querySelector('.lightbox__img-container');
    if (obsBtn && obsPanel) {
      obsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const visible = obsPanel.classList.toggle('lightbox__obs-panel--visible');
        obsBtn.classList.toggle('lightbox__obs-btn--active', visible);
        imgContainer?.classList.toggle('lightbox__img-container--obs-active', visible);
      });
    }

    if (hasOriginal) {
      const toggleBtn = overlay.querySelector('.lightbox__toggle-btn');
      const origImg = overlay.querySelector('.lightbox__img--original');
      const imgContainer = overlay.querySelector('.lightbox__img-container');

      const caption = overlay.querySelector('.lightbox__caption');
      const originalCaptionText = caption?.textContent;
      const toggle = () => {
        const showing = origImg.classList.toggle('lightbox__img--visible');
        toggleBtn.textContent = showing ? 'Click to switch back' : 'Click to compare original';
        if (caption) caption.textContent = showing ? 'Original' : originalCaptionText;
      };

      toggleBtn.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
    }

    const close = () => this._closeLightbox();
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('.lightbox__close')) close();
    });
  }

  _attachLightboxLens(overlay) {
    const imgContainer = overlay.querySelector('.lightbox__img-container');
    const lens = overlay.querySelector('.lightbox__lens');
    const genImg = overlay.querySelector('.lightbox__img--generated');
    if (!imgContainer || !lens || !genImg) return;

    const LENS_SIZE = 360;
    const ZOOM = 3;

    const updateLens = (e) => {
      const rect = genImg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        lens.classList.remove('lightbox__lens--active');
        return;
      }

      lens.classList.add('lightbox__lens--active');
      imgContainer.classList.add('lightbox__img-container--magnifying');

      const lensLeft = e.clientX - imgContainer.getBoundingClientRect().left - LENS_SIZE / 2;
      const lensTop = e.clientY - imgContainer.getBoundingClientRect().top - LENS_SIZE / 2;
      lens.style.left = `${lensLeft}px`;
      lens.style.top = `${lensTop}px`;

      const bgWidth = rect.width * ZOOM;
      const bgHeight = rect.height * ZOOM;
      const bgX = -(x * ZOOM - LENS_SIZE / 2);
      const bgY = -(y * ZOOM - LENS_SIZE / 2);

      const activeSrc = overlay.querySelector('.lightbox__img--original.lightbox__img--visible')
        ? overlay.querySelector('.lightbox__img--original').src
        : genImg.src;

      lens.style.backgroundImage = `url('${activeSrc}')`;
      lens.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
      lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
    };

    imgContainer.addEventListener('mousemove', updateLens);
    imgContainer.addEventListener('mouseenter', () => {
      imgContainer.classList.add('lightbox__img-container--magnifying');
    });
    imgContainer.addEventListener('mouseleave', () => {
      lens.classList.remove('lightbox__lens--active');
      imgContainer.classList.remove('lightbox__img-container--magnifying');
    });
  }

  _closeLightbox() {
    const overlay = document.querySelector('.lightbox-overlay');
    if (!overlay) return;
    this._skipLens = false;
    overlay.classList.remove('lightbox-overlay--visible');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
  }

  _updateDescToggleUI() {
    document.querySelectorAll('.desc-toggle-btn').forEach(btn => {
      const key = btn.getAttribute('data-desc-key');
      const idx = btn.getAttribute('data-desc-idx');
      const id = key != null ? key : parseInt(idx, 10);
      const isExpanded = this.state.expandedDescription === id;
      const block = btn.closest('.comp-prompt-block');
      const preview = block?.querySelector('.image-sbs__prompt-preview');
      block?.classList.toggle('comp-prompt-block--expanded', isExpanded);
      preview?.classList.toggle('image-sbs__prompt-preview--expanded', isExpanded);
    });
  }

  _attachCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy');
        navigator.clipboard.writeText(text).then(() => {
          const orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = orig; }, 1500);
        });
      });
    });
  }

  _updateNavState() {
    const nextBtn = document.getElementById('nav-next');
    if (!nextBtn) return;
    const s = this.state;
    const chain = s.chain;
    let enabled = false;
    if (s.currentStep === 0) enabled = !!this.currentImageSrc;
    if (s.currentStep === 1) enabled = !!chain.descriptionModel && chain.description.trim().length > 0;
    if (s.currentStep === 2) enabled = !!chain.generationTool && !!chain.generatedImageDataUrl;
    nextBtn.disabled = !enabled;
  }
}
