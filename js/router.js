const listeners = [];

export function onNavigate(fn) {
  listeners.push(fn);
}

export function currentRoute() {
  return parseHash(window.location.hash);
}

export function navigate(path, { replace = false } = {}) {
  const newHash = '#' + path;
  if (newHash === window.location.hash) return;
  if (replace) {
    history.replaceState(null, '', newHash);
  } else {
    history.pushState(null, '', newHash);
  }
  notify();
}

export function replaceRoute(path) {
  navigate(path, { replace: true });
}

export function initRouter() {
  window.addEventListener('popstate', () => notify());
  if (!window.location.hash || window.location.hash === '#') {
    history.replaceState(null, '', '#/');
  }
}

function notify() {
  const route = parseHash(window.location.hash);
  for (const fn of listeners) fn(route);
}

function parseHash(hash) {
  const raw = (hash || '#/').slice(1) || '/';
  const [path, qs] = raw.split('?');
  const segments = path.split('/').filter(Boolean);
  const params = new URLSearchParams(qs || '');
  return { path, segments, params };
}
