export function renderStepIndicator(currentStep, steps) {
  const items = steps.map((s, i) => {
    let cls = 'step-indicator__item';
    if (i < currentStep) cls += ' completed';
    else if (i === currentStep) cls += ' active';
    return `<div class="${cls}"><span class="step-indicator__dot"></span><span class="step-indicator__label">${s.label}</span></div>`;
  }).join('<div class="step-indicator__line"></div>');
  return `<nav class="step-indicator" aria-label="Progress">${items}</nav>`;
}

export function renderNav({ canGoBack = true, canGoNext = true, nextLabel = 'Next Step', isLast = false } = {}) {
  const backBtn = canGoBack
    ? `<button class="btn btn--secondary" id="nav-back" aria-label="Go to previous step">← Back</button>`
    : ``;
  const nextBtn = canGoNext
    ? `<button class="btn btn--primary" id="nav-next" aria-label="${isLast ? 'Finish' : 'Go to next step'}">${nextLabel} →</button>`
    : `<button class="btn btn--primary" id="nav-next" disabled aria-label="Cannot advance yet">${nextLabel} →</button>`;
  return `<div class="wizard-nav">${backBtn}${nextBtn}</div>`;
}

export function attachNavListeners(onBack, onNext) {
  const backBtn = document.getElementById('nav-back');
  const nextBtn = document.getElementById('nav-next');
  if (backBtn && onBack) backBtn.addEventListener('click', onBack);
  if (nextBtn && onNext) nextBtn.addEventListener('click', onNext);
}
