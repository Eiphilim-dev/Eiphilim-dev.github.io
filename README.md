# Azure Protocol // Personal Portfolio

A high-fidelity, interactive developer portfolio inspired by the sleek, geometric aesthetics of Persona 3 Reload and modern cyber-tactical interfaces.

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

## 📄 License

MIT / Personal Portfolio.
