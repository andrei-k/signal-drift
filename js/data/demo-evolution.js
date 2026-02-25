export const ARTICLE_SECTIONS = [
  {
    type: 'header',
    title: 'Signal Drift',
    subtitle: 'How I Built an App About AI, Using AI, to Explain AI',
    author: 'Andrei Kalamkarov — written with help from the same models that built the project',
  },
  {
    type: 'prose',
    html: `<p>Every year, Concordia University's Library hosts <strong>Digital Skill-Share Days</strong> — a two-day collaborative learning event where staff and faculty share digital skills with each other. It started in 2020 during the pandemic to meet the demand for digital upskilling, and it's been running ever since.</p>
<p>This year's edition featured a lightning round on AI and data — four speakers, five minutes each to present plus five minutes for Q&A, covering everything from the environmental cost of AI to how data work is changing.</p>
<p>I manage web and mobile platforms at Concordia, and the title I'd committed to was: <strong>"The Multi-Model Approach: Getting Better Answers by Switching Perspectives."</strong> My thesis was straightforward — using multiple AI models intentionally, switching between them based on what each does best, produces better results than sticking with just one. But saying that on a stage doesn't prove much. I needed to <em>show</em> it with a real project, screen-recorded and edited into a 4-minute demo clip.</p>
<p>I started where most projects start — a messy brain dump. Six rough ideas in a markdown file: a site builder, a Kindle article aggregator, a Montreal events tool, a Kindle highlights re-surfacer, a project management dashboard, and a gym workout analyzer. None of them felt obviously right for a 5-minute talk. So I did the only logical thing for someone preparing a presentation about AI — I asked AI for help. Four of them, actually.</p>
<p>From the start, I kept notes — partly by hand, partly by asking each AI to document decisions and reasoning in a running markdown file as we went. That log became the backbone of this write-up.</p>
<p>Along the way, each model surprised me in ways I didn't expect. This is the story of how that process turned into "Signal Drift."</p>`,
  },
  {
    type: 'heading',
    number: '01',
    title: 'The Prompt is the Product',
  },
  {
    type: 'prose',
    html: `<p>Before I asked any model for project ideas, I tried something: I asked them to help me <em>ask the question better</em>. I fed that brain dump into all four models with one rule: <strong>"Don't answer my question yet. Just make the question better."</strong></p>
<p>Each model came back with something noticeably different:</p>`,
  },
  {
    type: 'image',
    src: 'images/evolution/1 - Ideas and planning/ideas-1.png',
    caption: 'Brain dump: 6 rough ideas into a markdown file, then asked Opus to analyze',
    tool: 'Cursor + Opus 4.6',
  },
  {
    type: 'model-cards',
    cards: [
      { model: 'ChatGPT 5.2', nickname: 'The Thorough Analyst', color: 'var(--color-model-chatgpt)', text: 'Gave me a structurally exhaustive project charter. It demanded scoring matrices, deliverables, and assumption challenges.' },
      { model: 'Claude Sonnet 4.5', nickname: 'The Storyteller', color: 'var(--color-model-claude)', text: 'Cut straight to decisions. It defined crisp success criteria and focused on the narrative arc of the eventual demo.' },
      { model: 'Gemini 3', nickname: 'The Big-Picture Creative', color: 'var(--color-model-gemini)', text: 'Assigned a "Creative Director" persona, demanding I focus on the visual "aha!" moment to maximize audience impact.' },
      { model: 'MS Copilot', nickname: 'The Operations Manager', color: 'var(--color-model-copilot)', text: 'Produced a highly structured "Idea Card" format and a weighted decision matrix. Enterprise DNA runs deep here.' },
    ],
  },
  {
    type: 'image-pair',
    images: [
      { src: 'images/evolution/1 - Ideas and planning/ideas-3.png', caption: 'Copilot adds operational rigor and a decision matrix', tool: 'MS Copilot' },
      { src: 'images/evolution/1 - Ideas and planning/ideas-4.png', caption: 'Gemini assigns a Creative Director persona', tool: 'Gemini 3 Thinking' },
    ],
  },
  {
    type: 'prose',
    html: `<p>What stood out wasn't just the different formats — it was how directly they pushed back on my assumptions. My brain dump was full of confident claims: "Opus 4.6 is best," "Gemini is probably best at searching because it's Google." I'd even pre-assigned roles before testing anything.</p>
<p>The models didn't just go along with it. ChatGPT challenged the idea that the audience would care about whatever project I built — they'd care about the <em>insight</em>, not the pipeline. Gemini pointed out that a different color palette doesn't prove different <em>intelligence</em>, just different defaults. Sonnet warned that five model switches in five minutes would feel like a gimmick parade — two or three deep, visible swaps would land harder. And multiple models flagged that watching code scroll in a screen recording is just not interesting; the demo needed to show <em>output transforming</em>, not code being written.</p>
<p>That pushback was more useful than any of the actual ideas. It forced me to stop trying to build something technically impressive and focus on building something <em>clear</em>.</p>`,
  },
  {
    type: 'prose',
    html: `<p>No single model nailed it. But together? They covered every angle. I took the best parts of all four and used <strong>Opus 4.6 (The Decisive Architect)</strong> to synthesize them into one massive, 1,500-word "Mega-Prompt".</p>`,
  },
  {
    type: 'image-pair',
    images: [
      { src: 'images/evolution/1 - Ideas and planning/ideas-5.png', caption: 'Sonnet defines 5 success criteria — the most decision-oriented refinement', tool: 'Claude Sonnet 4.5' },
      { src: 'images/evolution/1 - Ideas and planning/ideas-6.png', caption: 'Opus synthesizes all 4 into a 1,500-word Mega-Prompt', tool: 'Cursor + Opus 4.6' },
    ],
  },
  {
    type: 'callout',
    text: 'That hour of prompt refinement ended up saving me a ton of time later. The sharper the question, the better every model performed.',
  },
  {
    type: 'heading',
    number: '02',
    title: 'The Ideation Explosion & The "Aha!" Pivot',
  },
  {
    type: 'prose',
    html: `<p>I fed the Mega-Prompt back into the models and let them run. The output was an explosion: over 50 concept cards, critiques, and matrices. The models were brutally honest. <strong>Opus</strong>, in particular, told me to definitively "kill" several of my original ideas. It correctly pointed out that building a PM dashboard or a workout analyzer might be useful, but they wouldn't provide clear, <em>visual</em> proof of model switching in a 5-minute window.</p>
<p>To figure out what actually worked, I didn't just read the ideas — I launched 5 quick Proof of Concepts (POCs) in parallel using <strong>GPT Codex</strong>. Once I could actually see and touch the ideas, my evaluation completely changed.</p>`,
  },
  {
    type: 'image',
    src: 'images/evolution/2 - Prototypes/0-codex-poc.png',
    caption: '5 quick POCs launched in parallel in Codex to stress-test each idea before committing',
    tool: 'GPT Codex',
  },
  {
    type: 'prose',
    html: `<p>The "Morning Dashboard" POC was instantly eliminated — it just didn't show enough visual proof of model switching. The "Gym Coach Analyzer" was too much work to build into something useful for a lightning talk.</p>`,
  },
  {
    type: 'image-pair',
    images: [
      { src: 'images/evolution/2 - Prototypes/1-poc-codex-morning-dashboard-2.png', caption: 'POC 1 — Morning Dashboard. Eliminated: not enough visual proof', tool: 'GPT Codex' },
      { src: 'images/evolution/2 - Prototypes/2-poc-codex-gym-coach.jpg', caption: 'POC 2 — Gym Coach Analyzer. Too much work for a 5-min talk', tool: 'GPT Codex' },
    ],
  },
  {
    type: 'prose',
    html: `<p>But POC #3, the "Translation Telephone Game," had real potential. The idea was to translate a message across different languages and AI models to see what meaning survived the round-trip. I decided to proceed with it and had <strong>Claude Code</strong> build the initial dashboard. It worked. It was clever.</p>
<p>But as I tested it, a problem became obvious. Text comparisons on a screen just aren't that engaging — especially for a live audience. <strong>Opus</strong> pointed this out bluntly during a critique session: the "aha!" moment needed to be visual and immediate. An image registers in two seconds; a text block takes two minutes to parse.</p>
<p>So, I pivoted. I dropped the translations entirely and focused strictly on images.</p>`,
  },
  {
    type: 'image',
    src: 'images/evolution/2 - Prototypes/3-poc-codex-translation-telephone-game1.jpg',
    caption: 'POC 3 — Translation Telephone Game. This one had potential — decided to continue',
    tool: 'GPT Codex',
  },
  {
    type: 'heading',
    number: '03',
    title: 'Signal Drift: Watching AIs Hallucinate (and Sanitize)',
  },
  {
    type: 'prose',
    html: `<p>The final app, <strong>Signal Drift</strong>, visualizes how AI distorts visual information. I set up two distinct flows:</p>
<ol>
<li><strong>Same Prompt, Different Generators:</strong> One highly detailed description of a photo fed to ChatGPT, Copilot, and Gemini to generate images.</li>
<li><strong>Different Describers, Same Generator:</strong> Three different models describing a photo, with all three text descriptions fed into a single generator (ChatGPT).</li>
</ol>
<p>This is where things got really interesting. The results lined up with the personality traits I'd noticed during the planning phase.</p>`,
  },
  {
    type: 'model-cards',
    cards: [
      { model: 'ChatGPT', nickname: 'The Perfectionist', color: 'var(--color-model-chatgpt)', text: 'It tried to cram every single detail into the image, resulting in cluttered, forensic reconstructions. When tasked with describing a messy desk, it literally read every label on every box it could see.' },
      { model: 'Copilot', nickname: 'The Corporate Editor', color: 'var(--color-model-copilot)', text: 'It sanitized everything. It organized a chaotic summer block party into neat rows. It turned a messy gym chalkboard into a formatted, corporate spreadsheet.' },
      { model: 'Gemini', nickname: 'The Storyteller', color: 'var(--color-model-gemini)', text: 'It sacrificed exact details to capture the mood, atmosphere, and cinematic lighting. It invented rain to make a street festival look more dramatic.' },
    ],
  },
  {
    type: 'callout',
    text: 'What surprised me most wasn\'t the hallucinations — it was the sanitization. Copilot didn\'t lie about what was on the chalkboard; it just quietly tidied reality into something that felt corporate and clean. That kind of silent editorializing was harder to catch than an outright fabrication.',
  },
  {
    type: 'heading',
    number: '04',
    title: 'The Build Journey: Competing Models and Parallel Rebuilds',
  },
  {
    type: 'prose',
    html: `<p>Once I had the "Translation Telephone Game" concept, I didn't just ask one model to build it. I orchestrated an entire pipeline.</p>
<p>First, I used <strong>Opus 4.6</strong> in Cursor to generate a full, multi-phase architectural plan. It broke down the project into steps and even generated a list of evocative project names (which gave birth to "Signal Drift").</p>
<p>But before writing code, I consulted <strong>Gemini 3 Pro</strong> as a sounding board. It loved the plan but immediately caught a flaw: I needed a "Control Group." If I was going to test how <em>different</em> models mutated content, I needed to show what happens when the <em>same</em> model handles every step as a baseline. That structural insight fundamentally improved the app.</p>`,
  },
  {
    type: 'image',
    src: 'images/evolution/3 - Builds from scratch/opus-b.png',
    caption: 'Multi-Model Dashboard — 4 flows: Translation, Image, Code, Tone round-trips',
    tool: 'Claude Opus 4.6',
  },
  {
    type: 'prose',
    html: `<p>Then came the actual coding. To test the agentic coding landscape, I took the exact same spec and ran <strong>four parallel rebuilds from scratch</strong>:</p>`,
  },
  {
    type: 'rebuild-table',
    rows: [
      { name: 'signal-drift-claude-1', stack: 'Claude Code + Opus 4.6' },
      { name: 'signal-drift-claude-2', stack: 'Claude Code + Sonnet 4.6' },
      { name: 'signal-drift-codex', stack: 'Codex 5.3' },
      { name: 'signal-drift-gemini', stack: 'Gemini 3 Pro' },
    ],
    winner: 'signal-drift-claude-2',
  },
  {
    type: 'prose',
    html: `<p>The results were stark. Codex was remarkably bad — not even worth tweaking. Gemini stumbled on the very first step, needing manual intervention to fix a breaking error, and ultimately produced a mediocre result. <strong>Sonnet 4.6 was the undisputed winner.</strong> It built a fantastic, working app incredibly fast. As a bonus, I discovered that Opus 4.6 burns through tokens incredibly fast in Claude Code, whereas Sonnet 4.6 gave me stellar results while making my tokens last much longer.</p>
<p>After pivoting the app from text translations to image comparisons, the real detailed work began. I spent an evening iterating through UI details, juggling between Opus 4.6 and Gemini 3 Pro. At one point, Opus completely messed up the JavaScript for the UI accordions, but I handed the broken code to Gemini 3 Pro, which fixed it instantly. That swap ended up being one of the smoothest fixes of the whole project.</p>
<p>To pick the right image models to test, I didn't guess. I asked <strong>Gemini Research</strong> to investigate the current landscape of image recognition and generation LLMs, specifically looking for popular ones that are surprisingly bad at certain tasks.</p>`,
  },
  {
    type: 'image',
    src: 'images/evolution/4 - Final refinements/4-state.png',
    caption: 'Pivoted to Image Telephone — visual proof beats text comparisons on a projector',
    tool: 'Cursor + Composer',
  },
  {
    type: 'prose',
    html: `<p>Finally, it was time for design polish. The app was looking very generic — the classic "AI slop" aesthetic. I prompted <strong>Gemini 3.1 Pro</strong> to completely redesign the frontend, explicitly telling it to avoid overused fonts (like Roboto) and clichéd color schemes. Gemini delivered a beautiful, dark-themed UI. We then worked together to add a complex, animated particle background. I brought in <strong>Kimi K2</strong> for some final artistic touches, and even implemented an interactive easter egg effect where moving your mouse to the corners triggers model-specific animations.</p>
<p>Looking back, the build was a constant baton-pass: Opus for the architectural blueprint, Gemini for structural critique and visual design, Sonnet for writing the actual code. No single model carried the whole thing.</p>`,
  },
  {
    type: 'image',
    src: 'images/evolution/5 - Tools and visuals/claude-code-1.png',
    caption: 'Claude Code rebuilds the entire app from a spec file in 8 minutes',
    tool: 'Claude Code',
  },
  {
    type: 'heading',
    number: '05',
    title: 'The Ensemble of Tools',
  },
  {
    type: 'prose',
    html: `<p>From brainstorm to final CSS, every stage of Signal Drift ran through a different tool — each one paired with whichever model fit the task.</p>`,
  },
  {
    type: 'tools-grid',
    tools: [
      { name: 'Cursor', models: 'Opus 4.6, Gemini 3 Pro', role: 'Architectural planning, UI refinement, and deep prompt-chaining' },
      { name: 'Claude Code', models: 'Opus 4.6, Sonnet 4.6', role: 'Rapid, from-scratch app building directly in the terminal. Rebuilt the entire app from a spec in 8 minutes.' },
      { name: 'GPT Codex', models: 'Codex 5.3', role: 'Launching quick, parallel prototypes' },
      { name: 'Gemini CLI', models: 'Gemini 3 Pro, Gemini 2.5', role: 'Terminal-based task execution and bug fixing' },
      { name: 'Antigravity', models: 'Gemini 3 Pro, Gemini 3 Flash', role: 'Experimental tasks' },
    ],
  },
  {
    type: 'heading',
    number: '06',
    title: 'What I\'d Do Differently (And What I\'ll Keep Doing)',
  },
  {
    type: 'prose',
    html: `<p>The biggest thing I took away from this project: <strong>sticking with one AI would have given me a worse result.</strong> Each model had blind spots, and the only reason I caught them was because another model didn't share them.</p>
<p>Going forward, I'm treating models less like competing products and more like colleagues with different strengths. Opus for architecture, Sonnet for fast reliable code, Gemini for design critique and creative direction. The orchestration — knowing when to swap — turned out to be the actual skill I was building the whole time.</p>
<p>Five minutes wasn't enough to say all that on stage. But it was enough to show it.</p>`,
  },
];

