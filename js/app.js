import { ImageFlow } from './image.js';
import { initBackground } from './bg.js';
import { initRouter, onNavigate, navigate, replaceRoute, currentRoute } from './router.js';

export const appState = {
  hasStarted: false,
  isDemoLoaded: false,
};

let imageFlow = null;
let suppressRouteSync = false;

function render() {
  const main = document.getElementById('app-main');
  main.classList.toggle('wide', imageFlow?.state.currentStep === 3);
  main.innerHTML = imageFlow.render() + `<footer class="app-footer"><p>SignalDrift: see how meaning drifts when AI models describe and recreate your world.</p><p><a href="https://github.com/andrei-k/signal-drift" target="_blank" rel="noopener noreferrer">View on GitHub</a></p></footer>`;
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

function routePathForState() {
  const s = imageFlow.state;
  if (!s.hasStarted) return '/';
  if (s.isDemoLoaded && s.currentStep === 3) {
    const tab = s.activeTab || 'samePrompt';
    return tab === 'samePrompt' ? '/demo' : '/demo/' + tab;
  }
  return '/step/' + s.currentStep;
}

function syncRouteFromState() {
  if (suppressRouteSync) return;
  const target = routePathForState();
  const current = currentRoute().path;
  if (current !== target) {
    navigate(target);
  }
}

function applyRoute(route) {
  suppressRouteSync = true;
  try {
    applyRouteInner(route);
  } finally {
    suppressRouteSync = false;
  }
}

function applyRouteInner(route) {
  const seg = route.segments;
  const s = imageFlow.state;

  if (seg.length === 0 || (seg.length === 1 && seg[0] === '')) {
    s.hasStarted = false;
    s.isDemoLoaded = false;
    imageFlow._syncGlobal();
    render();
    return;
  }

  if (seg[0] === 'demo') {
    if (!s.isDemoLoaded) {
      imageFlow.loadDemo();
    }
    const tab = seg[1] || 'samePrompt';
    if (s.activeTab !== tab) {
      s.activeTab = tab;
      s.expandedDescription = -1;
    }
    s.currentStep = 3;
    render();
    return;
  }

  if (seg[0] === 'step') {
    const step = parseInt(seg[1], 10);
    if (isNaN(step) || step < 0 || step > 3) {
      replaceRoute('/');
      return;
    }
    s.hasStarted = true;
    if (s.isDemoLoaded && step < 3) {
      s.isDemoLoaded = false;
      s.demoSections = null;
    }
    s.currentStep = step;
    imageFlow._syncGlobal();
    render();
    return;
  }

  replaceRoute('/');
}

function rerenderWithRoute() {
  render();
  syncRouteFromState();
}

function init() {
  initBackground(appState);
  imageFlow = new ImageFlow(appState, rerenderWithRoute);

  initRouter();
  onNavigate(applyRoute);

  const initial = currentRoute();
  if (initial.path === '/' || initial.path === '') {
    render();
  } else {
    applyRoute(initial);
  }

  document.getElementById('section-tabs')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.section-tab');
    if (!btn) return;
    const section = btn.getAttribute('data-section');
    if (section && imageFlow.state.isDemoLoaded) {
      imageFlow.switchSection(section);
    }
  });

  document.querySelector('.app-header__brand')?.addEventListener('click', (e) => {
    e.preventDefault();
    navigate('/');
  });
}

document.addEventListener('DOMContentLoaded', init);
