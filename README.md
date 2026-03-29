# Signal Drift

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**A visual game of telephone that reveals how AI models quietly edit reality.**

AI models don't just generate images differently; they *see* differently. Signal Drift is an interactive tool that feeds the same photo through multiple AI models and lets you compare the results side by side. What comes back is never quite what went in.

**[Try the live demo](https://andrei-k.github.io/signal-drift/#/)**

![Signal Drift demo showing a child's drawing described by three different AI models and recreated by GPT Image, each producing a different interpretation](images/demo-screenshot.png)

## Why This Matters

When an AI model describes your photo and another model recreates it, the output looks plausible. But without the original to compare against, you'd never notice what was quietly changed. This isn't hallucination (obvious errors). It's editorialization: invisible decisions about what to keep, erase, and invent.

Signal Drift makes those invisible decisions visible.

## How It Works

The app includes a built-in demo you can explore immediately, and a wizard that lets you upload your own photos and run the experiments yourself. Each image is put through two controlled experiments:

| Experiment | Setup | What it isolates |
|---|---|---|
| **Same Prompt** | One description sent to three generators (GPT Image, Copilot, Gemini) | How generators interpret identical instructions differently |
| **Same Generator** | Three models describe the same photo, all fed into one generator (GPT Image) | How a model's choice of words reshapes the final image |

Each model drifts in a consistent direction:
- **ChatGPT** tries to inventory everything, writing exhaustive descriptions that over-specify details
- **Copilot** tidies and sanitizes, replacing mess with clean structure
- **Gemini** captures mood and energy, sometimes inventing atmospheric details (like adding rain to a dry street)

## Read More

- [How I Built Signal Drift](https://12ak.com/posts/how-i-built-signal-drift/): the full build story, from multi-model ideation to the pivot from text to images
- [AI Doesn't Hallucinate Your Photos. It Edits Them.](https://12ak.com/posts/what-ai-sees/): detailed analysis of cultural erasure, privacy enforcement, and creative liberty across models

## Running Locally

The app uses ES modules, so it needs to be served over HTTP:

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

## Tech Stack

- Vanilla JavaScript, ES modules, no framework, no build step
- Single HTML entry point
- CSS custom properties, dark theme with model-specific accent colors
- Canvas particle system for animated background

## Contributing

Contributions are welcome. Open an issue or submit a pull request.
