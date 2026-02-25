export const DEMO_MONTREAL = {
  id: 'montreal',
  label: 'The Montreal Test: English ↔ French',
  originalText: "Hey folks, just a heads up, we're heading to the dep for snacks before the 3 PM meeting. If you want anything, slack me. Also, the metro is down so I might be 5 mins late. Don't start without me!",
  sourceLanguage: 'en',

  multiModelChain: {
    label: 'Local Path: Quebec-Aware',
    steps: [
      {
        targetLanguage: 'fr-qc',
        model: 'claude',
        modelName: 'Claude Opus 4.6',
        output: "Salut la gang! Juste un petit mot pour dire qu'on passe au dep avant le meeting de 15h. Si vous voulez de quoi, slackez-moi. Le métro est planté faque je risque d'être en retard de 5 minutes. Commencez pas sans moi!",
      },
      {
        targetLanguage: 'en',
        model: 'claude',
        modelName: 'Claude Opus 4.6',
        output: "Hey everyone! Just a quick note to say we're stopping by the corner store before the 3 PM meeting. If you guys want something, hit me up on Slack. The metro is down so I might be 5 minutes late. Don't start without me!",
      },
    ],
    analysis: {
      flow: 'translation',
      fidelity_score: 9.1,
      cultural_relevance_score: 9.5,
      summary: "Quebec idioms and casual register perfectly captured. 'dep', 'la gang', 'faque': all locally authentic.",
      segments: [
        { original: 'dep', final: 'corner store', status: 'shifted', note: "'dep' (dépanneur) is a Montreal-specific term. 'corner store' is a reasonable equivalent but loses the local flavour" },
        { original: "Hey folks", final: "Hey everyone", status: 'preserved', note: "Casual register maintained" },
        { original: "slack me", final: "hit me up on Slack", status: 'preserved', note: "Informal tone preserved" },
        { original: "Don't start without me!", final: "Don't start without me!", status: 'preserved', note: "Urgency and warmth fully intact" },
      ],
    },
  },

  controlChain: {
    label: 'Generic Path: France French',
    steps: [
      {
        targetLanguage: 'fr-fr',
        model: 'chatgpt',
        modelName: 'ChatGPT (Free)',
        output: "Bonjour à tous, juste pour vous informer, nous allons au supermarché pour des collations avant la réunion de 15h. Si vous souhaitez quelque chose, envoyez-moi un message sur Slack. Par ailleurs, le métro est en panne, donc je risque d'avoir 5 minutes de retard. Ne commencez pas sans moi !",
      },
      {
        targetLanguage: 'en',
        model: 'chatgpt',
        modelName: 'ChatGPT (Free)',
        output: "Hello everyone, just to inform you, we are going to the supermarket for snacks before the 3 PM meeting. If you would like something, send me a message on Slack. Furthermore, the metro is out of service, so I may be 5 minutes late. Please do not start without me.",
      },
    ],
    analysis: {
      flow: 'translation',
      fidelity_score: 6.4,
      cultural_relevance_score: 3.2,
      summary: "Grammatically correct but culturally tone-deaf for Montreal. 'dep' became 'supermarché', casual warmth replaced with corporate formality.",
      segments: [
        { original: 'dep', final: 'supermarket', status: 'lost', note: "Lost the Montreal-specific 'dépanneur' entirely. Became generic 'supermarché' then 'supermarket'" },
        { original: "Hey folks", final: "Hello everyone", status: 'shifted', note: "Casual 'Hey folks' became formal 'Hello everyone'" },
        { original: "slack me", final: "send me a message on Slack", status: 'shifted', note: "Informal verb 'slack me' formalized to full phrase" },
        { original: "Don't start without me!", final: "Please do not start without me.", status: 'shifted', note: "Warm urgency became a polite formal request" },
      ],
    },
  },
};

