/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SkillCategory, Project, Experience, Certification, ContactChannel } from './types';

export const portfolioOwner = {
  name: "Andreaeduard Magri",
  location: {
    en: "Italy, IT // Remote Available",
    it: "Italia, IT // Disponibile da Remoto"
  },
  tagline: "PROTOCOL IN MOTION. SYSTEM IN HARMONY."
};

// Skill Categories Localized
export const skillsCategoriesEN: SkillCategory[] = [
  {
    title: "Digital Competencies",
    description: "Symmetric software development, enterprise backend ecosystems, and modern framework pipelines.",
    skills: [
      { name: "Java SE/EE Development", level: 90, info: "Core OOP paradigms, JVM architecture, multithreading, and Oracle Java Foundations Certified Associate standard specifications." },
      { name: "Spring & Spring Boot Suite", level: 82, info: "Robust Rest APIs, Spring Security authentication nodes, Spring Data JPA repositories, Spring Data REST, and Hibernate persistence layers." },
      { name: "Angular 18+ Framework", level: 78, info: "Enterprise SPA structures, micro-frontend states, components design, and Udemy 2025 Complete Guide curriculum metrics." },
      { name: "JavaScript & TypeScript", level: 85, info: "Asynchronous loops, strict TS type interfaces, functional operators, and modular frontend architectures." },
      { name: "Oracle Cloud Infrastructure (OCI)", level: 88, info: "Enterprise application clouds, Oracle Redwood UI guidelines, AI Foundations Associate structures, and Certified Generative AI Professional services." },
      { name: "Machine Learning & AI Prompting", level: 80, info: "Practical neural model configurations, prompt engineering, generation telemetry, and basic machine learning implementations." },
      { name: "MySQL & SQL Query Logic", level: 82, info: "Relational database diagrams, indexes tuning, efficient query joins, and SQL query structure analysis." },
      { name: "Continuous Learning & Rapid Stack Adoption", level: 95, info: "Relentless curiosity and determination to learn, assimilate, and master new technologies, frameworks, and modern tools." }
    ]
  },
  {
    title: "Language Proficiencies",
    description: "High-fidelity communicative capabilities across international engineering hubs.",
    skills: [
      { name: "Italian (Native)", level: 100, info: "Primary mother tongue language. Advanced descriptive structure and professional communication." },
      { name: "English (B1 Level)", level: 75, info: "B1 certified competence level: Fluent Listening, Writing, Oral Production, Reading, and interactive technical handshakes." },
      { name: "Japanese (N3/N2 Level)", level: 80, info: "Strong oral interaction and active listening equivalent to N3/N2. N3 text reading, Japanese Kanji N3 writing, and Busuu B1 Certified with A+ (95%)." }
    ]
  },
  {
    title: "Interpersonal & Tools",
    description: "Socio-technical core integration, development workspaces, and communicative team assets.",
    skills: [
      { name: "Analytical Problem Solving", level: 92, info: "Deconstructing complex stack architectures, diagnosing latency blocks, and resolving data synchronization deadlocks." },
      { name: "Attention to Details", level: 95, info: "Micro-animations accuracy, strict pixel-perfect designs, and absolute compiler warnings compliance." },
      { name: "Workspace Systems & IDEs", level: 88, info: "JetBrains IntelliJ IDEA, Visual Studio Code, PyCharm, GIT versioning protocols, and GitHub automation registers." },
      { name: "Team Integration & Adaptability", level: 90, info: "Effective teamwork, time-management pipelines, client active listening, and continuous technological flexibility." }
    ]
  }
];

