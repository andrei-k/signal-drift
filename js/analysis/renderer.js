export function annotateText(text, segments, type) {
  if (!segments || segments.length === 0) return escapeHtml(text);

  const statusColors = {
    preserved: { bg: '#d1fae5', border: '#10b981', label: 'Preserved' },
    shifted:   { bg: '#fef3c7', border: '#f59e0b', label: 'Shifted' },
    lost:      { bg: '#fee2e2', border: '#ef4444', label: 'Lost' },
  };

  const matches = [];
  for (const seg of segments) {
    const phrase = type === 'original' ? seg.original : seg.final;
    const idx = text.toLowerCase().indexOf(phrase.toLowerCase());
    if (idx !== -1) {
      matches.push({ start: idx, end: idx + phrase.length, seg, phrase: text.slice(idx, idx + phrase.length) });
    }
  }

  matches.sort((a, b) => a.start - b.start);

  let result = '';
  let cursor = 0;
  for (const m of matches) {
    if (m.start < cursor) continue;
    result += escapeHtml(text.slice(cursor, m.start));
    const c = statusColors[m.seg.status];
    const tooltip = escapeAttr(m.seg.note);
    result += `<mark class="annotation annotation--${m.seg.status}" style="background:${c.bg};border-bottom:2px solid ${c.border}" data-tooltip="${tooltip}" tabindex="0" role="mark" aria-label="${c.label}: ${tooltip}">${escapeHtml(m.phrase)}</mark>`;
    cursor = m.end;
  }
  result += escapeHtml(text.slice(cursor));
  return result;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function renderScoreBadge(label, score) {
  let cls = 'badge--green';
  if (score < 5) cls = 'badge--red';
  else if (score < 8) cls = 'badge--yellow';
  return `<div class="score-badge ${cls}"><span class="score-badge__label">${label}</span><span class="score-badge__value">${score.toFixed(1)}</span></div>`;
}
