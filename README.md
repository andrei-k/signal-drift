# Signal Drift

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**How AI models distort visual information, a game of telephone with pictures.**

Signal Drift is an interactive web app that shows how different AI models interpret and recreate the same image. You feed a photo through multiple models and watch each one reshape reality in its own way. One tidies up the mess, another invents rain for dramatic effect, a third tries to label every pixel.

Built entirely with AI (Claude, ChatGPT, Gemini, Copilot, and others) as an exploration of the multi-model approach.

## Live Demo

**[https://andrei-k.github.io/signal-drift/#/](https://andrei-k.github.io/signal-drift/#/)**

## How It Works

The app runs two experiments side by side:

| Mode | What happens |
|---|---|
| **Same Prompt** | One detailed description of a photo is sent to three different image generators (ChatGPT, Copilot, Gemini). Same input, different outputs. |
| **Same Generator** | Three different models describe the same photo. All three descriptions are fed into one generator (ChatGPT). Different inputs, same engine. |

The results reveal consistent "personalities." ChatGPT over-specifies, Copilot sanitizes, Gemini dramatizes. It raises questions about silent editorial bias in AI outputs.

## Tech Stack

- **Vanilla JavaScript**, ES modules, no framework, no build step
- **Single HTML entry point**, `index.html`
- **CSS custom properties**, dark theme with model-specific accent colors
- **Canvas particle system**, animated background

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
│   ├── router.js               # Hash-based routing
│   ├── flows/
│   │   ├── image.js            # Image drift flow, wizard, demos
│   │   └── translation.js      # Translation drift flow
│   ├── data/
│   │   ├── demo-image.js       # Image descriptions & model chains
│   │   └── demo-translation.js # Translation demo data
│   ├── analysis/
│   │   ├── parser.js           # Analysis data parser
│   │   └── renderer.js         # Analysis visualization
│   └── ui/
│       ├── models.js           # Model colors & metadata
│       └── wizard.js           # Step indicator renderers
└── images/
    ├── demo-1/                 # Same-prompt demo images
    └── demo-2/                 # Same-generator demo images
```

## Contributing

Contributions are welcome. Open an issue or submit a pull request.

## Origin

Signal Drift was built for a [Concordia University Digital Skill-Share Days](https://sites.events.concordia.ca/sites/concordia/en/digital-skills-share-2026/) lightning talk. It now lives as a standalone open-source tool. For the full story (how it was ideated across four models, prototyped in parallel, and pivoted from text to images), check out the write-up: **[How I Built Signal Drift](https://12ak.com/posts/how-i-built-signal-drift/)**