export const skillsCategoriesIT: SkillCategory[] = [
  {
    title: "Competenze Digitali",
    description: "Sviluppo software simmetrico, ecosistemi backend aziendali e pipeline di framework moderni.",
    skills: [
      { name: "Programmazione Java SE/EE", level: 90, info: "Paradigmi OOP, architettura JVM, multi-threading e specifiche di livello Oracle Java Foundations Certified Associate." },
      { name: "Spring & Spring Boot Suite", level: 82, info: "Sviluppo di API REST robuste, moduli Spring Security, repository Spring Data JPA, Spring Data REST e livelli di persistenza Hibernate." },
      { name: "Angular 18+ Framework", level: 78, info: "Strutture SPA aziendali, gestione del ciclo di vita dei componenti, basato sul programma Udemy 2025 Complete Guide." },
      { name: "JavaScript & TypeScript", level: 85, info: "Event-loops asincroni, interfacce tipizzate TS rigorose, programmabilità funzionale e architetture client modulari." },
      { name: "Oracle Cloud Infrastructure (OCI)", level: 88, info: "Cloud aziendale, linee guida UI Oracle Redwood, strutture AI Foundations Associate e servizi Certified Generative AI Professional." },
      { name: "Machine Learning e AI Generativa", level: 80, info: "Integrazione di modelli neurali pratici, ingegneria dei prompt, telemetria generativa e principi base di apprendimento automatico." },
      { name: "MySQL & Linguaggio SQL", level: 82, info: "Progettazione di database relazionali, indici di tuning, join di query efficienti e analisi strutturale delle query SQL." },
      { name: "Apprendimento Continuo & Nuove Tecnologie", level: 95, info: "Sempre pronto a imparare con passione, curiosità e velocità nell'assimilare nuovi linguaggi, framework e standard moderni." }
    ]
  },
  {
    title: "Competenze Linguistiche",
    description: "Sistemi di comunicazione ad alta fedeltà per team di ingegneria globali.",
    skills: [
      { name: "Italiano (Madrelingua)", level: 100, info: "Lingua madre nativa. Piena fluidità espressiva, dialettica professionale e padronanza sintattica." },
      { name: "Inglese (Livello B1)", level: 75, info: "Livello di competenza certificato B1 in Ascolto, Produzione Orale, Scrittura, Lettura e Interazione tecnica." },
      { name: "Giapponese (Livello N3/N2)", level: 80, info: "Interazione orale e ascolto attivi di livello equivalente a N3/N2. Lettura e comprensione testi N3, Scrittura N3, Certificato Busuu B1 con A+ (95%)." }
    ]
  },
  {
    title: "Interpersonali & Strumenti",
    description: "Integrazione socio-tecnica, ambienti di sviluppo integrati ed elementi di coordinamento del team.",
    skills: [
      { name: "Problem Solving Analitico", level: 92, info: "Scomposizione di bug architetturali complessi, analisi dei blocchi di latenza e risoluzione dei deadlock di dati." },
      { name: "Attenzione ai Dettagli", level: 95, info: "Precisione millimetrica nelle animazioni, design pixel-perfect ed eliminazione rigorosa di tutti i warning del compilatore." },
      { name: "Sistemi & Ambienti di Sviluppo", level: 88, info: "JetBrains IntelliJ IDEA, Visual Studio Code, PyCharm, protocolli di versionamento GIT e registri di automazione GitHub." },
      { name: "Lavoro in Team & Adattabilità", level: 90, info: "Propensione all'ascolto, contatto con il cliente, adattabilità, flessibilità temporale e dinamismo negli obiettivi di squadra." }
    ]
  }
];

// Localized Certifications
export const certificationsDataEN: Certification[] = [
  {
    id: "cert-oracle-ai-pro",
    name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle University",
    date: "31/10/2025"
  },
  {
    id: "cert-oracle-redwood",
    name: "Oracle Redwood Application 2025 Certified Developer Associate",
    issuer: "Oracle University",
    date: "28/10/2025"
  },
  {
    id: "cert-oracle-java",
    name: "Oracle Java Certified Foundations Associate",
    issuer: "Oracle University",
    date: "28/07/2025"
  },
  {
    id: "cert-oracle-ai-found",
    name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle University",
    date: "20/06/2025"
  },
  {
    id: "cert-japanese-b1",
    name: "Busuu Japanese B1 Certification (Grade: A+ // 95%)",
    issuer: "Busuu Language Academy",
    date: "17/01/2024"
  },
  {
    id: "cert-volta-java",
    name: "Oracle Java Programmer Academy Master (Grade: 80/100)",
    issuer: "Istituto Volta",
    date: "16/09/2023"
  },
  {
    id: "cert-udemy-angular",
    name: "Angular - The Complete Guide (2025 Edition)",
    issuer: "Udemy Professional Development",
    date: "08/12/2025"
  },
  {
    id: "cert-udemy-spring",
    name: "Spring Boot 3, Spring 6 & Hibernate Series",
    issuer: "Udemy Professional Training",
    date: "05/12/2025"
  }
];

