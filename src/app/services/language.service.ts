import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'it';

export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    'home.greet': 'HELLO_WORLD_NODE_INIT',
    'home.activeFocus': 'Current Focus',
    'home.archives': 'RECEIVING ARCHIVES //',
    'home.registry': 'STATUS REGISTRY:',
    'home.statusText': 'All diagnostic systems verified; node clusters reporting optimal performance metrics.',
    'home.pipeline': 'ENGAGE PIPELINE',
    'home.introPhilosophy': 'I am passionate about programming, characterised by determination, a desire to always give my best, a commitment to improve, and an unquenchable thirst for new knowledge. I possess an excellent knowledge of both English and Japanese.',

    'sidebar.status': 'TERMINAL ONLINE',
    'sidebar.soundtrack': 'SOUNDTRACK PROTOCOL:',
    'sidebar.soundOn': 'VELVET_AMBIENT // ON',
    'sidebar.soundOff': 'PLAY P3 MENU TRACK',
    'sidebar.oceanWash': 'OCEAN WASH VOLUME',
    'sidebar.sequencerPad': 'SEQUENCER PAD CHORDS',
    'sidebar.link': 'SECURE_LINK',

    'about.title': 'ABOUT_ME',
    'about.specTitle': 'SPECIFICATION',
    'about.status': 'Current Status',
    'about.statusText': '"Actively seeking opportunities as Full-Stack Developer, AI Engineer, and Java Backend Specialist. Always eager to learn new technologies. Available immediately."',
    'about.p1': 'I am a Full-Stack Developer, AI Engineer, and Java Backend Specialist based in Italy. Passionate about engineering scalable software architectures, I am driven by strong determination, a desire to always give my best, and an unquenchable thirst to continuously learn emerging technologies.',
    'about.p2': 'I approach development by uniting robust enterprise backend systems (Java, Spring Boot, SQL, microservices) with intelligent AI workflows (Oracle Cloud Generative AI, machine learning pipelines) and modern reactive web frameworks (Angular, TypeScript, Tailwind CSS).',
    'about.p3': 'When building products, my high-priority concern is balancing high-contrast visibility with structural simplicity and maximum security. I prioritize extreme performance, clean type safety, and honest, accessible user experiences.',
    'about.principlesTitle': 'Core Operational Principles',
    'about.principles': [
      {
        title: "Synthesizing Solutions",
        desc: "Engineering clean, predictable TS pipelines that don't rely on black-box assumptions. Modular code, clear variable naming, and strict types are non-negotiable."
      },
      {
        title: "Contrast & Accessibility",
        desc: "Treating accessibility (WCAG AA/AAA compliance) not as a checkbox list, but as a core design constraint. If it can't be operated by a keyboard, it isn't finished."
      },
      {
        title: "Architectural Integrity",
        desc: "Balancing database design and backend schemas with fluid interfaces. Ensuring indexes are tuned, associations are lean, and cold runs remain snappy."
      }
    ],

    'skills.title': 'SKILL_TREE',
    'skills.introText': 'Interactive system specification grid. Activate any specific skill block to perform a structural registry interrogation in the inspector card on the right.',
    'skills.inspectorTitle': 'INSPECTOR_STAGE',
    'skills.results': 'Interrogation Results',
    'skills.efficiency': 'ESTIMATED_EFFICIENCY:',
    'skills.category.lang': 'Language Proficiencies',
    'skills.category.langDesc': 'High-fidelity linguistic systems in English, Japanese, and Italian.',
    'skills.category.digital': 'Digital Competencies',
    'skills.category.digitalDesc': 'Symmetric enterprise software structures, cloud architectures, and machine learning principles.',
    'skills.category.soft': 'Interpersonal Adaptability',
    'skills.category.softDesc': 'Socio-technical core integration, detail-oriented design alignment, and dynamic problem solving.',

    'experience.title': 'LOG_TIMELINE',
    'experience.workTitle': 'Work Milestones & Development',
    'experience.certTitle': 'Qualifications & Certifications',
    'experience.certVerified': 'CERT_LEDGER // APPROVED',
    'experience.credId': 'CREDENTIAL_ID:',

    'projects.title': 'PROJ_CATALOG',
    'projects.period': 'PERIOD:',
    'projects.perf': 'PERFORMANCE METRIC:',
    'projects.core': 'CORE CONSTRAINTS:',

    'contact.title': 'CONTACT_ROUTING',
    'contact.channelGreet': 'DIRECT CHANNELS',
    'contact.channelSub': 'Synchronize secure linkages to initiate full integration pipeline audits.',
    'contact.formGreet': 'INTEGRATE_ENVELOPE',
    'contact.formSub': 'Compose automated packet routing payloads to ping client communications.',
    'contact.formName': 'CLIENT_IDENTITY',
    'contact.formEmail': 'ROUTING_EMAIL',
    'contact.formSubject': 'HANDSHAKE_SUBJECT',
    'contact.formMessage': 'PAYLOAD_DATA',
    'contact.formSend': 'ROUTE ENVELOPE',
    'contact.formSending': 'ROUTING...',
    'contact.formSuccess': 'TRANSMISSION STABLE // Envelope successfully routed.',
    'contact.formError': 'TRANSMISSION CHOKE // Error routing envelope.',
  },
  it: {
    'nav.home': 'Home',
    'nav.about': 'Chi Sono',
    'nav.skills': 'Competenze',
    'nav.experience': 'Esperienza',
    'nav.projects': 'Progetti',
    'nav.contact': 'Contatti',

    'home.greet': 'HELLO_WORLD_NOD_INIZIALIZZATO',
    'home.activeFocus': 'Focus Attuale',
    'home.archives': 'RICEZIONE ARCHIVI //',
    'home.registry': 'REGISTRO DI STATO:',
    'home.statusText': 'Tutti i sistemi diagnostici sono verificati; i cluster dei nodi segnalano metriche ed efficienza ottimali.',
    'home.pipeline': 'AVVIA PIPELINE',
    'home.introPhilosophy': 'Sono un appassionato di programmazione, mi caratterizzano determinazione, voglia di dare sempre il massimo, voglia di migliorare e sete di nuove conoscenze, ho un\'ottima conoscenza della lingua inglese e giapponese.',

    'sidebar.status': 'TERMINAL ONLINE',
    'sidebar.soundtrack': 'PROTOCOLLO COLONNA SONORA:',
    'sidebar.soundOn': 'AMBIENT VELVET // ON',
    'sidebar.soundOff': 'AVVIA AUDIO MENU P3',
    'sidebar.oceanWash': 'VOLUME OCEAN WASH',
    'sidebar.sequencerPad': 'ACCORDI CON SINTETIZZATORE',
    'sidebar.link': 'COLLEGAMENTO SECURE',

    'about.title': 'INFO_SISTEMA',
    'about.specTitle': 'SPECIFICHE',
    'about.status': 'Stato Attuale',
    'about.statusText': '"In cerca attiva di lavoro: Full-Stack Developer, AI Engineer, Backend Java. Sempre pronto a imparare nuove tecnologie. Disponibile da subito."',
    'about.p1': 'Sono uno Sviluppatore Full-Stack, AI Engineer e specialista Backend Java con base in Italia. La mia passione per la programmazione si unisce a forte determinazione, costante desiderio di migliorarsi e una sete inesauribile di imparare nuove tecnologie e paradigmi architetturali.',
    'about.p2': 'Approccio lo sviluppo unendo la solidità del backend enterprise (Java, Spring Boot, microservizi, SQL) con le potenzialità dell\'intelligenza artificiale (certificazioni Oracle Cloud Generative AI, machine learning) e la fluidità reattiva dei framework frontend moderni (Angular, TypeScript, Tailwind CSS).',
    'about.p3': 'Nello sviluppo software metto al primo posto la massima sicurezza, l\'affidabilità delle pipeline e un\'esperienza utente accessibile e performante. Sempre entusiasta di affrontare nuove sfide tecnologiche.',
    'about.principlesTitle': 'Principi Operativi Fondamentali',
    'about.principles': [
      {
        title: "Sintetizzare Soluzioni",
        desc: "Ingegnerizzare pipeline trasparenti e modulari in TypeScript. Codice strutturato, nomi auto-esplicativi e forte tipizzazione sono condizioni non negoziabili."
      },
      {
        title: "Contrasto e Accessibilità",
        desc: "Considerare l'accessibilità (WCAG AA/AAA) non come un mero controllo finale, ma come vincolo architetturale essenziale. Se non è navigabile da tastiera, non è completo."
      },
      {
        title: "Integrità Strutturale",
        desc: "Bilanciare schemi backend con interfacce fluide. Ottimizzazione degli indici di database, ottimizzazione dei carichi di rete e risposte veloci all'avvio."
      }
    ],

    'skills.title': 'ALBERO_ABILITÀ',
    'skills.introText': 'Griglia interattiva delle abilità tecniche e linguistiche. Seleziona una classe dal registro per interrogarne le specifiche nel terminale di ispezione sulla destra.',
    'skills.inspectorTitle': 'ISPEZIONE_SISTEMA',
    'skills.results': 'Risultati Interrogazione',
    'skills.efficiency': 'EFFICIENZA_STIMATA:',
    'skills.category.lang': 'Competenze Linguistiche',
    'skills.category.langDesc': 'Sistemi linguistici ad alta fedeltà (Giapponese, Inglese, Italiano).',
    'skills.category.digital': 'Competenze Digitali',
    'skills.category.digitalDesc': 'Programmazione d\'impresa, database relazionali, architetture cloud Oracle e intelligenza artificiale.',
    'skills.category.soft': 'Competenze Interpersonali',
    'skills.category.softDesc': 'Integrazione socio-tecnica, problem solving e flessibilità organizzativa negli obiettivi aziendali.',

    'experience.title': 'REGISTRO_CRONOLOGICO',
    'experience.workTitle': 'Milestone Lavorative e Sviluppo',
    'experience.certTitle': 'Qualifiche e Certificazioni',
    'experience.certVerified': 'REGISTRO_CERT // APPROVATO',
    'experience.credId': 'ID_CREDENTIAL:',

    'projects.title': 'CATALOGO_PROGETTI',
    'projects.period': 'PERIODO:',
    'projects.perf': 'METRICHE DI EFFICIENZA:',
    'projects.core': 'VINCOLI FONDAMENTALI:',

    'contact.title': 'INOLTRO_CONTATTI',
    'contact.channelGreet': 'CANALI DIRETTI',
    'contact.channelSub': 'Sincronizza i canali di collegamento sicuri per avviare sessioni di comunicazione directe.',
    'contact.formGreet': 'SVILUPPO_BUSTA',
    'contact.formSub': 'Componi il payload di routing per avviare il protocollo di comunicazione via email.',
    'contact.formName': 'IDENTITÀ_CLIENTE',
    'contact.formEmail': 'EMAIL_ROUTING',
    'contact.formSubject': 'SOGGETTO_HANDSHAKE',
    'contact.formMessage': 'DATI_PAYLOAD',
    'contact.formSend': 'INVIA BUSTA',
    'contact.formSending': 'INOLTRO IN CORSO...',
    'contact.formSuccess': 'CONNESSIONE STABILE // Pacchetto inviato con successo.',
    'contact.formError': 'ERRORE DI TRASMISSIONE // Blocco dell\'inoltro del pacchetto.',
  }
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSignal = signal<Language>(this.getSavedLanguage());

  language = computed(() => this.currentLanguageSignal());

  setLanguage(lang: Language) {
    this.currentLanguageSignal.set(lang);
    try {
      localStorage.setItem('portfolio_pref_lang', lang);
    } catch (e) {
      console.warn('[Language Service] Could not write preferred language to localStorage inside sandbox:', e);
    }
  }

  private getSavedLanguage(): Language {
    try {
      const saved = localStorage.getItem('portfolio_pref_lang');
      return (saved === 'it' || saved === 'en') ? saved : 'en';
    } catch (e) {
      console.warn('[Language Service] Could not read preferred language from localStorage inside sandbox. Falling back to default:', e);
      return 'en';
    }
  }

  t(key: string): any {
    const lang = this.currentLanguageSignal();
    const currentTranslations = translations[lang] as any;
    
    // Check direct flat key first
    if (currentTranslations && currentTranslations[key] !== undefined) {
      return currentTranslations[key];
    }
    // Fallback direct flat key in English
    const englishTranslations = translations['en'] as any;
    if (englishTranslations && englishTranslations[key] !== undefined) {
      return englishTranslations[key];
    }

    const keys = key.split('.');
    let dict: any = currentTranslations;
    for (const k of keys) {
      if (dict && dict[k] !== undefined) {
        dict = dict[k];
      } else {
        // Fallback to English
        let fallbackDict: any = englishTranslations;
        for (const fk of keys) {
          if (fallbackDict && fallbackDict[fk] !== undefined) {
            fallbackDict = fallbackDict[fk];
          } else {
            return key;
          }
        }
        return fallbackDict;
      }
    }
    return dict;
  }
}
