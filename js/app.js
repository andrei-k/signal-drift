import { ImageFlow } from './flows/image.js';
import { initBackground } from './bg.js';

export const appState = {
  hasStarted: false,
  isDemoLoaded: false,
};

let imageFlow = null;

function render() {
  const main = document.getElementById('app-main');
  main.classList.toggle('wide', imageFlow?.state.currentStep === 3);
  main.innerHTML = imageFlow.render() + `<footer class="app-footer"><p>SignalDrift: see how meaning drifts when AI models describe and recreate your world.</p></footer>`;
  imageFlow.attachListeners();
  updateHeaderTabs();
}

function updateHeaderTabs() {
  const tabNav = document.getElementById('section-tabs');
  if (!tabNav) return;

  const showTabs = imageFlow.state.isDemoLoaded && imageFlow.state.currentStep === 3;
  tabNav.style.display = showTabs ? '' : 'none';

  if (showTabs) {
    const activeTab = imageFlow.state.activeTab || 'samePrompt';
    tabNav.querySelectorAll('.section-tab').forEach(btn => {
      btn.classList.toggle('section-tab--active', btn.getAttribute('data-section') === activeTab);
    });
  }
}

function init() {
  const rawUrl = decodeURIComponent(window.location.href);
  if (new URLSearchParams(rawUrl.split('?')[1] || '').get('present') === '1') {
    document.body.classList.add('presentation-mode');
  }

  initBackground(appState);
  imageFlow = new ImageFlow(appState, render);
  render();

  document.getElementById('section-tabs')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.section-tab');
    if (!btn) return;
    const section = btn.getAttribute('data-section');
    if (section && imageFlow.state.isDemoLoaded) {
      imageFlow.switchSection(section);
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
