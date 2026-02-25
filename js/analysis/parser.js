export function parseAnalysis(jsonString) {
  // Strip markdown code fences (```json ... ``` or ``` ... ```)
  const stripped = jsonString.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  let data;
  try {
    data = JSON.parse(stripped);
  } catch (e) {
    return { valid: false, error: 'Analysis format invalid. Check the JSON output.' };
  }
  if (typeof data.fidelity_score !== 'number') return { valid: false, error: 'Missing or invalid fidelity_score.' };
  if (typeof data.cultural_relevance_score !== 'number') return { valid: false, error: 'Missing or invalid cultural_relevance_score.' };
  if (typeof data.summary !== 'string') return { valid: false, error: 'Missing summary.' };
  if (!Array.isArray(data.segments)) return { valid: false, error: 'Missing segments array.' };
  for (const seg of data.segments) {
    if (!seg.original || !seg.final || !seg.status || !seg.note) {
      return { valid: false, error: 'Each segment must have original, final, status, and note.' };
    }
    if (!['preserved', 'shifted', 'lost'].includes(seg.status)) {
      return { valid: false, error: `Invalid segment status: ${seg.status}` };
    }
  }
  return { valid: true, data };
}