export const PROJECT_TIMELINE = [
  { step: 'Brain dump', detail: '6 raw ideas in a markdown file', models: 'Me', tag: null },
  { step: 'Prompt refinement', detail: '"Don\'t answer yet — make the question better"', models: 'ChatGPT, Sonnet, Gemini, Copilot', tag: null },
  { step: 'Mega-Prompt synthesis', detail: 'Opus cherry-picks the best of all 4 into a 1,500-word prompt', models: 'Opus 4.6', tag: null },
  { step: 'Ideation explosion', detail: '50+ idea cards, critiques, matrices from 6 model runs', models: 'Opus ×2, Gemini, Copilot, ChatGPT, Sonnet', tag: null },
  { step: 'Quick POCs', detail: '3 prototypes to see & touch ideas before committing', models: 'GPT Codex', tag: null },
  { step: 'Decision', detail: 'Translation Telephone Game wins — visual and clear', models: 'Me', tag: 'decision' },
  { step: 'Plan & build v1', detail: 'Multi-Model Comparison Dashboard (4 flows)', models: 'Opus 4.6 → Claude Code', tag: null },
  { step: 'Control group idea', detail: 'Gemini suggests same-model baseline for comparison', models: 'Gemini 3 Pro', tag: null },
  { step: 'Simplify to 1 flow', detail: 'EN → FR (France vs Québec) translation only', models: 'Gemini 3 Pro + Opus 4.6', tag: 'pivot' },
  { step: '4 parallel rebuilds', detail: 'Same spec → Opus, Sonnet, Codex, Gemini. Sonnet wins.', models: 'Claude Code, Codex, Gemini CLI', tag: null },
  { step: 'Taste Test pivot', detail: 'Audience judges anonymized model outputs — too much text', models: 'Opus 4.6', tag: 'pivot' },
  { step: 'Back to Signal Drift', detail: 'Drop translation, keep images only — "the aha is visual"', models: 'Opus 4.6', tag: 'pivot' },
  { step: 'Design & effects', detail: 'Typography, colors, background animation, easter eggs', models: 'Gemini 3 Pro, Opus 4.6, Kimi K2', tag: null },
  { step: 'Image experiments', detail: '~10 photos per demo, cut to best 4 each', models: 'GPT-5.2, Copilot, Gemini Pro', tag: null },
  { step: 'Final rebuild', detail: 'Claude Code rebuilds entire app from spec in 8 minutes', models: 'Claude Code', tag: null },
  { step: 'Polish & present', detail: 'Presentation mode, Behind the Scenes, observations', models: 'Opus 4.6 + Gemini Pro', tag: null },
];

