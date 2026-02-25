# Signal Drift

**How AI models distort visual information — a game of telephone, with pictures.**

Signal Drift is an interactive web app that visualizes how different AI models interpret and recreate the same image. Feed a photo through multiple models and watch each one subtly reshape reality: one tidies up the mess, another invents rain for dramatic effect, a third tries to label every pixel.

Built entirely with AI — using Claude, ChatGPT, Gemini, Copilot, and others — as a live demo for a [Concordia University Digital Skill-Share Days](https://sites.events.concordia.ca/sites/concordia/en/digital-skills-share-2026/) lightning talk on the multi-model approach.

## Live Demo

**[https://sites.events.concordia.ca/sites/concordia/en/digital-skills-share-2026/](https://andrei-k.github.io/signal-drift/#/)**

## How It Works

The app runs two experiments side by side:

| Mode | What happens |
|---|---|
| **Same Prompt** | One detailed description of a photo is sent to three different image generators (ChatGPT, Copilot, Gemini). Same input, different outputs. |
| **Same Generator** | Three different models describe the same photo. All three descriptions are fed into one generator (ChatGPT). Different inputs, same engine. |

The results reveal consistent "personalities" — ChatGPT over-specifies, Copilot sanitizes, Gemini dramatizes — and raise questions about silent editorial bias in AI outputs.

## Behind the Scenes

The app includes a full write-up of the build process: how the project was ideated across four models, prototyped in parallel, pivoted from text to images, and designed with AI-assisted creative direction. Available in the "Behind the Scenes" tab.

## Tech Stack

- **Vanilla JavaScript** — ES modules, no framework, no build step
- **Single HTML entry point** — `index.html`
- **CSS custom properties** — dark theme with model-specific accent colors
- **Canvas particle system** — animated background with interactive easter eggs

## Running Locally

The app uses ES modules, so it needs to be served over HTTP:

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

## Project Structure

```
├── index.html
├── css/style.css
├── js/
│   ├── app.js                  # Bootstrap, state, render loop
│   ├── bg.js                   # Canvas background & particle system
│   ├── flows/
│   │   └── image.js            # Main app flow — wizard, demos, blog
│   ├── data/
│   │   ├── demo-image.js       # Image descriptions & model chains
│   │   └── demo-evolution.js   # Behind the Scenes article content
│   ├── effects/
│   │   ├── gemini.js           # Corner easter egg (Gemini)
│   │   └── opus.js             # Corner easter egg (Opus)
│   └── ui/
│       ├── models.js           # Model colors & metadata
│       └── wizard.js           # Step indicator renderers
└── images/
    ├── demo-1/                 # Same-prompt demo images
    ├── demo-2/                 # Same-generator demo images
    └── evolution/              # Behind the Scenes screenshots
```

## AI Models Used

| Tool | Models | Role |
|---|---|---|
| **Cursor** | Opus 4.6, Gemini 3 Pro | Architecture, UI refinement, prompt-chaining |
| **Claude Code** | Opus 4.6, Sonnet 4.6 | From-scratch app builds (Sonnet rebuilt the full app in 8 min) |
| **GPT Codex** | Codex 5.3 | Rapid parallel prototyping |
| **Gemini CLI** | Gemini 3 Pro, Gemini 2.5 | Terminal tasks, bug fixing |
| **Antigravity** | Gemini 3 Pro, Gemini 3 Flash | Experimental tasks |