export const DEMO_SPANISH = {
  id: 'spanish',
  label: 'English ↔ Spanish',
  originalText: "Hey folks, just a heads up, we're heading to the dep for snacks before the 3 PM meeting. If you want anything, slack me. Also, the metro is down so I might be 5 mins late. Don't start without me!",
  sourceLanguage: 'en',

  multiModelChain: {
    label: 'Multi-Model Chain',
    steps: [
      {
        targetLanguage: 'es',
        model: 'gemini',
        modelName: 'Gemini (Free)',
        output: "¡Hola a todos! Solo un aviso rápido, vamos a la tienda de la esquina por botanas antes de la junta de las 3. Si quieren algo, mándenme un Slack. También, el metro no sirve así que puede que llegue 5 minutos tarde. ¡No empiecen sin mí!",
      },
      {
        targetLanguage: 'en',
        model: 'mistral',
        modelName: 'Mistral (Le Chat)',
        output: "Hey everyone! Just a quick heads up, we're going to the corner store for snacks before the 3 o'clock meeting. If you want something, send me a Slack. Also, the metro isn't working so I might arrive 5 minutes late. Don't start without me!",
      },
    ],
    analysis: {
      flow: 'translation',
      fidelity_score: 8.5,
      cultural_relevance_score: 7.8,
      summary: "Casual tone well preserved. Minor shift: 'dep' became 'tienda de la esquina', accurate but less culturally specific.",
      segments: [
        { original: 'dep', final: 'corner store', status: 'shifted', note: "Montreal-specific 'dep' became generic 'tienda de la esquina' then 'corner store'" },
        { original: "Hey folks", final: "Hey everyone", status: 'preserved', note: "Casual register maintained" },
        { original: "slack me", final: "send me a Slack", status: 'preserved', note: "Informal register largely preserved" },
        { original: "Don't start without me!", final: "Don't start without me!", status: 'preserved', note: "Urgency fully preserved" },
      ],
    },
  },

  controlChain: {
    label: 'Single-Model (Copilot Only)',
    steps: [
      {
        targetLanguage: 'es',
        model: 'copilot',
        modelName: 'MS Copilot (Free)',
        output: "Estimados colegas, les informo que nos dirigiremos al supermercado a comprar refrigerios antes de la reunión de las 15:00. Si desean algo, envíenme un mensaje por Slack. Además, el metro se encuentra fuera de servicio, por lo que podría llegar con 5 minutos de retraso. Les solicito que no comiencen sin mí.",
      },
      {
        targetLanguage: 'en',
        model: 'copilot',
        modelName: 'MS Copilot (Free)',
        output: "Dear colleagues, I am informing you that we will be heading to the supermarket to purchase refreshments before the 3:00 PM meeting. If you wish for something, please send me a message via Slack. Additionally, the metro is currently out of service, so I may arrive with a 5-minute delay. I request that you do not begin without me.",
      },
    ],
    analysis: {
      flow: 'translation',
      fidelity_score: 5.8,
      cultural_relevance_score: 2.5,
      summary: "Completely lost the casual register. 'Hey folks' became 'Dear colleagues'. The original is a group chat message; this reads like a corporate memo.",
      segments: [
        { original: "Hey folks", final: "Dear colleagues", status: 'lost', note: "Casual greeting completely formalized. Total tone reversal" },
        { original: 'dep', final: 'supermarket', status: 'lost', note: "Local term lost to generic corporate vocabulary" },
        { original: "slack me", final: "send me a message via Slack", status: 'shifted', note: "Informal verb formalized into corporate phrasing" },
        { original: "Don't start without me!", final: "I request that you do not begin without me.", status: 'lost', note: "Warm personal urgency became a formal business request" },
      ],
    },
  },
};

export const SAMPLE_QUEBEC_TEXT = "Yo, can someone grab me a poutine from the casse-croûte on Saint-Laurent? I'm stuck in the lab finishing my assignment. Also, anyone want to split an Uber to the show tonight at the Bell Centre? It's gonna be lit. Text me, my phone's at like 2% so hurry lol";
