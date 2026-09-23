# Azure Protocol // Personal Portfolio

A high-fidelity, interactive developer portfolio inspired by the sleek, geometric aesthetics of Persona 3 Reload and modern cyber-tactical interfaces.

Developed for **Andrea Eduard Magri** — Systems Analyst & Frontend Architect.

---

## ⚡ Features

- **Persona 3 Styled UI**: Slanted geometric cards, HUD-like tactical readouts, dynamic SVG crosshairs, and custom typography.
- **Synthesizer Soundscape (Web Audio API)**:
  - Procedural real-time ambient chord progressions.
  - Generative ocean wash white noise generator.
  - Interactive granular sliders for independently adjusting ocean wash and chord layers.
  - Zero external MP3/WAV dependencies — purely generated with native Web Audio API oscillators and gain nodes.
- **Cinematic Atmosphere**:
  - Floating geometric shards (`BackgroundAtmosphereComponent`) adapting seamlessly across mobile, tablet, and desktop viewports.
  - Dynamic physics-based underwater bubble canvas engine with auto-resize compensation.
- **Bilingual Protocol**: Instant toggle between English and Italian (`LanguageService`) with signals-driven reactive updates.
- **Sections**:
  - `ABOUT_ME` — Background, certifications, and technical profile.
  - `EXPERIENCE` — Career trajectory and engineering roles.
  - `PROJECTS` — Featured repositories and technical stack highlights.
  - `SKILLS` — Detailed matrix of digital, linguistic, and interpersonal capabilities.
  - `CONTACT` — Direct links (GitHub, LinkedIn, Email).

---

## 🛠️ Tech Stack

- **Framework**: Angular 21 (Standalone Components, Signals, Zoneless)
- **Build Tool**: Vite 6 via `@analogjs/vite-plugin-angular`
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Audio**: Web Audio API (Native browser synthesizer)
- **Typography**: Archivo Black, Inter, JetBrains Mono

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or newer) installed.

### Installation

```bash
# Clone the repository
git clone https://github.com/Eiphilim-dev/your-repo-name.git

# Navigate to project directory
cd your-repo-name

# Install dependencies
npm install
```

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

The output will be generated in the `dist` directory, ready to be deployed to any static hosting provider.

To test the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment to GitHub Pages

1. In your GitHub repository, navigate to **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions** (or deploy the `dist` branch).
3. The build uses relative asset paths (`base: './'`), so it works smoothly on custom domains or GitHub Pages subpaths (`https://<username>.github.io/<repo>/`).

---

## 📄 License

MIT / Personal Portfolio.
