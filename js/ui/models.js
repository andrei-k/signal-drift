export const MODEL_COLORS = {
  'chatgpt': '#10B981',
  'gemini-pro': '#2563EB',
  'gemini-flash': '#60A5FA',
  'copilot': '#0EA5E9',
  'kimi': '#8B5CF6',
  'grok': '#000000',
  'qwen': '#F97316',
  'perplexity': '#20B2AA',
  'firefly': '#FF5A5F',
  'other': '#6B7280',
};

export const MODELS = [
  {
    id: 'gemini-pro',
    name: 'Gemini',
    roleTag: 'Google AI',
    strength: 'Strong multimodal reasoning with large context window',
    url: 'https://gemini.google.com',
    color: MODEL_COLORS['gemini-pro'],
  },
  {
    id: 'gemini-flash',
    name: 'Gemini Flash',
    roleTag: 'Google AI (Fast)',
    strength: 'Free-tier vision model with strong scene-level understanding',
    url: 'https://gemini.google.com',
    color: MODEL_COLORS['gemini-flash'],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    roleTag: 'OpenAI',
    strength: 'Strong at structured visual understanding and detailed descriptions',
    url: 'https://chatgpt.com',
    color: MODEL_COLORS['chatgpt'],
  },
  {
    id: 'copilot',
    name: 'Copilot',
    roleTag: 'Microsoft AI',
    strength: 'Built into Edge, Windows, and Microsoft 365',
    url: 'https://copilot.microsoft.com',
    color: MODEL_COLORS['copilot'],
  },
  {
    id: 'grok',
    name: 'Grok',
    roleTag: 'xAI',
    strength: 'Strong at social-media visuals, memes, and screenshots',
    url: 'https://grok.com',
    color: MODEL_COLORS['grok'],
  },
  {
    id: 'kimi',
    name: 'Kimi',
    roleTag: 'Moonshot AI',
    strength: 'Native multimodal with large context window',
    url: 'https://kimi.moonshot.cn',
    color: MODEL_COLORS['kimi'],
  },
  {
    id: 'qwen',
    name: 'Qwen',
    roleTag: 'Alibaba AI',
    strength: 'Strong at document understanding and OCR',
    url: 'https://chat.qwen.ai',
    color: MODEL_COLORS['qwen'],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    roleTag: 'Search-Grounded AI',
    strength: 'Cross-references image content against live web results',
    url: 'https://www.perplexity.ai',
    color: MODEL_COLORS['perplexity'],
  },
];

export function getModel(id) {
  return MODELS.find(m => m.id === id);
}