export const certificationsDataIT: Certification[] = [
  {
    id: "cert-oracle-ai-pro",
    name: "Certificazione Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle University",
    date: "31/10/2025"
  },
  {
    id: "cert-oracle-redwood",
    name: "Certificazione Oracle Redwood Application 2025 Certified Developer Associate",
    issuer: "Oracle University",
    date: "28/10/2025"
  },
  {
    id: "cert-oracle-java",
    name: "Certificazione Oracle Java Certified Foundations Associate",
    issuer: "Oracle University",
    date: "28/07/2025"
  },
  {
    id: "cert-oracle-ai-found",
    name: "Certificazione Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle University",
    date: "20/06/2025"
  },
  {
    id: "cert-japanese-b1",
    name: "Certificazione Busuu Livello B1 di Giapponese (Voto: A+ // 95%)",
    issuer: "Busuu Language Academy",
    date: "17/01/2024"
  },
  {
    id: "cert-volta-java",
    name: "Master Istituto Volta \"Corso Oracle Java Programmer\" (Voto: 80/100)",
    issuer: "Istituto Volta",
    date: "16/09/2023"
  },
  {
    id: "cert-udemy-angular",
    name: "Completamento Corso Udemy: Angular - The Complete Guide (Edizione 2025)",
    issuer: "Udemy Professional Development",
    date: "08/12/2025"
  },
  {
    id: "cert-udemy-spring",
    name: "Completamento Corso Udemy: Spring Boot 3, Spring 6 & Hibernate",
    issuer: "Udemy Professional Training",
    date: "05/12/2025"
  }
];

// Experience localizations
export const experienceDataEN: Experience[] = [
  // =========================================================================================
  // CURRENT STATUS / ACTIVELY SEEKING EMPLOYMENT (UPDATE THIS ENTRY ONCE YOU SECURE A ROLE)
  // =========================================================================================
  {
    id: "exp-open-to-work",
    company: "Actively Seeking Opportunities // Open to Work",
    role: "Full-Stack Developer · AI Engineer · Java Backend Specialist",
    period: "Current // Immediate Availability",
    description: [
      "Actively looking for software engineering opportunities as Full-Stack Developer, AI Engineer, or Java Backend Developer (Full-time or Contract).",
      "Always eager to learn new technologies, frameworks, paradigms, and architectures with relentless curiosity and rapid execution.",
      "Available for immediate onboarding. Fully flexible for Remote, Hybrid, or On-site positions in Italy and globally.",
      "Deep expertise across Java Spring Boot microservices, modern Angular / TypeScript architectures, Oracle Certified Generative AI Professional standards, and SQL optimization."
    ],
    skills: ["Full-Stack", "AI Engineer", "Java Backend", "Spring Boot", "Angular", "TypeScript", "Eager to Learn", "Immediate Start"]
  },
  {
    id: "exp-redwood-dev",
    company: "Oracle Redwood Solutions",
    role: "System Analyst & Java Developer",
    period: "2025",
    description: [
      "Engineered automated REST API layers leveraging the Spring Boot core architecture and secured integration pipelines via Spring Security.",
      "Successfully modernized corporate web workflows on top of Oracle Redwood design topologies, increasing team rendering efficiencies."
    ],
    skills: ["Java", "Spring Boot", "Oracle Redwood", "TypeScript", "MySQL"]
  },
  {
    id: "exp-volta-systems",
    company: "Volta Automation Labs",
    role: "Junior Systems Architect - Java Programmer",
    period: "2024",
    description: [
      "Developed secure client-server databases relational models utilizing SQL optimizations and Hibernate entity mapping.",
      "Integrated machine-learning pipelines and prompt optimization rules for generative AI models."
    ],
    skills: ["Java", "Hibernate", "SQL", "Git", "AI Integrations"]
  }
];

