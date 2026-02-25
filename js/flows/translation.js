import { renderStepIndicator, renderNav, attachNavListeners } from '../ui/wizard.js';
import { MODELS, getModel } from '../ui/models.js';
import { parseAnalysis } from '../analysis/parser.js';
import { annotateText, renderScoreBadge } from '../analysis/renderer.js';
import { DEMO_MONTREAL, SAMPLE_QUEBEC_TEXT } from '../data/demo-translation.js';

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'fr-qc', label: 'French (Quebec)' },
  { id: 'fr-fr', label: 'French (France)' },
  { id: 'es', label: 'Spanish' },
  { id: 'zh', label: 'Mandarin' },
];

function getLangLabel(id) {
  return LANGUAGES.find(l => l.id === id)?.label || id;
}

function buildTranslationPrompt(text, targetLangId) {
  const langLabel = getLangLabel(targetLangId);
  if (targetLangId === 'fr-qc') {
    return `Translate the following text to Quebec French. Use local idioms, informal register, and Québécois expressions where appropriate.\n\n${text}`;
  } else if (targetLangId === 'fr-fr') {
    return `Translate the following text to standard French (France).\n\n${text}`;
  }
  return `Translate the following text to ${langLabel}.\n\n${text}`;
}

function buildAnalysisPrompt(originalText, finalText) {
  return `Act as a strict Critic. Compare these two texts. The first is the original English, the second went through one translation hop and back. Evaluate fidelity (did the meaning survive?) and cultural relevance (did the translation sound natural for the target locale, e.g., Quebec vs. France?). Output JSON following the SignalDrift schema:\n\n{\n  "flow": "translation",\n  "fidelity_score": <number 0-10>,\n  "cultural_relevance_score": <number 0-10>,\n  "summary": "<string>",\n  "segments": [\n    { "original": "<substring from original>", "final": "<substring from final>", "status": "preserved|shifted|lost", "note": "<explanation>" }\n  ]\n}\n\n--- ORIGINAL TEXT ---\n${originalText}\n\n--- FINAL (BACK-TRANSLATED) TEXT ---\n${finalText}`;
}

function renderModelSelector(stepIdx, selectedId) {
  const renderOption = m => `<option value="${m.id}" ${m.id === selectedId ? 'selected' : ''}>${m.name}</option>`;
  return `
    <div class="field-group">
      <label class="field-label" for="model-select-${stepIdx}">AI Model Used</label>
      <select class="select" id="model-select-${stepIdx}" aria-label="Select AI model">
        <option value="">Select a model</option>
        ${MODELS.map(renderOption).join('')}
      </select>
      <div class="model-card" id="model-card-${stepIdx}">
        ${selectedId ? renderModelCard(selectedId) : ''}
      </div>
    </div>
  `;
}

function renderModelCard(modelId) {
  if (!modelId) return '';
  const m = getModel(modelId);
  if (!m) return '';
  const linkHtml = m.url ? `<a href="${m.url}" target="_blank" rel="noopener" class="model-card__link">Open ${m.name} ↗</a>` : '';
  const otherInput = m.id === 'other' ? `<input type="text" class="input model-card__other-input" id="model-other-name" placeholder="Enter model name..." value="">` : '';
  return `
    <div class="model-card__inner" style="border-left: 3px solid ${m.color}">
      <span class="model-card__tag">${m.roleTag || 'Custom'}</span>
      ${m.strength ? `<span class="model-card__strength">${m.strength}</span>` : ''}
      ${linkHtml}
      ${otherInput}
    </div>
  `;
}

