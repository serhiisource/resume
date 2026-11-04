export type Language = "de" | "en" | "ru";

export interface PainPointCard {
  id: string;
  tag: string;
  title: string;
  desc: string;
  tiltAngle: number;
  diagramType: "wave" | "latency" | "nodes" | "growth";
}

export interface ShowcaseProject {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  link?: string;
  linkLabel?: string;
  featured?: boolean;
  metrics: { value: string; label: string }[];
  terminalHeader: string;
  terminalRows: { left: string; right: string; highlight?: boolean; green?: boolean }[];
}

export interface SolutionStep {
  num: string;
  text: string;
  tag: string;
}

export interface TimelineItem {
  period: string;
  role: string;
  company: string;
  link?: string;
  bullets: string[];
}

export interface TranslationContent {
  meta: {
    status: string;
    ctaButton: string;
    locationShort: string;
  };
  nav: {
    intro: string;
    problem: string;
    showcase: string;
    solution: string;
    cv: string;
    why: string;
    contact: string;
  };
  hero: {
    badge: string;
    roles: string;
    name: string;
    subName: string;
    line1Prefix: string;
    line1Pixel: string;
    line2Serif: string;
    line2Suffix: string;
    line3: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    dossierTitle: string;
    profileMeta: { label: string; value: string; highlight?: boolean }[];
    skillsTitle: string;
    coreSkillChips: string[];
    journeyTitle: string;
    journeyBadge: string;
    journeyMilestones: {
      year: string;
      role: string;
      focus: string;
      desc: string;
      tag: string;
    }[];
  };
  problem: {
    sectionTag: string;
    scrollStatement: string;
    highlightWordsCount: number;
    subhead: string;
    cards: PainPointCard[];
  };
  showcase: {
    sectionTag: string;
    titlePlain: string;
    titleSerif: string;
    subtitle: string;
    projects: ShowcaseProject[];
  };
  solution: {
    sectionTag: string;
    titlePlain: string;
    titleSerif: string;
    titlePixel: string;
    steps: SolutionStep[];
  };
  cv: {
    sectionTag: string;
    titlePlain: string;
    titleSerif: string;
    careerHeading: string;
    educationHeading: string;
    personalHeading: string;
    skillsHeading: string;
    languagesHeading: string;
    career: TimelineItem[];
    education: TimelineItem[];
    personal: { label: string; value: string; href?: string }[];
    skillGroups: { category: string; items: string[] }[];
    languages: { name: string; level: string }[];
  };
  whyMe: {
    sectionTag: string;
    titlePlain: string;
    titleSerif: string;
    stats: { number: string; label: string }[];
    formatsTitle: string;
    formats: { tag: string; title: string; desc: string }[];
  };
  footer: {
    sectionTag: string;
    titleLine1: string;
    titleSerif: string;
    titlePixel: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  drawer: {
    header: string;
    closeEsc: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    phoneLabel: string;
    projectLabel: string;
    addressLabel: string;
    copySuccess: string;
  };
}

export const CV_DATA: Record<Language, TranslationContent> = {
  de: {
    meta: {
      status: "VERFÜGBAR IN DEUTSCHLAND (85258 WEICHS / MÜNCHEN)",
      ctaButton: "KONTAKT",
      locationShort: "WEICHS / MÜNCHEN, DE",
    },
    nav: {
      intro: "Intro",
      problem: "Kompetenzen",
      showcase: "Arbfeld & 3D",
      solution: "Die Lösung",
      cv: "Lebenslauf",
      why: "Warum Ich",
      contact: "Starten",
    },
    hero: {
      badge: "FOUNDER & SYSTEMARCHITEKT — ARBFELD",
      roles: "KI AGENT ENGINEER · AUTOMATION SPECIALIST · FULL-STACK BUILDER",
      name: "SERHII ROHOVSKYI",
      subName: "SERGEY ROGOVSKY // 23.02.2004",
      line1Prefix: "AUTONOME",
      line1Pixel: "[KI-AGENTEN]",
      line2Serif: "Systemarchitektur",
      line2Suffix: "&",
      line3: "HIGH-SPEED PLATTFORMEN.",
      lead: "Ich bin Serhii Rohovskyi — KI-Entwickler, Systemarchitekt und Gründer von Arbfeld mit Sitz in Weichs (Raum München). Ich verwandle komplexe Echtzeit-Datenströme, Multi-Agenten-Workflows und IT-Infrastrukturen in produktionsreife Systeme — komplett von Grund auf gebaut.",
      primaryCta: "ARBFELD LIVE ÖFFNEN",
      secondaryCta: "GESPRÄCH VEREINBAREN",
      dossierTitle: "PROFIL // STECKBRIEF",
      profileMeta: [
        { label: "NAME", value: "Serhii Rohovskyi (Сергей Роговский)" },
        { label: "ROLLE", value: "KI Agent Engineer · Systemarchitekt", highlight: true },
        { label: "STANDORT", value: "85258 Weichs / München, Deutschland" },
        { label: "HERKUNFT", value: "Mariupol, Ukraine (geb. 23.02.2004)" },
        { label: "FLAGSHIP", value: "Arbfeld (arbfeld.github.io)", highlight: true },
        { label: "STATUS", value: "Verfügbar für Anstellung & Projekte", highlight: true },
      ],
      skillsTitle: "KERNKOMPETENZEN & STACK",
      coreSkillChips: [
        "Autonome KI-Agenten",
        "Multi-Agent Pipelines",
        "Data Mining & Web Scraping",
        "Python / LLM APIs",
        "Docker & Edge Computing",
        "Order-Book Depth L2",
        "Next.js / TypeScript",
        "Systemarchitektur",
        "Figma & Blender 3D",
        "Prompt-Engineering",
      ],
      journeyTitle: "MEIN WEG // VOM ENTWURF ZUM LIVE-SYSTEM",
      journeyBadge: "4 MEILENSTEINE",
      journeyMilestones: [
        {
          year: "2021 — 2022",
          role: "Architekturstudium & Statik",
          focus: "Mariupol Baukolleg, Ukraine",
          desc: "Fundament für strukturelles Denken, Raum- & Systemkonzepte, technisches Zeichnen (CAD). Kriegsbedingt unterbrochen.",
          tag: "ARCHITEKTUR",
        },
        {
          year: "2022 — 2024",
          role: "Leitender Systemarchitekt & Logistiker",
          focus: "Progress LLC, Rozivka",
          desc: "Planung der gesamten Unternehmens-IT, Absicherung der Datenintegrität, Steuerung hochgradig vernetzter Warenströme und Datenbanken.",
          tag: "INFRASTRUKTUR",
        },
        {
          year: "2024 — 2025",
          role: "KI-Agent Engineer & Freelance Entwickler",
          focus: "Remote / Selbstständig",
          desc: "Entwicklung maßgeschneiderter Bots, autonomer Web-Mining-Agenten und nahtlose Integration generativer KI-APIs in Geschäftsprozesse.",
          tag: "KI-AUTOMATION",
        },
        {
          year: "Seit 2026",
          role: "Gründer & Systemarchitekt Arbfeld",
          focus: "Weichs / München, Deutschland",
          desc: "Komplette Solo-Entwicklung einer High-Speed Krypto-Arbitrage-Engine: 31 Paare × 15 Börsen, Berechnung voller Orderbuch-Tiefe in Echtzeit.",
          tag: "SOLO FOUNDER",
        },
      ],
    },
    problem: {
      sectionTag: "01 // INGENIEURSPRAXIS & SYSTEME",
      scrollStatement:
        "Ich baue keine oberflächlichen Chat-Prompts. Ich entwickle autonome KI-Agenten, High-Speed-Arbitrage und belastbare Systemarchitekturen.",
      highlightWordsCount: 3,
      subhead: "KERNPFEILER MEINER ENTWICKLUNGSARBEIT",
      cards: [
        {
          id: "001",
          tag: "AUTONOME KI-AGENTEN",
          title: "Multi-Agenten-Pipelines für 24/7 Web-Intelligence & Data Mining",
          desc: "Entwicklung und Koordination autonomer Agentenschwärme, die unstrukturierte Webdaten in Echtzeit entdecken, semantisch mit LLMs filtern und über APIs direkt in Produktionsdatenbanken einspeisen.",
          tiltAngle: -1.8,
          diagramType: "nodes",
        },
        {
          id: "002",
          tag: "ECHTZEIT-ENGINE // ARBFELD",
          title: "Full L2 Orderbuch-Tiefe über 31 Paare und 15 Börsen",
          desc: "Mathematische Echtzeit-Berechnung realer Ausführungspreise im Krypto-Arbitrage-Handel (Binance, Kraken, Bybit, OKX u.a.) inklusive kumulierter Volumina, dynamischer Slippage und Börsengebühren.",
          tiltAngle: 1.5,
          diagramType: "latency",
        },
        {
          id: "003",
          tag: "ENTERPRISE ARCHITEKTUR",
          title: "Hochverfügbare IT-Infrastruktur, Docker & API-Sicherheit",
          desc: "Fundierte Praxiserfahrung als Leitender Systemarchitekt: Auslegung stabiler Serverumgebungen, Monitoring von Datenintegrität und nahtlose Anbindung generativer KI-Schnittstellen.",
          tiltAngle: 1.2,
          diagramType: "wave",
        },
        {
          id: "004",
          tag: "FULL-STACK & 3D/CAD",
          title: "Ganzheitliche Umsetzung: Von der Statik bis zum Next.js-Frontend",
          desc: "Verbindung von analytischem Architekturdenken (CAD, Statik, Blender 3D) mit modernem Web-Engineering (TypeScript, Tailwind, GSAP). Schnelle Prototypen, die sofort einsatzbereit sind.",
          tiltAngle: -1.4,
          diagramType: "growth",
        },
      ],
    },
    showcase: {
      sectionTag: "02 // 3D-PROJEKT-SEQUENZ",
      titlePlain: "SYSTEME IM",
      titleSerif: "Echtbetrieb",
      subtitle: "Scrollen Sie durch die 3D-Achse meiner wichtigsten Plattformen und Architekturen.",
      projects: [
        {
          id: "arbfeld",
          badge: "FLAGSHIP PLATTFORM // GRÜNDER & INITIATOR (SEIT 10/2026)",
          title: "ARBFELD — Cross-Exchange Crypto Arbitrage",
          subtitle: "arbfeld.github.io",
          description:
            "Voll funktionsfähige Krypto-Arbitrage-Plattform, komplett eigenständig von Grund auf entwickelt. Scant 31 Handelspaare über 15 große Börsen (Binance, Bybit, OKX, Kraken, Coinbase u.a.) und berechnet den realen Ausführungspreis über die volle Orderbuch-Tiefe (Order-Book Depth) inklusive Volumen, Slippage, Gebühren und optimaler Trade-Größe (A↔B).",
          link: "https://arbfeld.github.io/",
          linkLabel: "ARBFELD LIVE STARTEN ↗",
          featured: true,
          metrics: [
            { value: "31 × 15", label: "Paare × Börsen" },
            { value: "FULL L2", label: "Orderbuch-Tiefe" },
            { value: "EDGE", label: "Serverless Echtzeit" },
          ],
          terminalHeader: "ARBFELD // REAL-TIME ORDER-BOOK ENGINE",
          terminalRows: [
            { left: "SCAN MATRIX", right: "31 PAIRS × 15 EXCHANGES", green: true },
            { left: "EXECUTION MATH", right: "VOLUME + SLIPPAGE + FEES" },
            { left: "DIRECTIONAL SPREAD", right: "BIDIRECTIONAL A ↔ B", highlight: true },
            { left: "LATENCY ARCHITECTURE", right: "SERVERLESS EDGE / PUBLIC APIS" },
            { left: "TERMINAL ANALYTICS", right: "TRADINGVIEW CHARTS · 4 LANGS · CSV" },
          ],
        },
        {
          id: "ki-agents",
          badge: "AUTONOME SYSTEME // SEIT 04/2025",
          title: "Multi-Agenten Data-Mining & Web-Intelligence",
          subtitle: "KI Agent Engineer & Automation Specialist",
          description:
            "Design, Erstellung und Steuerung autonomer KI-Agenten und Bot-Systeme zur automatisierten Web-Recherche und Datenextraktion. Koordinierung von Multi-Agenten-Pipelines zur Echtzeit-Filterung und Strukturierung komplexer Webdaten.",
          metrics: [
            { value: "MULTI-AGENT", label: "Orchestrierung" },
            { value: "24/7", label: "Data Mining" },
            { value: "PYTHON / API", label: "Core Stack" },
          ],
          terminalHeader: "AGENTIC WORKFLOW // PIPELINE MONITOR",
          terminalRows: [
            { left: "AGENT_01 [CRAWL]", right: "Autonomous Web Discovery", green: true },
            { left: "AGENT_02 [PARSE]", right: "LLM Semantic Filtering & Structuring" },
            { left: "AGENT_03 [SYNC]", right: "REST API & Database Dispatch", highlight: true },
            { left: "WORKFLOW STATE", right: "PROMPT-OPTIMIZED / ZERO MANUAL OPS" },
          ],
        },
        {
          id: "enterprise-arch",
          badge: "SYSTEMARCHITEKTUR & KI-INTEGRATION // 2023–2025",
          title: "Enterprise IT-Architektur & Generative KI-APIs",
          subtitle: "Progress LLC & Freiberufliche KI-Entwicklung",
          description:
            "Technische Leitung und Planung der IT-Infrastruktur als Leitender Systemarchitekt (Progress LLC) kombiniert mit der Entwicklung maßgeschneiderter KI-Schnittstellen (APIs) und Rapid-Prototypen zur Effizienzsteigerung bestehender Unternehmensprozesse.",
          metrics: [
            { value: "DOCKER", label: "Infrastruktur" },
            { value: "SECURITY", label: "Datenintegrität" },
            { value: "UI / 3D", label: "Figma · Blender · CAD" },
          ],
          terminalHeader: "SYSTEM ARCHITECTURE // INFRASTRUCTURE LOG",
          terminalRows: [
            { left: "CORE ARCHITECTURE", right: "High-Availability IT Design", green: true },
            { left: "AI INTEGRATION", right: "Custom LLM APIs & Rapid Prototypes", highlight: true },
            { left: "SECURITY & DATA", right: "Live Monitoring & Integrity Checks" },
            { left: "DESIGN & 3D PIPELINE", right: "Figma · Blender · AutoCAD · ArchiCAD" },
          ],
        },
      ],
    },
    solution: {
      sectionTag: "03 // DIE LÖSUNG — MEIN ANSATZ",
      titlePlain: "ARCHITEKTUR, KI & UMSETZUNG",
      titleSerif: "aus einer Hand",
      titlePixel: "[001–012]",
      steps: [
        { num: "001", text: "Ich entwickle komplette Web- und Krypto-Plattformen (wie Arbfeld) eigenständig von Null bis zum Live-Release.", tag: "FULL-STACK" },
        { num: "002", text: "Ich entwerfe und steuere autonome KI-Agenten und Bot-Systeme für automatisierte Web-Recherche und Data Mining.", tag: "KI-AGENTEN" },
        { num: "003", text: "Ich koordiniere Multi-Agenten-Systeme zur Analyse, Filterung und Strukturierung von Echtzeit-Webdaten.", tag: "MULTI-AGENT" },
        { num: "004", text: "Ich optimiere Agentic Workflows, Prompt-Engineering und komplexe API-Anbindungen zur Prozessautomatisierung.", tag: "AUTOMATION" },
        { num: "005", text: "Ich integriere maßgeschneiderte KI-Schnittstellen (APIs) und Modelle nahtlos in bestehende Geschäftsprozesse.", tag: "KI-INTEGRATION" },
        { num: "006", text: "Ich baue Serverless-Edge-Architekturen mit minimaler Latenz und tiefer Echtzeit-Berechnung (Order-Book Depth).", tag: "EDGE / REALTIME" },
        { num: "007", text: "Ich plane und überwache Unternehmens-IT-Infrastrukturen, Systemsicherheit und höchste Datenintegrität.", tag: "ARCHITEKTUR" },
        { num: "008", text: "Ich arbeite souverän mit Python, Docker, Git, VS Code und modernen Web-Technologien.", tag: "TECH STACK" },
        { num: "009", text: "Ich konzipiere und implementiere funktionsfähige Prototypen zur sofortigen Effizienzsteigerung von IT-Systemen.", tag: "PROTOTYPING" },
        { num: "010", text: "Ich gestalte präzise Interfaces, 3D-Modelle und CAD-Pläne mit Figma, Photoshop, Blender, AutoCAD & ArchiCAD.", tag: "DESIGN & 3D" },
        { num: "011", text: "Ich produziere reichweitenstarken Video-Content und Social-Media-Marketing mit Premiere Pro und CapCut.", tag: "MEDIA & GROWTH" },
        { num: "012", text: "Ich verbinde reale Praxiserfahrung in Logistik, Lieferketten und Administration mit moderner KI-Entwicklung.", tag: "OPERATIONS" },
      ],
    },
    cv: {
      sectionTag: "04 // OFFIZIELLER LEBENSLAUF (CV)",
      titlePlain: "BERUFLICHER",
      titleSerif: "Werdegang",
      careerHeading: "BERUFSERFAHRUNG",
      educationHeading: "SCHULISCHE & BERUFLICHE AUSBILDUNG",
      personalHeading: "PERSÖNLICHE DATEN",
      skillsHeading: "EDV- & FACHKENNTNISSE",
      languagesHeading: "SPRACHEN",
      career: [
        {
          period: "Seit 10/2026",
          role: "Gründer & Initiator (Founder)",
          company: "Arbfeld",
          link: "https://arbfeld.github.io/",
          bullets: [
            "Entwicklung und Umsetzung einer voll funktionsfähigen Krypto-Plattform von Grund auf (31 Paare × 15 Börsen, Echtzeit-Orderbuch-Tiefe, Slippage- & Gebühren-Kalkulation).",
          ],
        },
        {
          period: "Seit 04/2025",
          role: "Unabhängige Projektentwicklung, KI Agent Engineer & Automation Specialist",
          company: "Selbstständig & Social Media Influencer",
          bullets: [
            "Design, Erstellung und Steuerung autonomer KI-Agenten und Bot-Systeme zur automatisierten Web-Recherche und Datenextraktion (Data Mining).",
            "Koordinierung von Multi-Agenten-Systemen zur Analyse, Filterung und Strukturierung von Echtzeit-Webdaten.",
            "Optimierung von Agentic Workflows, Prompt-Engineering und API-Anbindungen zur Prozessautomatisierung.",
          ],
        },
        {
          period: "08/2024 – 03/2025",
          role: "Freiberuflicher Entwickler für KI-Lösungen",
          company: "Freelance / Remote",
          bullets: [
            "Entwicklung und Integration maßgeschneiderter KI-Schnittstellen (APIs) und Modelle in bestehende Geschäftsprozesse.",
            "Beratung von Kunden bezüglich der Automatisierung von Arbeitsabläufen durch generative KI-Tools.",
            "Konzeption und Implementierung von Prototypen zur Effizienzsteigerung von IT-Systemen.",
          ],
        },
        {
          period: "11/2023 – 06/2024",
          role: "Leitender Systemarchitekt",
          company: "Progress LLC, Rozivka / Ukraine",
          bullets: [
            "Planung, Konzeption und Auslegung der IT-Infrastruktur sowie der Systemarchitektur des Unternehmens.",
            "Technische Leitung bei der Einführung neuer Softwarelösungen und Optimierung bestehender Systeme.",
            "Überwachung der Systemsicherheit, Datenintegrität und Fehlerbehebung im laufenden Betrieb.",
          ],
        },
        {
          period: "06/2023 – 10/2023",
          role: "Logistiker",
          company: "Progress LLC, Rozivka / Ukraine",
          bullets: [
            "Koordination, Planung und Überwachung von Warenflüssen und Lieferketten.",
            "Optimierung der Lagerhaltung, Bestandsverwaltung und Transportrouten.",
            "Kommunikation mit Lieferanten, Dienstleistern und Erstellung von Begleitdokumenten.",
          ],
        },
        {
          period: "09/2022 – 05/2023",
          role: "Sekretär",
          company: "Progress LLC, Rozivka / Ukraine",
          bullets: [
            "Verwaltung der Korrespondenz, Dokumentenverarbeitung und Pflege der Unternehmensdatenbanken.",
            "Organisation von Terminen, Meetings und Unterstützung der Geschäftsführung im Tagesgeschäft.",
            "Empfang von Besuchern sowie professionelle Abwicklung des Telefon- und E-Mail-Verkehrs.",
          ],
        },
      ],
      education: [
        {
          period: "09/2021 – 02/2022",
          role: "Studium: Architekturgestaltung (2 Studienjahre)",
          company: "Bautechnisches Fachkolleg Mariupol, Ukraine",
          bullets: ["Ohne Abschluss aufgrund des Kriegsausbruchs."],
        },
        {
          period: "09/2010 – 06/2021",
          role: "Allgemeinbildende Schule (11 Klassen)",
          company: "Rozivka / Ukraine",
          bullets: ["Abschluss: Mittlerer Abschluss."],
        },
      ],
      personal: [
        { label: "Name", value: "Serhii Rohovskyi" },
        { label: "Geburtsdaten", value: "23.02.2004 — Mariupol / Ukraine" },
        { label: "Adresse", value: "Fränkinger Straße 13, 85258 Weichs" },
        { label: "Familienstand", value: "Ledig" },
        { label: "Staatsangehörigkeit", value: "Ukrainisch" },
        { label: "Mobil", value: "0176 / 31 64 07 79", href: "tel:+4917631640779" },
        { label: "E-Mail", value: "serhiirohovskyi444@gmail.com", href: "mailto:serhiirohovskyi444@gmail.com" },
      ],
      skillGroups: [
        { category: "Entwicklung & KI-Tools", items: ["Python", "Docker", "Git", "VS Code", "API-Integration", "Prompt Engineering", "Agentic Workflows", "Multi-Agent Systems"] },
        { category: "Design & 3D-Modellierung", items: ["Figma", "Adobe Photoshop", "Blender", "AutoCAD", "ArchiCAD"] },
        { category: "Videobearbeitung & Media", items: ["Adobe Premiere Pro", "CapCut", "Content Creation", "Social Media Marketing"] },
        { category: "Office & IT-Infrastruktur", items: ["Systemarchitektur", "Datenextraktion (Data Mining)", "MS Word / Excel / PowerPoint"] },
      ],
      languages: [
        { name: "Ukrainisch", level: "Muttersprache" },
        { name: "Russisch", level: "Fließend" },
        { name: "Deutsch", level: "A2" },
        { name: "Englisch", level: "A2" },
      ],
    },
    whyMe: {
      sectionTag: "05 // WARUM ICH & ZUSAMMENARBEIT",
      titlePlain: "ECHTE SYSTEME STATT",
      titleSerif: "leerer Versprechen",
      stats: [
        { number: "31×15", label: "Handelspaare × Krypto-Börsen live analysiert auf meiner Plattform Arbfeld." },
        { number: "100%", label: "Solo-Umsetzung von der Systemarchitektur über KI-Agenten bis zum UI." },
        { number: "4+ J.", label: "Erfahrung in IT-Systemarchitektur, KI-Lösungen, Logistik & Operations." },
        { number: "24/7", label: "Autonome KI-Workflows für Echtzeit-Datenextraktion & Prozessautomatisierung." },
      ],
      formatsTitle: "MÖGLICHE FORMATE DER ZUSAMMENARBEIT",
      formats: [
        { tag: "OPTION 01 // VOLLZEIT / TEILZEIT", title: "Festanstellung im Raum München / Dachau oder Remote", desc: "Als KI Agent Engineer, Automation Specialist, Systemarchitekt oder Software Developer mit hoher Eigeninitiative." },
        { tag: "OPTION 02 // PROJEKTBASIERT", title: "Entwicklung von KI-Agenten & Web-Plattformen", desc: "Konzeption und schlüsselfertige Umsetzung maßgeschneiderter Bots, Data-Mining-Pipelines und hochperformanter Web-Apps." },
        { tag: "OPTION 03 // PROTOTYPING & BERATUNG", title: "KI-Integration in bestehende Prozesse", desc: "Schnelle Implementierung von LLM-APIs und Automatisierungs-Workflows zur messbaren Zeiteinsparung in Ihrem Team." },
      ],
    },
    footer: {
      sectionTag: "06 // STARTEN WIR",
      titleLine1: "BEREIT FÜR",
      titleSerif: "echte",
      titlePixel: "[ERGEBNISSE]?",
      ctaPrimary: "DIREKT KONTAKTIEREN",
      ctaSecondary: "ARBFELD ANSEHEN ↗",
    },
    drawer: {
      header: "KONTAKT // SERHII ROHOVSKYI",
      closeEsc: "[ESC] SCHLIESSEN",
      title: "Lassen Sie uns sprechen.",
      subtitle: "Direkt erreichbar für Vorstellungsgespräche, technische Demos von Arbfeld oder KI-Automatisierungsprojekte.",
      emailLabel: "E-MAIL ADRESSE",
      phoneLabel: "MOBIL / WHATSAPP",
      projectLabel: "LIVE-PROJEKT",
      addressLabel: "STANDORT IN DEUTSCHLAND",
      copySuccess: "KOPIERT!",
    },
  },

  en: {
    meta: {
      status: "AVAILABLE IN GERMANY (85258 WEICHS / MUNICH AREA)",
      ctaButton: "CONTACT",
      locationShort: "WEICHS / MUNICH, DE",
    },
    nav: {
      intro: "Intro",
      problem: "Pillars",
      showcase: "Arbfeld & 3D",
      solution: "The Solution",
      cv: "Resume / CV",
      why: "Why Me",
      contact: "Get Started",
    },
    hero: {
      badge: "SOLO FOUNDER & ARCHITECT — ARBFELD",
      roles: "AI AGENT ENGINEER · AUTOMATION SPECIALIST · SYSTEM ARCHITECT",
      name: "SERHII ROHOVSKYI",
      subName: "SERGEY ROGOVSKY // FEB 23, 2004",
      line1Prefix: "AUTONOMOUS",
      line1Pixel: "[AI AGENTS]",
      line2Serif: "System Architecture",
      line2Suffix: "&",
      line3: "HIGH-SPEED PLATFORMS.",
      lead: "I'm Serhii Rohovskyi — AI Engineer, System Architect, and Founder of Arbfeld based in Weichs (Munich area, Germany). I transform complex real-time data streams, multi-agent workflows, and enterprise IT infrastructure into production-ready software built from scratch.",
      primaryCta: "LAUNCH ARBFELD LIVE",
      secondaryCta: "SCHEDULE A CALL",
      dossierTitle: "PROFILE // DOSSIER",
      profileMeta: [
        { label: "NAME", value: "Serhii Rohovskyi (Sergey Rogovsky)" },
        { label: "ROLE", value: "AI Agent Engineer · System Architect", highlight: true },
        { label: "LOCATION", value: "85258 Weichs / Munich area, Germany" },
        { label: "ORIGIN", value: "Mariupol, Ukraine (Born Feb 23, 2004)" },
        { label: "FLAGSHIP", value: "Arbfeld (arbfeld.github.io)", highlight: true },
        { label: "STATUS", value: "Available for Hire & Contract", highlight: true },
      ],
      skillsTitle: "CORE CAPABILITIES & STACK",
      coreSkillChips: [
        "Autonomous AI Agents",
        "Multi-Agent Pipelines",
        "Data Mining & Scraping",
        "Python / LLM APIs",
        "Docker & Edge Computing",
        "Order-Book Depth L2",
        "Next.js / TypeScript",
        "System Architecture",
        "Figma & Blender 3D",
        "Prompt Engineering",
      ],
      journeyTitle: "MY JOURNEY // FROM BLUEPRINTS TO PRODUCTION",
      journeyBadge: "4 MILESTONES",
      journeyMilestones: [
        {
          year: "2021 — 2022",
          role: "Architectural Design & Statics",
          focus: "Mariupol Building College, Ukraine",
          desc: "Built the foundation for structural systems, blueprint modeling, and spatial CAD precision. Interrupted by the war.",
          tag: "ARCHITECTURE",
        },
        {
          year: "2022 — 2024",
          role: "Lead System Architect & Logistics",
          focus: "Progress LLC, Rozivka",
          desc: "Designed corporate IT infrastructure, maintained system security & data integrity, and orchestrated real-world supply chain databases.",
          tag: "INFRASTRUCTURE",
        },
        {
          year: "2024 — 2025",
          role: "AI Agent Engineer & Freelance Dev",
          focus: "Remote / Independent",
          desc: "Engineered autonomous research bots, LLM data mining pipelines, and production API automations for international clients.",
          tag: "AI AUTOMATION",
        },
        {
          year: "Since 2026",
          role: "Solo Founder & Architect of Arbfeld",
          focus: "Weichs / Munich, Germany",
          desc: "Built a complete real-time crypto arbitrage engine from scratch: 31 pairs × 15 exchanges with full L2 order-book depth calculation.",
          tag: "SOLO FOUNDER",
        },
      ],
    },
    problem: {
      sectionTag: "01 // ENGINEERING PILLARS & SYSTEMS",
      scrollStatement:
        "I don't build superficial chat prompts. I engineer autonomous AI agents, high-speed arbitrage, and resilient production systems.",
      highlightWordsCount: 3,
      subhead: "CORE PILLARS OF MY ENGINEERING WORK",
      cards: [
        {
          id: "001",
          tag: "AUTONOMOUS AI AGENTS",
          title: "Multi-Agent Pipelines for 24/7 Web Intelligence & Data Mining",
          desc: "Orchestrating autonomous bot clusters that continuously discover, scrape, and semantically filter live web data using LLMs, syncing structured payloads to production APIs.",
          tiltAngle: -1.8,
          diagramType: "nodes",
        },
        {
          id: "002",
          tag: "REAL-TIME ENGINE // ARBFELD",
          title: "Full L2 Order-Book Depth Across 31 Pairs & 15 Exchanges",
          desc: "High-frequency algorithmic calculation of real execution prices in crypto arbitrage (Binance, Kraken, Bybit, OKX, etc.) accounting for cumulative depth, dynamic slippage, and exchange fees.",
          tiltAngle: 1.5,
          diagramType: "latency",
        },
        {
          id: "003",
          tag: "ENTERPRISE ARCHITECTURE",
          title: "High-Availability IT Infrastructure, Docker & API Resiliency",
          desc: "Hands-on experience as Lead System Architect: architecting fault-tolerant corporate IT environments, monitoring live data integrity, and integrating custom generative AI endpoints.",
          tiltAngle: 1.2,
          diagramType: "wave",
        },
        {
          id: "004",
          tag: "FULL-STACK & 3D/CAD",
          title: "End-to-End Delivery: From Structural CAD to Production Next.js",
          desc: "Fusing rigorous architectural design thinking (CAD, statics, Blender 3D) with cutting-edge web software engineering (TypeScript, Tailwind, GSAP) to ship working systems fast.",
          tiltAngle: -1.4,
          diagramType: "growth",
        },
      ],
    },
    showcase: {
      sectionTag: "02 // 3D PROJECT SEQUENCE",
      titlePlain: "SYSTEMS IN",
      titleSerif: "Production",
      subtitle: "Scroll through the Z-space tunnel to inspect my flagship platforms and architectures.",
      projects: [
        {
          id: "arbfeld",
          badge: "FLAGSHIP PLATFORM // SOLO FOUNDER (SINCE 10/2026)",
          title: "ARBFELD — Cross-Exchange Crypto Arbitrage",
          subtitle: "arbfeld.github.io",
          description:
            "A complete spot crypto arbitrage & liquidity intelligence platform built solo from scratch. Scans 31 trading pairs across 15 major exchanges (Binance, Bybit, OKX, Kraken, Coinbase, etc.) and walks full order-book depth to compute real execution prices including volume, slippage, fees, and optimal trade size (A↔B).",
          link: "https://arbfeld.github.io/",
          linkLabel: "OPEN ARBFELD LIVE ↗",
          featured: true,
          metrics: [
            { value: "31 × 15", label: "Pairs × Exchanges" },
            { value: "FULL L2", label: "Order-Book Depth" },
            { value: "EDGE", label: "Serverless Real-Time" },
          ],
          terminalHeader: "ARBFELD // REAL-TIME ORDER-BOOK ENGINE",
          terminalRows: [
            { left: "SCAN MATRIX", right: "31 PAIRS × 15 EXCHANGES", green: true },
            { left: "EXECUTION MATH", right: "VOLUME + SLIPPAGE + FEES" },
            { left: "DIRECTIONAL SPREAD", right: "BIDIRECTIONAL A ↔ B", highlight: true },
            { left: "LATENCY ARCHITECTURE", right: "SERVERLESS EDGE / PUBLIC APIS" },
            { left: "TERMINAL ANALYTICS", right: "TRADINGVIEW CHARTS · 4 LANGS · CSV" },
          ],
        },
        {
          id: "ki-agents",
          badge: "AUTONOMOUS SYSTEMS // SINCE 04/2025",
          title: "Multi-Agent Data Mining & Web Intelligence",
          subtitle: "AI Agent Engineer & Automation Specialist",
          description:
            "Design, creation, and orchestration of autonomous AI agents and bot systems for automated web research and data extraction. Coordinating multi-agent pipelines to analyze, filter, and structure real-time web data.",
          metrics: [
            { value: "MULTI-AGENT", label: "Orchestration" },
            { value: "24/7", label: "Data Mining" },
            { value: "PYTHON / API", label: "Core Stack" },
          ],
          terminalHeader: "AGENTIC WORKFLOW // PIPELINE MONITOR",
          terminalRows: [
            { left: "AGENT_01 [CRAWL]", right: "Autonomous Web Discovery", green: true },
            { left: "AGENT_02 [PARSE]", right: "LLM Semantic Filtering & Structuring" },
            { left: "AGENT_03 [SYNC]", right: "REST API & Database Dispatch", highlight: true },
            { left: "WORKFLOW STATE", right: "PROMPT-OPTIMIZED / ZERO MANUAL OPS" },
          ],
        },
        {
          id: "enterprise-arch",
          badge: "SYSTEM ARCHITECTURE & AI APIS // 2023–2025",
          title: "Enterprise IT Architecture & Custom Generative AI",
          subtitle: "Progress LLC & Freelance AI Solutions",
          description:
            "Technical leadership and IT infrastructure design as Lead System Architect (Progress LLC), combined with custom AI API integrations and rapid prototyping to boost enterprise efficiency.",
          metrics: [
            { value: "DOCKER", label: "Infrastructure" },
            { value: "SECURITY", label: "Data Integrity" },
            { value: "UI / 3D", label: "Figma · Blender · CAD" },
          ],
          terminalHeader: "SYSTEM ARCHITECTURE // INFRASTRUCTURE LOG",
          terminalRows: [
            { left: "CORE ARCHITECTURE", right: "High-Availability IT Design", green: true },
            { left: "AI INTEGRATION", right: "Custom LLM APIs & Rapid Prototypes", highlight: true },
            { left: "SECURITY & DATA", right: "Live Monitoring & Integrity Checks" },
            { left: "DESIGN & 3D PIPELINE", right: "Figma · Blender · AutoCAD · ArchiCAD" },
          ],
        },
      ],
    },
    solution: {
      sectionTag: "03 // THE SOLUTION — HOW I DELIVER",
      titlePlain: "ARCHITECTURE, AI & EXECUTION",
      titleSerif: "end-to-end",
      titlePixel: "[001–012]",
      steps: [
        { num: "001", text: "I build complete web and crypto platforms (like Arbfeld) solo from zero to live production.", tag: "FULL-STACK" },
        { num: "002", text: "I design and control autonomous AI agents and bot systems for automated web research and data mining.", tag: "AI AGENTS" },
        { num: "003", text: "I coordinate multi-agent systems to analyze, filter, and structure real-time web data streams.", tag: "MULTI-AGENT" },
        { num: "004", text: "I optimize Agentic Workflows, Prompt Engineering pipelines, and API integrations for process automation.", tag: "AUTOMATION" },
        { num: "005", text: "I integrate custom AI APIs and generative models seamlessly into existing business workflows.", tag: "AI INTEGRATION" },
        { num: "006", text: "I engineer Serverless Edge architectures with ultra-low latency and full order-book depth math.", tag: "EDGE / REALTIME" },
        { num: "007", text: "I plan, lead, and monitor enterprise IT infrastructure, system security, and data integrity.", tag: "ARCHITECTURE" },
        { num: "008", text: "I build with Python, Docker, Git, VS Code, and modern web technologies.", tag: "TECH STACK" },
        { num: "009", text: "I conceive and implement rapid functional prototypes to immediately boost IT efficiency.", tag: "PROTOTYPING" },
        { num: "010", text: "I craft clean UI/UX, 3D models, and CAD plans using Figma, Photoshop, Blender, AutoCAD & ArchiCAD.", tag: "DESIGN & 3D" },
        { num: "011", text: "I produce high-engagement video content and social media growth campaigns with Premiere Pro & CapCut.", tag: "MEDIA & GROWTH" },
        { num: "012", text: "I bridge real-world operational experience (supply chains, logistics, administration) with AI engineering.", tag: "OPERATIONS" },
      ],
    },
    cv: {
      sectionTag: "04 // CURRICULUM VITAE (RESUME)",
      titlePlain: "CAREER",
      titleSerif: "Timeline",
      careerHeading: "PROFESSIONAL EXPERIENCE",
      educationHeading: "EDUCATION",
      personalHeading: "PERSONAL DETAILS",
      skillsHeading: "TECHNICAL & AI SKILLS",
      languagesHeading: "LANGUAGES",
      career: [
        {
          period: "Since 10/2026",
          role: "Founder & Creator",
          company: "Arbfeld",
          link: "https://arbfeld.github.io/",
          bullets: [
            "Designed and built a fully functional cross-exchange crypto arbitrage platform from scratch (31 pairs × 15 exchanges, full order-book depth, slippage & fee calculation).",
          ],
        },
        {
          period: "Since 04/2025",
          role: "Independent Project Developer, AI Agent Engineer & Automation Specialist",
          company: "Self-Employed & Social Media Influencer",
          bullets: [
            "Design, creation, and orchestration of autonomous AI agents and bot systems for automated web research and data extraction (Data Mining).",
            "Coordination of multi-agent systems for real-time web data analysis, filtering, and structuring.",
            "Optimization of Agentic Workflows, Prompt Engineering, and API integrations for process automation.",
          ],
        },
        {
          period: "08/2024 – 03/2025",
          role: "Freelance AI Solutions Developer",
          company: "Freelance / Remote",
          bullets: [
            "Development and integration of custom AI interfaces (APIs) and models into existing business processes.",
            "Consulting clients on workflow automation using generative AI tools.",
            "Conception and implementation of prototypes to increase IT system efficiency.",
          ],
        },
        {
          period: "11/2023 – 06/2024",
          role: "Lead System Architect (Leitender Systemarchitekt)",
          company: "Progress LLC, Rozivka / Ukraine",
          bullets: [
            "Planning, conception, and design of company IT infrastructure and system architecture.",
            "Technical leadership in introducing new software solutions and optimizing existing systems.",
            "Monitoring system security, data integrity, and troubleshooting in live operations.",
          ],
        },
        {
          period: "06/2023 – 10/2023",
          role: "Logistics Specialist",
          company: "Progress LLC, Rozivka / Ukraine",
          bullets: [
            "Coordination, planning, and monitoring of goods flows and supply chains.",
            "Optimization of warehousing, inventory management, and transport routes.",
            "Communication with suppliers, service providers, and preparation of shipping documentation.",
          ],
        },
        {
          period: "09/2022 – 05/2023",
          role: "Secretary & Database Administrator",
          company: "Progress LLC, Rozivka / Ukraine",
          bullets: [
            "Management of correspondence, document processing, and maintenance of corporate databases.",
            "Organization of appointments, meetings, and operational support for executive management.",
            "Reception of visitors and professional handling of phone and email communications.",
          ],
        },
      ],
      education: [
        {
          period: "09/2021 – 02/2022",
          role: "Studies: Architectural Design (2 Academic Years)",
          company: "Mariupol College of Construction & Architecture, Ukraine",
          bullets: ["Interrupted without degree due to the outbreak of war."],
        },
        {
          period: "09/2010 – 06/2021",
          role: "Secondary General School (11 Grades)",
          company: "Rozivka / Ukraine",
          bullets: ["Degree: Secondary School Certificate (Mittlerer Abschluss)."],
        },
      ],
      personal: [
        { label: "Name", value: "Serhii Rohovskyi" },
        { label: "Date of Birth", value: "23.02.2004 — Mariupol / Ukraine" },
        { label: "Address", value: "Fränkinger Straße 13, 85258 Weichs, Germany" },
        { label: "Marital Status", value: "Single" },
        { label: "Nationality", value: "Ukrainian" },
        { label: "Mobile", value: "+49 176 31640779", href: "tel:+4917631640779" },
        { label: "Email", value: "serhiirohovskyi444@gmail.com", href: "mailto:serhiirohovskyi444@gmail.com" },
      ],
      skillGroups: [
        { category: "Development & AI Tools", items: ["Python", "Docker", "Git", "VS Code", "API Integration", "Prompt Engineering", "Agentic Workflows", "Multi-Agent Systems"] },
        { category: "Design & 3D Modeling", items: ["Figma", "Adobe Photoshop", "Blender", "AutoCAD", "ArchiCAD"] },
        { category: "Video & Media Production", items: ["Adobe Premiere Pro", "CapCut", "Content Creation", "Social Media Marketing"] },
        { category: "Office & IT Infrastructure", items: ["System Architecture", "Data Mining / Extraction", "MS Word / Excel / PowerPoint"] },
      ],
      languages: [
        { name: "Ukrainian", level: "Native" },
        { name: "Russian", level: "Fluent" },
        { name: "German", level: "A2" },
        { name: "English", level: "A2" },
      ],
    },
    whyMe: {
      sectionTag: "05 // WHY ME & COLLABORATION",
      titlePlain: "WORKING SYSTEMS OVER",
      titleSerif: "empty hype",
      stats: [
        { number: "31×15", label: "Trading pairs × crypto exchanges analyzed live on my platform Arbfeld." },
        { number: "100%", label: "Solo end-to-end execution from backend architecture & AI agents to UI." },
        { number: "4+ YRS", label: "Hands-on experience across IT architecture, AI solutions, logistics & ops." },
        { number: "24/7", label: "Autonomous multi-agent workflows for real-time data extraction & automation." },
      ],
      formatsTitle: "COLLABORATION FORMATS",
      formats: [
        { tag: "OPTION 01 // FULL-TIME / PART-TIME", title: "In-House Role in Munich / Dachau Area or Remote", desc: "Joining your team as an AI Agent Engineer, Automation Specialist, System Architect, or Full-Stack Builder." },
        { tag: "OPTION 02 // PROJECT-BASED", title: "Custom AI Agents & High-Speed Web Platforms", desc: "End-to-end architecture and delivery of autonomous bots, data-mining engines, and real-time dashboards." },
        { tag: "OPTION 03 // PROTOTYPING & CONSULTING", title: "Workflow Automation & LLM API Integration", desc: "Rapid functional prototypes and API pipelines that eliminate manual operational bottlenecks." },
      ],
    },
    footer: {
      sectionTag: "06 // GET STARTED",
      titleLine1: "READY FOR",
      titleSerif: "real",
      titlePixel: "[RESULTS]?",
      ctaPrimary: "CONTACT ME NOW",
      ctaSecondary: "EXPLORE ARBFELD ↗",
    },
    drawer: {
      header: "CONTACT // SERHII ROHOVSKYI",
      closeEsc: "[ESC] CLOSE",
      title: "Let's talk.",
      subtitle: "Reach out directly for job interviews, live technical walkthroughs of Arbfeld, or AI automation projects.",
      emailLabel: "EMAIL ADDRESS",
      phoneLabel: "MOBILE / WHATSAPP",
      projectLabel: "FLAGSHIP PROJECT",
      addressLabel: "LOCATION IN GERMANY",
      copySuccess: "COPIED!",
    },
  },

  ru: {
    meta: {
      status: "ДОСТУПЕН В ГЕРМАНИИ (85258 WEICHS / МЮНХЕН)",
      ctaButton: "КОНТАКТЫ",
      locationShort: "WEICHS / МЮНХЕН, DE",
    },
    nav: {
      intro: "Интро",
      problem: "Системы",
      showcase: "Arbfeld и 3D",
      solution: "Решение",
      cv: "Резюме / CV",
      why: "Почему Я",
      contact: "Старт",
    },
    hero: {
      badge: "ОСНОВАТЕЛЬ И АРХИТЕКТОР — ARBFELD",
      roles: "AI AGENT ENGINEER · СПЕЦИАЛИСТ ПО АВТОМАТИЗАЦИИ · СИСТЕМНЫЙ АРХИТЕКТОР",
      name: "СЕРГЕЙ РОГОВСКИЙ",
      subName: "SERHII ROHOVSKYI // 23.02.2004",
      line1Prefix: "АВТОНОМНЫЕ",
      line1Pixel: "[ИИ-АГЕНТЫ]",
      line2Serif: "Системная Архитектура",
      line2Suffix: "и",
      line3: "СКОРОСТНЫЕ ПЛАТФОРМЫ.",
      lead: "Я Сергей Роговский (Serhii Rohovskyi) — разработчик ИИ-систем, системный архитектор и соло-основатель платформы Arbfeld (Германия, Weichs / пригород Мюнхена). Превращаю потоки данных реального времени, мультиагентные пайплайны и ИТ-инфраструктуру в работающие продукты с нуля.",
      primaryCta: "ОТКРЫТЬ ARBFELD LIVE",
      secondaryCta: "НАЗНАЧИТЬ ЗВОНОК",
      dossierTitle: "ПРОФИЛЬ // ГЛАВНОЕ ОБО МНЕ",
      profileMeta: [
        { label: "ИМЯ", value: "Сергей Роговский (Serhii Rohovskyi)" },
        { label: "СПЕЦИАЛИЗАЦИЯ", value: "AI Agent Engineer · Системный архитектор", highlight: true },
        { label: "ЛОКАЦИЯ", value: "85258 Weichs / Мюнхен, Германия" },
        { label: "ПРОИСХОЖДЕНИЕ", value: "Мариуполь, Украина (род. 23.02.2004)" },
        { label: "ФЛАГМАН", value: "Arbfeld (arbfeld.github.io)", highlight: true },
        { label: "СТАТУС", value: "Открыт для предложений в штат и контрактов", highlight: true },
      ],
      skillsTitle: "КЛЮЧЕВЫЕ НАВЫКИ И СТЕК",
      coreSkillChips: [
        "Автономные ИИ-агенты",
        "Мультиагентные пайплайны",
        "Data Mining и парсинг данных",
        "Python / LLM API",
        "Docker и Edge-архитектура",
        "Глубина биржевого стакана L2",
        "Next.js / TypeScript",
        "Системная архитектура",
        "Figma и Blender 3D",
        "Prompt Engineering",
      ],
      journeyTitle: "МОЙ ПУТЬ // ОТ ЧЕРТЕЖЕЙ ДО РАБОТАЮЩИХ СИСТЕМ",
      journeyBadge: "4 ЭТАПА",
      journeyMilestones: [
        {
          year: "2021 — 2022",
          role: "Архитектурное проектирование и статика",
          focus: "Строительный колледж, Мариуполь",
          desc: "Фундамент структурного мышления, пространственного проектирования и чертежей CAD. Прервано из-за войны.",
          tag: "АРХИТЕКТУРА",
        },
        {
          year: "2022 — 2024",
          role: "Главный системный архитектор и логист",
          focus: "Progress LLC, Розовка",
          desc: "Проектирование и сопровождение корпоративной ИТ-инфраструктуры, защита данных, координация логистических цепочек.",
          tag: "ИНФРАСТРУКТУРА",
        },
        {
          year: "2024 — 2025",
          role: "KI Agent Engineer и фриланс-разработчик",
          focus: "Удаленно / Собственные проекты",
          desc: "Создание автономных ботов, мультиагентных систем сбора данных и интеграция моделей генеративного ИИ в бизнес-процессы.",
          tag: "ИИ-АВТОМАТИЗАЦИЯ",
        },
        {
          year: "С 2026",
          role: "Соло-основатель и архитектор Arbfeld",
          focus: "Weichs / Мюнхен, Германия",
          desc: "Разработка высокоскоростной платформы криптоарбитража с нуля: 31 пара × 15 бирж, расчет полной глубины стакана в реалтайме.",
          tag: "SOLO FOUNDER",
        },
      ],
    },
    problem: {
      sectionTag: "01 // ИНЖЕНЕРНЫЕ СИСТЕМЫ И ПРАКТИКА",
      scrollStatement:
        "Я создаю не просто чат-промпты. Я проектирую автономных ИИ-агентов, скоростной криптоарбитраж и надежную системную архитектуру.",
      highlightWordsCount: 3,
      subhead: "КЛЮЧЕВЫЕ СТОЛПЫ МОЕЙ ИНЖЕНЕРНОЙ РАБОТЫ",
      cards: [
        {
          id: "001",
          tag: "АВТОНОМНЫЕ ИИ-АГЕНТЫ",
          title: "Мультиагентные пайплайны для 24/7 веб-разведки и парсинга",
          desc: "Разработка и оркестрация автономных агентных кластеров: сбор неструктурированных данных с сайтов в реальном времени, семантическая фильтрация через LLM и прямая выгрузка в БД по API.",
          tiltAngle: -1.8,
          diagramType: "nodes",
        },
        {
          id: "002",
          tag: "РЕАЛТАЙМ-ДВИЖОК // ARBFELD",
          title: "Полная глубина стакана L2 по 31 паре и 15 биржам",
          desc: "Математический расчет реальной цены исполнения сделки в криптоарбитраже (Binance, Kraken, Bybit, OKX и др.) с учетом кумулятивного объема, динамического проскальзывания и комиссий бирж.",
          tiltAngle: 1.5,
          diagramType: "latency",
        },
        {
          id: "003",
          tag: "АРХИТЕКТУРА ПРЕДПРИЯТИЯ",
          title: "Отказоустойчивая ИТ-инфраструктура, Docker и безопасность",
          desc: "Практический опыт на позиции главного системного архитектора: проектирование серверов, контроль безопасности и целостности данных, бесшовная интеграция генеративных ИИ-интерфейсов.",
          tiltAngle: 1.2,
          diagramType: "wave",
        },
        {
          id: "004",
          tag: "FULL-STACK И 3D/CAD",
          title: "Сквозная реализация: от чертежей и статики до Next.js UI",
          desc: "Соединение инженерного архитектурного мышления (CAD, Blender 3D, конструктив) с современной веб-разработкой (TypeScript, Tailwind, GSAP). Быстрые прототипы, сразу готовые к бою.",
          tiltAngle: -1.4,
          diagramType: "growth",
        },
      ],
    },
    showcase: {
      sectionTag: "02 // 3D-ГАЛЕРЕЯ ПРОЕКТОВ",
      titlePlain: "СИСТЕМЫ В",
      titleSerif: "Продакшене",
      subtitle: "Листайте вниз сквозь 3D-туннель моих ключевых платформ и архитектурных решений.",
      projects: [
        {
          id: "arbfeld",
          badge: "ФЛАГМАНСКАЯ ПЛАТФОРМА // SOLO FOUNDER (С 10/2026)",
          title: "ARBFELD — Межбиржевой Криптоарбитраж",
          subtitle: "arbfeld.github.io",
          description:
            "Полнофункциональная криптоплатформа, разработанная мной в одиночку с нуля. Сканирует 31 торговую пару на 15 биржах (Binance, Bybit, OKX, Kraken, Coinbase и др.), проходит всю глубину стаканов (Order-Book Depth) и считает реальную цену исполнения с учетом объема, проскальзывания, комиссий и оптимального объема сделки (A↔B).",
          link: "https://arbfeld.github.io/",
          linkLabel: "ЗАПУСТИТЬ ARBFELD LIVE ↗",
          featured: true,
          metrics: [
            { value: "31 × 15", label: "Пар × Бирж" },
            { value: "FULL L2", label: "Глубина стакана" },
            { value: "EDGE", label: "Serverless Реалтайм" },
          ],
          terminalHeader: "ARBFELD // REAL-TIME ORDER-BOOK ENGINE",
          terminalRows: [
            { left: "SCAN MATRIX", right: "31 PAIRS × 15 EXCHANGES", green: true },
            { left: "EXECUTION MATH", right: "VOLUME + SLIPPAGE + FEES" },
            { left: "DIRECTIONAL SPREAD", right: "BIDIRECTIONAL A ↔ B", highlight: true },
            { left: "LATENCY ARCHITECTURE", right: "SERVERLESS EDGE / PUBLIC APIS" },
            { left: "TERMINAL ANALYTICS", right: "TRADINGVIEW CHARTS · 4 LANGS · CSV" },
          ],
        },
        {
          id: "ki-agents",
          badge: "АВТОНОМНЫЕ СИСТЕМЫ // С 04/2025",
          title: "Мультиагентный Data Mining и Веб-Интеллект",
          subtitle: "KI Agent Engineer & Automation Specialist",
          description:
            "Проектирование, создание и управление автономными ИИ-агентами и бот-системами для автоматического веб-поиска и извлечения данных. Координация мультиагентных систем для фильтрации и структурирования данных в реальном времени.",
          metrics: [
            { value: "MULTI-AGENT", label: "Оркестрация" },
            { value: "24/7", label: "Data Mining" },
            { value: "PYTHON / API", label: "Стек" },
          ],
          terminalHeader: "AGENTIC WORKFLOW // PIPELINE MONITOR",
          terminalRows: [
            { left: "AGENT_01 [CRAWL]", right: "Autonomous Web Discovery", green: true },
            { left: "AGENT_02 [PARSE]", right: "LLM Semantic Filtering & Structuring" },
            { left: "AGENT_03 [SYNC]", right: "REST API & Database Dispatch", highlight: true },
            { left: "WORKFLOW STATE", right: "PROMPT-OPTIMIZED / ZERO MANUAL OPS" },
          ],
        },
        {
          id: "enterprise-arch",
          badge: "СИСТЕМНАЯ АРХИТЕКТУРА И ИИ-API // 2023–2025",
          title: "ИТ-Архитектура Предприятия и Кастомные ИИ-Решения",
          subtitle: "Progress LLC и Фриланс-разработка ИИ",
          description:
            "Техническое руководство и проектирование ИТ-инфраструктуры на позиции главного системного архитектора (Progress LLC) в сочетании с интеграцией кастомных ИИ-API и быстрым прототипированием.",
          metrics: [
            { value: "DOCKER", label: "Инфраструктура" },
            { value: "SECURITY", label: "Целостность данных" },
            { value: "UI / 3D", label: "Figma · Blender · CAD" },
          ],
          terminalHeader: "SYSTEM ARCHITECTURE // INFRASTRUCTURE LOG",
          terminalRows: [
            { left: "CORE ARCHITECTURE", right: "High-Availability IT Design", green: true },
            { left: "AI INTEGRATION", right: "Custom LLM APIs & Rapid Prototypes", highlight: true },
            { left: "SECURITY & DATA", right: "Live Monitoring & Integrity Checks" },
            { left: "DESIGN & 3D PIPELINE", right: "Figma · Blender · AutoCAD · ArchiCAD" },
          ],
        },
      ],
    },
    solution: {
      sectionTag: "03 // РЕШЕНИЕ — МОЙ ПОДХОД",
      titlePlain: "АРХИТЕКТУРА, ИИ И РЕАЛИЗАЦИЯ",
      titleSerif: "под ключ",
      titlePixel: "[001–012]",
      steps: [
        { num: "001", text: "Разрабатываю полноценные веб- и криптоплатформы (как Arbfeld) полностью самостоятельно с нуля до продакшена.", tag: "FULL-STACK" },
        { num: "002", text: "Проектирую и управляю автономными ИИ-агентами и ботами для автоматизированного веб-поиска и Data Mining.", tag: "ИИ-АГЕНТЫ" },
        { num: "003", text: "Координирую мультиагентные системы для анализа, фильтрации и структурирования веб-данных в реальном времени.", tag: "MULTI-AGENT" },
        { num: "004", text: "Оптимизирую Agentic Workflows, пайплайны Prompt Engineering и сложные API-связки для автоматизации.", tag: "АВТОМАТИЗАЦИЯ" },
        { num: "005", text: "Интегрирую кастомные ИИ-интерфейсы (API) и генеративные модели в действующие бизнес-процессы.", tag: "ИИ-ИНТЕГРАЦИЯ" },
        { num: "006", text: "Строю Serverless Edge архитектуру с минимальной задержкой и глубоким просчетом биржевых стаканов.", tag: "EDGE / REALTIME" },
        { num: "007", text: "Планирую и контролирую надежную ИТ-инфраструктуру, безопасность систем и целостность данных.", tag: "АРХИТЕКТУРА" },
        { num: "008", text: "Уверенно работаю со стеком Python, Docker, Git, VS Code и современными веб-технологиями.", tag: "СТЕК" },
        { num: "009", text: "Проектирую и внедряю рабочие прототипы (Rapid Prototyping) для быстрого роста эффективности ИТ-систем.", tag: "ПРОТОТИПЫ" },
        { num: "010", text: "Создаю интерфейсы, 3D-модели и чертежи в Figma, Photoshop, Blender, AutoCAD и ArchiCAD.", tag: "ДИЗАЙН И 3D" },
        { num: "011", text: "Произвожу вовлекающий видеоконтент и развиваю соцсети с помощью Premiere Pro и CapCut.", tag: "МЕДИА" },
        { num: "012", text: "Соединяю реальный операционный опыт (логистика, цепочки поставок, базы данных) с современной ИИ-инженерией.", tag: "ОПЕРАЦИИ" },
      ],
    },
    cv: {
      sectionTag: "04 // ОФИЦИАЛЬНОЕ РЕЗЮМЕ (LEBENSLAUF)",
      titlePlain: "КАРЬЕРНЫЙ",
      titleSerif: "Путь",
      careerHeading: "ПРОФЕССИОНАЛЬНЫЙ ОПЫТ",
      educationHeading: "ОБРАЗОВАНИЕ",
      personalHeading: "ЛИЧНЫЕ ДАННЫЕ",
      skillsHeading: "ТЕХНИЧЕСКИЕ И ИИ-НАВЫКИ",
      languagesHeading: "ЯЗЫКИ",
      career: [
        {
          period: "С 10/2026",
          role: "Основатель и инициатор (Founder)",
          company: "Arbfeld",
          link: "https://arbfeld.github.io/",
          bullets: [
            "Проектирование и разработка полнофункциональной кросс-биржевой криптоарбитражной платформы с нуля (31 пара × 15 бирж, полная глубина стакана, расчет проскальзывания и комиссий).",
          ],
        },
        {
          period: "С 04/2025",
          role: "Независимый разработчик проектов, KI Agent Engineer & Automation Specialist",
          company: "Самозанятость и Social Media Influencer",
          bullets: [
            "Проектирование, создание и управление автономными ИИ-агентами и бот-системами для автоматизированного веб-поиска и извлечения данных (Data Mining).",
            "Координация мультиагентных систем для анализа, фильтрации и структурирования веб-данных в реальном времени.",
            "Оптимизация Agentic Workflows, Prompt Engineering и API-интеграций для автоматизации процессов.",
          ],
        },
        {
          period: "08/2024 – 03/2025",
          role: "Фриланс-разработчик ИИ-решений",
          company: "Freelance / Remote",
          bullets: [
            "Разработка и интеграция кастомных ИИ-интерфейсов (API) и моделей в существующие бизнес-процессы.",
            "Консультирование клиентов по автоматизации рабочих процессов с помощью генеративных ИИ-инструментов.",
            "Проектирование и внедрение прототипов для повышения эффективности ИТ-систем.",
          ],
        },
        {
          period: "11/2023 – 06/2024",
          role: "Главный системный архитектор (Leitender Systemarchitekt)",
          company: "Progress LLC, Розовка / Украина",
          bullets: [
            "Планирование, проектирование и разработка ИТ-инфраструктуры и системной архитектуры предприятия.",
            "Техническое руководство внедрением новых программных решений и оптимизацией существующих систем.",
            "Мониторинг системной безопасности, целостности данных и устранение неполадок в рабочем режиме.",
          ],
        },
        {
          period: "06/2023 – 10/2023",
          role: "Специалист по логистике",
          company: "Progress LLC, Розовка / Украина",
          bullets: [
            "Координация, планирование и контроль товарных потоков и цепочек поставок.",
            "Оптимизация складирования, управления запасами и транспортных маршрутов.",
            "Коммуникация с поставщиками, подрядчиками и подготовка сопроводительных документов.",
          ],
        },
        {
          period: "09/2022 – 05/2023",
          role: "Секретарь и администратор баз данных",
          company: "Progress LLC, Розовка / Украина",
          bullets: [
            "Ведение корреспонденции, обработка документов и сопровождение корпоративных баз данных.",
            "Организация встреч, совещаний и операционная поддержка руководства.",
            "Приём посетителей и профессиональная обработка телефонных и электронных обращений.",
          ],
        },
      ],
      education: [
        {
          period: "09/2021 – 02/2022",
          role: "Архитектурный дизайн (2 учебных года)",
          company: "Строительно-архитектурный колледж Мариуполя, Украина",
          bullets: ["Прервано без получения диплома в связи с началом войны."],
        },
        {
          period: "09/2010 – 06/2021",
          role: "Общеобразовательная школа (11 классов)",
          company: "Розовка / Украина",
          bullets: ["Аттестат о среднем образовании (Mittlerer Abschluss)."],
        },
      ],
      personal: [
        { label: "Имя", value: "Сергей Роговский (Serhii Rohovskyi)" },
        { label: "Дата рождения", value: "23.02.2004 — Мариуполь / Украина" },
        { label: "Адрес", value: "Fränkinger Straße 13, 85258 Weichs, Германия" },
        { label: "Семейное положение", value: "Не женат" },
        { label: "Гражданство", value: "Украина" },
        { label: "Мобильный", value: "+49 176 31640779", href: "tel:+4917631640779" },
        { label: "E-Mail", value: "serhiirohovskyi444@gmail.com", href: "mailto:serhiirohovskyi444@gmail.com" },
      ],
      skillGroups: [
        { category: "Разработка и ИИ-инструменты", items: ["Python", "Docker", "Git", "VS Code", "API-интеграция", "Prompt Engineering", "Agentic Workflows", "Multi-Agent Systems"] },
        { category: "Дизайн и 3D-моделирование", items: ["Figma", "Adobe Photoshop", "Blender", "AutoCAD", "ArchiCAD"] },
        { category: "Видеопроизводство и медиа", items: ["Adobe Premiere Pro", "CapCut", "Создание контента", "SMM-маркетинг"] },
        { category: "Офис и ИТ-инфраструктура", items: ["Системная архитектура", "Извлечение данных (Data Mining)", "MS Word / Excel / PowerPoint"] },
      ],
      languages: [
        { name: "Украинский", level: "Родной" },
        { name: "Русский", level: "Свободный" },
        { name: "Немецкий", level: "A2" },
        { name: "Английский", level: "A2" },
      ],
    },
    whyMe: {
      sectionTag: "05 // ПОЧЕМУ Я И СОТРУДНИЧЕСТВО",
      titlePlain: "РАБОТАЮЩИЕ СИСТЕМЫ ВМЕСТО",
      titleSerif: "пустых обещаний",
      stats: [
        { number: "31×15", label: "Торговых пар × криптобирж анализируются в реальном времени на платформе Arbfeld." },
        { number: "100%", label: "Соло-реализация от системной архитектуры и ИИ-агентов до UI." },
        { number: "4+ ГОДА", label: "Практический опыт в ИТ-архитектуре, ИИ-решениях, логистике и операциях." },
        { number: "24/7", label: "Автономные мультиагентные пайплайны для извлечения данных и автоматизации." },
      ],
      formatsTitle: "ФОРМАТЫ СОТРУДНИЧЕСТВА",
      formats: [
        { tag: "ВАРИАНТ 01 // ПОЛНАЯ / ЧАСТИЧНАЯ ЗАНЯТОСТЬ", title: "Штатная позиция в Мюнхене / Дахау или удалённо", desc: "В роли AI Agent Engineer, Automation Specialist, системного архитектора или Full-Stack разработчика с высокой инициативностью." },
        { tag: "ВАРИАНТ 02 // ПРОЕКТНАЯ РАБОТА", title: "Разработка ИИ-агентов и веб-платформ", desc: "Комплексная архитектура и реализация автономных ботов, Data Mining пайплайнов и высокопроизводительных веб-приложений." },
        { tag: "ВАРИАНТ 03 // ПРОТОТИПИРОВАНИЕ И КОНСАЛТИНГ", title: "Автоматизация процессов и интеграция LLM API", desc: "Быстрые функциональные прототипы и API-пайплайны для устранения ручных операционных узких мест." },
      ],
    },
    footer: {
      sectionTag: "06 // НАЧНЁМ",
      titleLine1: "ГОТОВЫ К",
      titleSerif: "реальным",
      titlePixel: "[РЕЗУЛЬТАТАМ]?",
      ctaPrimary: "СВЯЗАТЬСЯ СЕЙЧАС",
      ctaSecondary: "ПОСМОТРЕТЬ ARBFELD ↗",
    },
    drawer: {
      header: "КОНТАКТЫ // СЕРГЕЙ РОГОВСКИЙ",
      closeEsc: "[ESC] ЗАКРЫТЬ",
      title: "Давайте поговорим.",
      subtitle: "На связи для собеседований, технических демо Arbfeld или проектов ИИ-автоматизации.",
      emailLabel: "ЭЛЕКТРОННАЯ ПОЧТА",
      phoneLabel: "МОБИЛЬНЫЙ / WHATSAPP",
      projectLabel: "ФЛАГМАНСКИЙ ПРОЕКТ",
      addressLabel: "МЕСТОПОЛОЖЕНИЕ В ГЕРМАНИИ",
      copySuccess: "СКОПИРОВАНО!",
    },
  },
};