export const experienceDataIT: Experience[] = [
  // =========================================================================================
  // STATO ATTUALE / ALLA RICERCA DI LAVORO (MODIFICA QUESTO BLOCCO QUANDO TROVERAI LAVORO)
  // =========================================================================================
  {
    id: "exp-open-to-work",
    company: "In Cerca Attiva di Opportunità // Aperto a Proposte Lavorative",
    role: "Sviluppatore Full-Stack · AI Engineer · Backend Java",
    period: "Attuale // Disponibilità Immediata",
    description: [
      "Attivamente alla ricerca di una posizione lavorativa come Sviluppatore Full-Stack, AI Engineer o Sviluppatore Backend Java (Full-time o Contratto).",
      "Sempre pronto a imparare cose nuove: grande curiosità, passione per la tecnologia e massima rapidità nell'assimilare nuovi linguaggi, framework e metodologie.",
      "Disponibile per inserimento immediato in organico. Piena disponibilità per posizioni da Remoto, Ibride o In Sede in Italia e a livello internazionale.",
      "Solide competenze in microservizi enterprise con Spring Boot, frontend reattivi e modulari in Angular / TypeScript, certificazioni Oracle Generative AI e database relazionali."
    ],
    skills: ["Full-Stack", "AI Engineer", "Backend Java", "Spring Boot", "Angular", "TypeScript", "Sempre Pronto a Imparare", "Disponibile Subito"]
  },
  {
    id: "exp-redwood-dev",
    company: "Oracle Redwood Solutions",
    role: "Analista di Sistemi & Sviluppatore Java",
    period: "2025",
    description: [
      "Ingegnerizzato livelli API REST automatizzati sfruttando Spring Boot e integrato canali di sicurezza con moduli di sicurezza Spring Security.",
      "Modernizzato i workflow aziendali web sulle linee guida Redwood di Oracle, aumentando l'efficienza dei sistemi utente."
    ],
    skills: ["Java", "Spring Boot", "Oracle Redwood", "TypeScript", "MySQL"]
  },
  {
    id: "exp-volta-systems",
    company: "Volta Automation Labs",
    role: "Sviluppatore Java Junior & Analista",
    period: "2024",
    description: [
      "Sviluppato modelli relazionali sicuri per database client-server ottimizzando query SQL e tabelle Hibernate.",
      "Integrato pipeline di machine learning e logiche di ottimizzazione prompt per modelli di AI generativa."
    ],
    skills: ["Java", "Hibernate", "SQL", "Git", "AI Integrations"]
  }
];

// Project localized data (OmniSync can refer to Redwood layouts and Java spring setups)
export const projectsDataEN: Project[] = [
  {
    id: "employee-mgmt",
    title: "Employee Management System",
    role: "Full-Stack Developer",
    period: "2024 - 2025",
    description: "A robust enterprise directory consisting of a secure decoupled frontend and a Spring Boot security-compliant backend to manage corporate hierarchies. Features automated roles orchestration and real-time registry audits.",
    tech: ["Java", "Spring Boot", "React", "TypeScript", "MySQL"],
    metrics: "Ensures 100% secure role division and reduces directory auditing query overhead by 50%.",
    features: [
      "Decoupled Full-Stack architecture powered by a React client and optimized Java Spring Boot system.",
      "Database security integrations with modular JWT token authentication and encrypted endpoint controls.",
      "Integrated MySQL relational schemas with structural index-joining configurations for safe persistence."
    ],
    github: "https://github.com/Eiphilim-dev/employee-management-frontend-e-employee-management-backend.git"
  }
];

export const projectsDataIT: Project[] = [
  {
    id: "employee-mgmt",
    title: "Employee Management System",
    role: "Sviluppatore Full-Stack",
    period: "2024 - 2025",
    description: "Un solido sistema aziendale composto da un frontend reattivo disaccoppiato e un backend conforme agli standard Spring Boot per la gestione gerarchica del personale. Fornisce l'orchestrazione automatizzata dei ruoli e l'audit in tempo reale.",
    tech: ["Java", "Spring Boot", "React", "TypeScript", "MySQL"],
    metrics: "Garantisce una gestione dei ruoli sicura al 100% riducendo i tempi di ispezione del registro del 50%.",
    features: [
      "Architettura disaccoppiata Full-Stack con interfaccia in React/TypeScript e solido backend Spring Boot.",
      "Integrità di sicurezza con autenticazione granulare JWT e controllo rigoroso degli endpoint.",
      "Schemi relazionali MySQL ottimizzati per garantire l'integrità strutturale e l'efficienza delle interrogazioni."
    ],
    github: "https://github.com/Eiphilim-dev/employee-management-frontend-e-employee-management-backend.git"
  }
];

export const contactChannels: ContactChannel[] = [
  {
    name: "Email",
    value: "andreaeduard.magri391@gmail.com",
    href: "mailto:andreaeduard.magri391@gmail.com",
    iconName: "Mail"
  },
  {
    name: "GitHub",
    value: "github.com/Eiphilim-dev",
    href: "https://github.com/Eiphilim-dev",
    iconName: "Github"
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/andreaeduard-magrì-2a1111333",
    href: "https://www.linkedin.com/in/andreaeduard-magr%C3%AC-2a1111333/",
    iconName: "Linkedin"
  }
];