export const EVOLUTION_STEPS = [
  // --- Phase 1: Ideas and planning ---
  {
    phase: 'Ideation',
    src: 'images/evolution/1 - Ideas and planning/ideas-1.png',
    caption: 'Brain dump: 6 rough ideas into a markdown file, then asked Opus to analyze',
    tool: 'Cursor + Opus 4.6',
  },
  {
    phase: 'Ideation',
    src: 'images/evolution/1 - Ideas and planning/ideas-3.png',
    caption: '"Don\'t answer yet — make the question better." Copilot adds operational rigor and a decision matrix',
    tool: 'MS Copilot',
  },
  {
    phase: 'Ideation',
    src: 'images/evolution/1 - Ideas and planning/ideas-4.png',
    caption: 'Gemini assigns a Creative Director persona, focuses on the "Aha! Pivot" moment',
    tool: 'Gemini 3 Thinking',
  },
  {
    phase: 'Ideation',
    src: 'images/evolution/1 - Ideas and planning/ideas-5.png',
    caption: 'Sonnet defines 5 success criteria — the most decision-oriented refinement',
    tool: 'Claude Sonnet 4.5',
  },
  {
    phase: 'Ideation',
    src: 'images/evolution/1 - Ideas and planning/ideas-6.png',
    caption: 'Opus synthesizes all 4 into a 1,500-word Mega-Prompt with persona stacking and meta-questions',
    tool: 'Cursor + Opus 4.6',
  },

  // --- Phase 2: Prototypes ---
  {
    phase: 'Prototypes',
    src: 'images/evolution/2 - Prototypes/0-codex-poc.png',
    caption: '5 quick POCs launched in parallel in Codex to stress-test each idea before committing',
    tool: 'GPT Codex',
  },
  {
    phase: 'Prototypes',
    src: 'images/evolution/2 - Prototypes/1-poc-codex-morning-dashboard-2.png',
    caption: 'POC 1/3 — Morning Dashboard. Instantly eliminated: not enough visual proof of model switching',
    tool: 'GPT Codex',
  },
  {
    phase: 'Prototypes',
    src: 'images/evolution/2 - Prototypes/2-poc-codex-gym-coach.jpg',
    caption: 'POC 2/3 — Gym Coach Analyzer. Too much work to build into something useful for a 5-min talk',
    tool: 'GPT Codex',
  },
  {
    phase: 'Prototypes',
    src: 'images/evolution/2 - Prototypes/3-poc-codex-translation-telephone-game1.jpg',
    caption: 'POC 3/3 — Translation Telephone Game. This one had potential — decided to continue',
    tool: 'GPT Codex',
  },

  // --- Phase 3: Builds ---
  {
    phase: 'Builds',
    src: 'images/evolution/3 - Builds from scratch/opus-b.png',
    caption: 'Multi-Model Dashboard — 4 flows: Translation, Image, Code, Tone round-trips',
    tool: 'Claude Opus 4.6',
  },

  // --- Phase 4: Final product ---
  {
    phase: 'Final',
    src: 'images/evolution/4 - Final refinements/4-state.png',
    caption: 'Pivoted to Image Telephone — visual proof beats text comparisons on a projector',
    tool: 'Cursor + Composer',
  },
  {
    phase: 'Final',
    src: 'images/evolution/5 - Tools and visuals/claude-code-1.png',
    caption: 'Claude Code rebuilds the entire app from a spec file in 8 minutes',
    tool: 'Claude Code',
  },
];