function renderLangSelector(id, selectedId, excludeId, locked) {
  if (locked) {
    return `<div class="field-group">
      <label class="field-label">Target Language</label>
      <div class="lang-locked">${getLangLabel(selectedId)} <span class="lang-locked__note">(locked to source)</span></div>
    </div>`;
  }
  return `
    <div class="field-group">
      <label class="field-label" for="${id}">Target Language</label>
      <select class="select" id="${id}" aria-label="Select target language">
        <option value="">Select a language</option>
        ${LANGUAGES.filter(l => l.id !== excludeId).map(l =>
          `<option value="${l.id}" ${l.id === selectedId ? 'selected' : ''}>${l.label}</option>`
        ).join('')}
      </select>
    </div>
  `;
}

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export class TranslationFlow {
  constructor(state, wizardSteps, rerender) {
    this.state = state;
    this.wizardSteps = wizardSteps;
    this.rerender = rerender;
    this._analysisError = '';
  }

  render() {
    if (!this.state.hasStarted) return this.renderWelcome();
    const step = this.state.currentStep;
    switch (step) {
      case 0: return this.renderInputStep();
      case 1: return this.renderForwardStep();
      case 2: return this.renderBackStep();
      case 3: return this.renderAnalysisStep();
      case 4: return this.renderComparisonStep();
      default: return '';
    }
  }

  attachListeners() {
    if (!this.state.hasStarted) { this._attachWelcomeListeners(); return; }
    const step = this.state.currentStep;
    switch (step) {
      case 0: this._attachInputListeners(); break;
      case 1: this._attachTranslationListeners(0); break;
      case 2: this._attachTranslationListeners(1); break;
      case 3: this._attachAnalysisListeners(); break;
      case 4: this._attachComparisonListeners(); break;
    }
  }

  renderWelcome() {
    return `
      <section class="welcome-view">
        <div class="welcome-hero">
          <h2 class="welcome-title">A Game of Telephone, With AI Models</h2>
          <p class="welcome-lead">
            What happens when you translate a message through AI, then translate it back?
            Does the meaning survive? Does the tone? Does the <em>soul</em>?
          </p>
          <p class="welcome-body">
            SignalDrift lets you run text through round-trip AI translations and see exactly
            what was preserved, shifted, or lost. But here's the twist: <strong>the model you
            choose at each step changes everything.</strong>
          </p>
        </div>

        <div class="welcome-insight">
          <h3>The Insight</h3>
          <p>
            Most people use one AI tool for everything. But AI models aren't interchangeable:
            they have different strengths, different blind spots, and different
            <em>personalities</em>. One model preserves casual warmth. Another flattens
            it into corporate formality. One nails Quebec French. Another produces
            textbook Parisian French that would sound bizarre in Montreal.
          </p>
          <p>
            <strong>Using the right model for the right task produces dramatically better
            results than sticking with one.</strong> SignalDrift makes that difference visible.
          </p>
        </div>

        <div class="welcome-how">
          <h3>How It Works</h3>
          <ol class="welcome-steps">
            <li><strong>Enter your text</strong> with nuance, idioms, or emotion</li>
            <li><strong>Translate forward</strong> by copying the prompt into any free AI tool, then paste the result back</li>
            <li><strong>Translate back</strong> using a different model to translate it back to the original language</li>
            <li><strong>Compare</strong> to see what survived and what drifted, with color-coded analysis</li>
          </ol>
        </div>

        <div class="welcome-cta">
          <button class="btn btn--primary btn--lg" id="welcome-start">Start New Chain</button>
          <button class="btn btn--secondary btn--lg" id="welcome-demo">Load Demo: The Montreal Test</button>
          <p class="welcome-demo-hint">See the demo to understand the concept in 30 seconds</p>
        </div>
      </section>
    `;
  }

  _attachWelcomeListeners() {
    document.getElementById('welcome-start')?.addEventListener('click', () => {
      this.state.hasStarted = true;
      this.state.currentStep = 0;
      this.rerender();
    });
    document.getElementById('welcome-demo')?.addEventListener('click', () => {
      this.loadDemo();
    });
  }

  loadDemo() {
    const demo = DEMO_MONTREAL;
    this.state.originalText = demo.originalText;
    this.state.sourceLanguage = demo.sourceLanguage;
    this.state.steps[0] = { ...demo.multiModelChain.steps[0] };
    this.state.steps[1] = { ...demo.multiModelChain.steps[1] };
    this.state.analysisJSON = demo.multiModelChain.analysis;
    this.state.isDemoLoaded = true;
    this.state.controlChain = demo.controlChain;
    this.state.demoId = demo.id;
    this.state.hasStarted = true;
    this.state.currentStep = 4;
    this.rerender();
  }

  // --- INPUT STEP ---
  renderInputStep() {
    const indicator = renderStepIndicator(0, this.wizardSteps);
    const canNext = this.state.originalText.trim().length > 0 && !!this.state.sourceLanguage;
    const nav = renderNav({ canGoBack: false, canGoNext: canNext, nextLabel: 'Next Step' });
    return `
      <div class="wizard-step">
        ${indicator}
        <div class="step-content card">
          <h2 class="step-title">What do you want to translate?</h2>
          <p class="step-desc">Enter text rich with nuance, idioms, or emotion. The kind of text that might lose something in translation. Then select the language you're translating <em>from</em>.</p>

          <div class="field-group">
            <label class="field-label" for="source-lang">Source Language</label>
            <select class="select" id="source-lang" aria-label="Select source language">
              <option value="">Select a language</option>
              ${LANGUAGES.map(l => `<option value="${l.id}" ${l.id === this.state.sourceLanguage ? 'selected' : ''}>${l.label}</option>`).join('')}
            </select>
          </div>

          <div class="field-group">
            <label class="field-label" for="original-text">Your Text</label>
            <textarea class="textarea" id="original-text" rows="6" placeholder="Paste or type your text here…" aria-label="Original text">${escHtml(this.state.originalText)}</textarea>
          </div>

          <div class="sample-hint">
            <span>Try the Montreal demo text: </span>
            <button class="btn btn--ghost btn--sm" id="load-sample">Load Quebec Sample Text</button>
          </div>
        </div>
        ${nav}
      </div>
    `;
  }

  _attachInputListeners() {
    const textarea = document.getElementById('original-text');
    const sourceLang = document.getElementById('source-lang');
    const sampleBtn = document.getElementById('load-sample');

    textarea?.addEventListener('input', e => {
      this.state.originalText = e.target.value;
      this._updateNavState();
    });
    sourceLang?.addEventListener('change', e => {
      this.state.sourceLanguage = e.target.value;
      this._updateNavState();
    });
    sampleBtn?.addEventListener('click', () => {
      this.state.originalText = SAMPLE_QUEBEC_TEXT;
      this.state.sourceLanguage = 'en';
      this.rerender();
    });

    attachNavListeners(null, () => {
      if (this.state.originalText.trim() && this.state.sourceLanguage) {
        this.state.currentStep = 1;
        this.rerender();
      }
    });
  }

  _updateNavState() {
    const nextBtn = document.getElementById('nav-next');
    if (!nextBtn) return;
    const step = this.state.currentStep;
    let enabled = false;
    if (step === 0) enabled = this.state.originalText.trim().length > 0 && !!this.state.sourceLanguage;
    if (step === 1) {
      const s = this.state.steps[0];
      enabled = !!s.targetLanguage && !!s.model && s.output.trim().length > 0;
    }
    if (step === 2) {
      const s = this.state.steps[1];
      enabled = !!s.targetLanguage && !!s.model && s.output.trim().length > 0;
    }
    nextBtn.disabled = !enabled;
  }

  // --- FORWARD TRANSLATION STEP ---
  renderForwardStep() {
    const indicator = renderStepIndicator(1, this.wizardSteps);
    const s = this.state.steps[0];
    const inputText = this.state.originalText;
    const prompt = s.targetLanguage ? buildTranslationPrompt(inputText, s.targetLanguage) : '';
    const canNext = !!s.targetLanguage && !!s.model && s.output.trim().length > 0;
    const nav = renderNav({ canGoBack: true, canGoNext: canNext, nextLabel: 'Next Step' });

    return `
      <div class="wizard-step">
        ${indicator}
        <div class="step-content card">
          <h2 class="step-title">Step 1: Forward Translation</h2>
          <p class="step-desc">Select a target language and AI model. Copy the prompt below, paste it into your chosen AI tool, then paste the result back here.</p>

          ${renderLangSelector('step1-lang', s.targetLanguage, this.state.sourceLanguage, false)}
          ${renderModelSelector(0, s.model)}

          <div class="field-group">
            <label class="field-label">Your Original Text</label>
            <div class="text-display">
              <pre class="text-display__pre">${escHtml(inputText)}</pre>
              <button class="btn btn--ghost btn--sm copy-btn" data-copy="${escAttr(inputText)}" aria-label="Copy original text">Copy Text</button>
            </div>
          </div>

          ${s.targetLanguage ? `
          <div class="field-group">
            <label class="field-label">Prompt to paste into your AI tool</label>
            <div class="prompt-block">
              <pre class="prompt-block__pre">${escHtml(prompt)}</pre>
              <button class="btn btn--ghost btn--sm copy-btn" data-copy="${escAttr(prompt)}" aria-label="Copy prompt">Copy Prompt</button>
            </div>
          </div>
          ` : ''}

          <div class="field-group">
            <label class="field-label" for="step1-output">Paste the AI's translation here</label>
            <textarea class="textarea" id="step1-output" rows="6" placeholder="Paste the translated text from your AI tool…" aria-label="Step 1 translation output">${escHtml(s.output)}</textarea>
          </div>
        </div>
        ${nav}
      </div>
    `;
  }

  // --- BACK TRANSLATION STEP ---
  renderBackStep() {
    const indicator = renderStepIndicator(2, this.wizardSteps);
    const s = this.state.steps[1];
    const inputText = this.state.steps[0].output;
    const targetLang = this.state.sourceLanguage;
    if (!s.targetLanguage) s.targetLanguage = targetLang;
    const prompt = buildTranslationPrompt(inputText, targetLang);
    const canNext = !!s.model && s.output.trim().length > 0;
    const nav = renderNav({ canGoBack: true, canGoNext: canNext, nextLabel: 'Next Step' });

    return `
      <div class="wizard-step">
        ${indicator}
        <div class="step-content card">
          <h2 class="step-title">Step 2: Back Translation</h2>
          <p class="step-desc">Now translate back to <strong>${getLangLabel(targetLang)}</strong> (your original language). The target language is locked. Select your AI model, copy the prompt, and paste the result below.</p>

          ${renderLangSelector('step2-lang', targetLang, null, true)}
          ${renderModelSelector(1, s.model)}

          <div class="field-group">
            <label class="field-label">Step 1 Output (the translated text)</label>
            <div class="text-display">
              <pre class="text-display__pre">${escHtml(inputText)}</pre>
              <button class="btn btn--ghost btn--sm copy-btn" data-copy="${escAttr(inputText)}" aria-label="Copy step 1 output">Copy Text</button>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Prompt to paste into your AI tool</label>
            <div class="prompt-block">
              <pre class="prompt-block__pre">${escHtml(prompt)}</pre>
              <button class="btn btn--ghost btn--sm copy-btn" data-copy="${escAttr(prompt)}" aria-label="Copy prompt">Copy Prompt</button>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label" for="step2-output">Paste the AI's back-translation here</label>
            <textarea class="textarea" id="step2-output" rows="6" placeholder="Paste the back-translated text from your AI tool…" aria-label="Step 2 back-translation output">${escHtml(s.output)}</textarea>
          </div>
        </div>
        ${nav}
      </div>
    `;
  }

  _attachTranslationListeners(stepIdx) {
    const s = this.state.steps[stepIdx];
    const langSelect = document.getElementById(`step${stepIdx + 1}-lang`);
    const modelSelect = document.getElementById(`model-select-${stepIdx}`);
    const outputArea = document.getElementById(`step${stepIdx + 1}-output`);

    langSelect?.addEventListener('change', e => {
      s.targetLanguage = e.target.value;
      this.rerender();
    });

    modelSelect?.addEventListener('change', e => {
      s.model = e.target.value;
      const card = document.getElementById(`model-card-${stepIdx}`);
      if (card) card.innerHTML = renderModelCard(s.model);
      this._updateNavState();
    });

    outputArea?.addEventListener('input', e => {
      s.output = e.target.value;
      this._updateNavState();
    });

    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy');
        const ariaLabel = btn.getAttribute('aria-label') || '';
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => {
            if (ariaLabel.toLowerCase().includes('prompt')) {
              btn.textContent = 'Copy Prompt';
            } else {
              btn.textContent = 'Copy Text';
            }
          }, 1500);
        });
      });
    });

    attachNavListeners(
      () => { this.state.currentStep = stepIdx; this.rerender(); },
      () => {
        if ((stepIdx === 0 && s.targetLanguage && s.model && s.output.trim()) ||
            (stepIdx === 1 && s.model && s.output.trim())) {
          this.state.currentStep = stepIdx + 2;
          this.rerender();
        }
      }
    );
  }

  // --- ANALYSIS STEP ---
  renderAnalysisStep() {
    const indicator = renderStepIndicator(3, this.wizardSteps);
    const origText = this.state.originalText;
    const finalText = this.state.steps[1].output;
    const analysisPrompt = buildAnalysisPrompt(origText, finalText);
    const hasAnalysis = !!this.state.analysisJSON;
    const nav = renderNav({ canGoBack: true, canGoNext: true, nextLabel: 'View Comparison', isLast: false });

    return `
      <div class="wizard-step">
        ${indicator}
        <div class="step-content card">
          <h2 class="step-title">Analysis</h2>
          <p class="step-desc">Your round-trip is complete. Now generate an analysis using a strong reasoning model (Claude Opus or equivalent) acting as a Critic: someone who grades the translators' homework.</p>

          <div class="instruction-block">
            <p>Copy the original and final texts, paste both into a reasoning model with the prompt below, then paste the JSON result into the field at the bottom.</p>
            <div class="prompt-block">
              <pre class="prompt-block__pre">${escHtml(analysisPrompt)}</pre>
              <button class="btn btn--ghost btn--sm copy-btn" data-copy="${escAttr(analysisPrompt)}" aria-label="Copy analysis prompt">Copy Analysis Prompt</button>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label" for="analysis-json">Paste Analysis JSON here</label>
            <textarea class="textarea" id="analysis-json" rows="10" placeholder='Paste the JSON from your reasoning model here…' aria-label="Analysis JSON">${this.state.analysisJSON ? escHtml(JSON.stringify(this.state.analysisJSON, null, 2)) : ''}</textarea>
            ${this._analysisError ? `<p class="field-error">${escHtml(this._analysisError)}</p>` : ''}
            ${hasAnalysis ? `<p class="field-success">✓ Analysis loaded successfully</p>` : ''}
          </div>
        </div>
        ${nav}
      </div>
    `;
  }

  _attachAnalysisListeners() {
    const jsonArea = document.getElementById('analysis-json');
    jsonArea?.addEventListener('input', e => {
      const val = e.target.value.trim();
      if (!val) {
        this.state.analysisJSON = null;
        this._analysisError = '';
        this._updateAnalysisFeedback();
        return;
      }
      const result = parseAnalysis(val);
      if (result.valid) {
        this.state.analysisJSON = result.data;
        this._analysisError = '';
      } else {
        this.state.analysisJSON = null;
        this._analysisError = result.error;
      }
      this._updateAnalysisFeedback();
    });

    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy');
        const orig = btn.textContent;
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = orig; }, 1500);
        });
      });
    });

    attachNavListeners(
      () => { this.state.currentStep = 2; this.rerender(); },
      () => { this.state.currentStep = 4; this.rerender(); }
    );
  }

  _updateAnalysisFeedback() {
    const errorEl = document.querySelector('.field-error');
    const successEl = document.querySelector('.field-success');
    if (this._analysisError) {
      if (errorEl) errorEl.textContent = this._analysisError;
      else {
        const p = document.createElement('p');
        p.className = 'field-error';
        p.textContent = this._analysisError;
        document.getElementById('analysis-json')?.after(p);
      }
      if (successEl) successEl.remove();
    } else if (this.state.analysisJSON) {
      if (successEl) successEl.textContent = '✓ Analysis loaded successfully';
      else {
        const p = document.createElement('p');
        p.className = 'field-success';
        p.textContent = '✓ Analysis loaded successfully';
        document.getElementById('analysis-json')?.after(p);
      }
      if (errorEl) errorEl.remove();
    } else {
      if (errorEl) errorEl.remove();
      if (successEl) successEl.remove();
    }
  }

  // --- COMPARISON STEP ---
  renderComparisonStep() {
    if (this.state.isDemoLoaded) return this.renderDemoComparison();
    return this.renderUserComparison();
  }

  renderUserComparison() {
    const analysis = this.state.analysisJSON;
    const origText = this.state.originalText;
    const finalText = this.state.steps[1].output;
    const step1 = this.state.steps[0];
    const step2 = this.state.steps[1];
    const m1 = getModel(step1.model);
    const m2 = getModel(step2.model);

    const origAnnotated = analysis ? annotateText(origText, analysis.segments, 'original') : escHtml(origText);
    const finalAnnotated = analysis ? annotateText(finalText, analysis.segments, 'final') : escHtml(finalText);

    const scoreBadges = analysis ? `
      <div class="score-badges">
        ${renderScoreBadge('Fidelity', analysis.fidelity_score)}
        ${renderScoreBadge('Cultural Relevance', analysis.cultural_relevance_score)}
      </div>
      <div class="summary-callout">
        <strong>Summary:</strong> ${escHtml(analysis.summary)}
      </div>
    ` : '';

    const modelDesc = `
      <div class="model-chain-desc">
        <span class="model-badge" style="border-color:${m1?.color || '#ccc'}">${step1.modelName || m1?.name || step1.model}</span>
        <span class="chain-arrow">→ ${getLangLabel(step1.targetLanguage)} →</span>
        <span class="model-badge" style="border-color:${m2?.color || '#ccc'}">${step2.modelName || m2?.name || step2.model}</span>
        <span class="chain-arrow">→ ${getLangLabel(step2.targetLanguage)}</span>
      </div>
    `;

    const intermediate = this.state.steps[0].output;

    return `
      <div class="comparison-view">
        <div class="comparison-header">
          <h2 class="comparison-title">Comparison</h2>
          ${modelDesc}
          ${scoreBadges}
        </div>

        <div class="comparison-columns">
          <div class="comparison-col">
            <div class="col-header">
              <span class="col-label">Original (${getLangLabel(this.state.sourceLanguage)})</span>
            </div>
            <div class="col-body text-annotated">${origAnnotated}</div>
          </div>
          <div class="comparison-col">
            <div class="col-header">
              <span class="col-label">After Round-Trip</span>
            </div>
            <div class="col-body text-annotated">${finalAnnotated}</div>
          </div>
        </div>

        <details class="timeline-details">
          <summary class="timeline-summary">Translation Chain ▾</summary>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-label">Step 1: ${getLangLabel(step1.targetLanguage)}</div>
              <div class="timeline-model" style="border-left-color:${m1?.color || '#ccc'}">${step1.modelName || m1?.name || step1.model}</div>
              <div class="timeline-text">${escHtml(intermediate)}</div>
            </div>
          </div>
        </details>

        ${analysis ? `
        <div class="annotation-legend">
          <span class="legend-item legend-item--preserved">Preserved</span>
          <span class="legend-item legend-item--shifted">Shifted</span>
          <span class="legend-item legend-item--lost">Lost</span>
          <button class="btn btn--ghost btn--sm" id="clear-analysis">Clear Analysis</button>
        </div>
        ` : `
        <div class="no-analysis-hint">
          <p>No analysis loaded. <button class="btn btn--ghost btn--sm" id="go-analysis">← Add Analysis</button></p>
        </div>
        `}

        <details class="about-section">
          <summary class="about-toggle">What is SignalDrift?</summary>
          <div class="about-content">
            <p>
              SignalDrift explores a simple idea: AI models are not interchangeable. Each one
              has different strengths in tone, cultural awareness, formality, and accuracy.
              By running the same text through different models, you can <em>see</em> those
              differences in the output.
            </p>
            <p>
              <strong>The takeaway:</strong> match the right model to the right task. A model
              that excels at formal business English might butcher casual Montreal slang.
              The multi-model approach (switching perspectives mid-workflow) produces
              better results than sticking with one tool for everything.
            </p>
          </div>
        </details>

        <div class="comparison-actions">
          <button class="btn btn--secondary" id="comp-back">← Back</button>
          <button class="btn btn--primary" id="new-chain">Start New Chain</button>
        </div>
      </div>
    `;
  }

  renderDemoComparison() {
    const origText = this.state.originalText;
    const controlChain = this.state.controlChain;
    const multiAnalysis = this.state.analysisJSON;
    const controlAnalysis = controlChain?.analysis;

    const multiStep1 = this.state.steps[0];
    const multiStep2 = this.state.steps[1];
    const controlStep1 = controlChain?.steps[0];
    const controlStep2 = controlChain?.steps[1];

    const multiFinalText = multiStep2.output;
    const controlFinalText = controlStep2?.output || '';

    const multiFinalAnnotated = multiAnalysis ? annotateText(multiFinalText, multiAnalysis.segments, 'final') : escHtml(multiFinalText);
    const controlFinalAnnotated = controlAnalysis ? annotateText(controlFinalText, controlAnalysis.segments, 'final') : escHtml(controlFinalText);

    const mLocal = getModel(multiStep1.model);
    const mControl = controlStep1 ? getModel(controlStep1.model) : null;

    return `
      <div class="comparison-view comparison-view--demo">
        <div class="comparison-header">
          <div class="demo-badge">Demo Mode</div>
          <h2 class="comparison-title">The Montreal Test</h2>
          <p class="comparison-subtitle">Same text, two translation paths. Which model understood Montreal?</p>
        </div>

        <div class="demo-columns">
          <!-- Column 1: Original -->
          <div class="demo-col demo-col--original">
            <div class="col-header col-header--neutral">
              <span class="col-label">Original (English)</span>
            </div>
            <div class="col-body text-annotated">${escHtml(origText)}</div>
          </div>

          <!-- Column 2: Generic Path (Control) -->
          <div class="demo-col demo-col--control">
            <div class="col-header col-header--control">
              <span class="col-label">Generic Path</span>
              <span class="col-sublabel">${controlStep1?.modelName || ''} → ${getLangLabel(controlStep1?.targetLanguage || '')}</span>
            </div>
            ${controlAnalysis ? `
            <div class="score-badges score-badges--inline" style="padding:0 var(--space-md)">
              ${renderScoreBadge('Fidelity', controlAnalysis.fidelity_score)}
              ${renderScoreBadge('Cultural', controlAnalysis.cultural_relevance_score)}
            </div>
            ` : ''}
            <div class="intermediate-text">
              <div class="intermediate-label">Translation (${getLangLabel(controlStep1?.targetLanguage || '')})</div>
              <div class="col-body text-annotated model-output" style="border-left-color:${mControl?.color || '#ccc'}">${escHtml(controlStep1?.output || '')}</div>
            </div>
            <div class="intermediate-text">
              <div class="intermediate-label">Back to English</div>
              <div class="col-body text-annotated model-output" style="border-left-color:${mControl?.color || '#ccc'}">${controlFinalAnnotated}</div>
            </div>
            ${controlAnalysis ? `<div class="summary-callout summary-callout--sm" style="margin:var(--space-md)">${escHtml(controlAnalysis.summary)}</div>` : ''}
          </div>

          <!-- Column 3: Local Path (Multi-Model) -->
          <div class="demo-col demo-col--local">
            <div class="col-header col-header--local">
              <span class="col-label">Local Path</span>
              <span class="col-sublabel">${multiStep1?.modelName || ''} → ${getLangLabel(multiStep1?.targetLanguage || '')}</span>
            </div>
            ${multiAnalysis ? `
            <div class="score-badges score-badges--inline" style="padding:0 var(--space-md)">
              ${renderScoreBadge('Fidelity', multiAnalysis.fidelity_score)}
              ${renderScoreBadge('Cultural', multiAnalysis.cultural_relevance_score)}
            </div>
            ` : ''}
            <div class="intermediate-text">
              <div class="intermediate-label">Translation (${getLangLabel(multiStep1?.targetLanguage || '')})</div>
              <div class="col-body text-annotated model-output" style="border-left-color:${mLocal?.color || '#ccc'}">${escHtml(multiStep1?.output || '')}</div>
            </div>
            <div class="intermediate-text">
              <div class="intermediate-label">Back to English</div>
              <div class="col-body text-annotated model-output" style="border-left-color:${mLocal?.color || '#ccc'}">${multiFinalAnnotated}</div>
            </div>
            ${multiAnalysis ? `<div class="summary-callout summary-callout--sm" style="margin:var(--space-md)">${escHtml(multiAnalysis.summary)}</div>` : ''}
          </div>
        </div>

        <div class="annotation-legend">
          <span class="legend-item legend-item--preserved">Preserved</span>
          <span class="legend-item legend-item--shifted">Shifted</span>
          <span class="legend-item legend-item--lost">Lost</span>
        </div>

        <details class="about-section">
          <summary class="about-toggle">Why does this matter?</summary>
          <div class="about-content">
            <p>
              You just saw the same message take two paths. The <strong>Generic Path</strong>
              used a single mainstream model and standard French. The <strong>Local Path</strong>
              used a model chosen specifically for its strength with Quebec French.
            </p>
            <p>
              The results tell a clear story: <em>"Hey folks"</em> became <em>"Bonjour à tous"</em>
              on the generic path. Grammatically correct, but it sounds like a corporate
              email. On the local path, it became <em>"Salut la gang!"</em>, exactly how you'd
              actually say it in Montreal.
            </p>
            <p>
              <strong>This is the multi-model approach:</strong> instead of using one AI for
              everything, you match the right model to the right task. The skill isn't
              knowing which AI is "best". It's knowing which is best <em>for this specific step</em>.
            </p>
            <p class="about-takeaway">
              Don't marry one AI tool. Treat them like a team of specialists, and the results
              will be noticeably better than any single "best" model.
            </p>
          </div>
        </details>

        <div class="comparison-actions">
          <button class="btn btn--primary" id="new-chain">Start New Chain</button>
        </div>
      </div>
    `;
  }

  _attachComparisonListeners() {
    document.getElementById('clear-analysis')?.addEventListener('click', () => {
      this.state.analysisJSON = null;
      this.rerender();
    });
    document.getElementById('go-analysis')?.addEventListener('click', () => {
      this.state.currentStep = 3;
      this.rerender();
    });
    document.getElementById('comp-back')?.addEventListener('click', () => {
      this.state.currentStep = 3;
      this.rerender();
    });
    document.getElementById('new-chain')?.addEventListener('click', () => {
      Object.assign(this.state, {
        hasStarted: false,
        currentStep: 0,
        sourceLanguage: '',
        steps: [{ targetLanguage: '', model: '', output: '' }, { targetLanguage: '', model: '', output: '' }],
        originalText: '',
        analysisJSON: null,
        isDemoLoaded: false,
        controlChain: null,
        demoId: null,
      });
      this.rerender();
    });

    document.querySelectorAll('.annotation').forEach(el => {
      el.addEventListener('click', () => {
        const tooltip = el.getAttribute('data-tooltip');
        if (!tooltip) return;
        let tip = el.querySelector('.annotation-tooltip');
        if (tip) { tip.remove(); return; }
        tip = document.createElement('span');
        tip.className = 'annotation-tooltip';
        tip.textContent = tooltip;
        el.appendChild(tip);
        const removeTip = (e) => {
          if (!el.contains(e.target)) { tip.remove(); document.removeEventListener('click', removeTip); }
        };
        setTimeout(() => document.addEventListener('click', removeTip), 0);
      });
    });
  }
}
