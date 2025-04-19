# devlog

Dev Logger AI is a lightweight CLI tool that watches your Git development activity and automatically generates human-readable summaries using Gemini’s API. It helps you maintain a daily development log, draft clear stand-up updates, and track your coding progress effortlessly.

---

## Features

- **Git Diff Watching:** Captures the latest code changes via Git diffs.
- **AI Summarization:** Sends diffs to Gemini and produces concise, natural-language summaries.
- **Daily Log Creation:** Appends summaries to dated Markdown files in the `devlog/` directory.
- **Modular Design:** Clear separation of concerns with dedicated modules for Git reading, AI integration, and file writing.
- **Extensible Architecture:** Easily add new data sources or custom summarization prompts.

---

## Prerequisites

- **Node.js** v14 or newer
- A **Git** repository with at least two commits
- A **Gemini API key**

---

## Installation

1. Clone your project repository:
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/devlog.git
   cd dev-logger-ai
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
4. Ensure `.env` is listed in `.gitignore` to keep your key private.

---

## Usage

### Generate a Dev Log Entry

Run the CLI to summarize your most recent commit:

```bash
npm run devlog
```

This command:
1. Reads `git diff HEAD~1 HEAD`.
2. Sends the diff to Gemini for summarization.
3. Appends the summary under a timestamp in `devlog/YYYY-MM-DD.md`.

### Custom Diff Ranges

To summarize a different commit range, pass the range flag:

```bash
node src/index.js --range "HEAD~2 HEAD"
```

### Custom Prompts

Adjust the prompt template inside `src/aiClient.js` to tailor the summary style—commit messages, technical notes, or plain-language updates.

---

## Project Structure

```
devlog/
├── src/
│   ├── index.js      # CLI entry point
│   ├── gitReader.js  # Git diff retrieval
│   ├── aiClient.js   # Gemini interaction
│   └── logger.js     # File output management
├── devlog/           # Generated daily logs (YYYY-MM-DD.md)
├── .env              # Environment variables (ignored by Git)
├── .gitignore        # Excludes .env, node_modules, devlog/
└── package.json      # Scripts and dependencies
```

---

## Extending with C++

For advanced performance or custom diff analysis, you can integrate C++ components:
1. Write a C++ utility to parse diffs or compute metrics.
2. Compile it to a native binary or WebAssembly module.
3. Invoke it from Node.js via `child_process.spawn()` or Node-addons.

This approach combines JavaScript flexibility with C++ speed.

---

*All rights reserved.*

