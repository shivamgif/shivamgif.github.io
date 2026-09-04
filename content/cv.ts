import type { Locale } from "@/lib/i18n";

export type CVEntry = {
  id: string;
  from: string;
  to: string;
  title: Record<Locale, string>;
  org: string;
  detail: Record<Locale, string>;
};

export const cv: CVEntry[] = [
  {
    id: "msc",
    from: "10.2022",
    to: "now",
    title: {
      en: "M.Sc. Informatics",
      de: "M.Sc. Informatik",
      hi: "एम.एससी. इन्फोर्मेटिक्स",
      it: "M.Sc. Informatica",
    },
    org: "RWTH Aachen",
    detail: {
      en: "Seminar: Statistical Criteria of Active Machine Learning (2.0).",
      de: "Seminar: Statistical Criteria of Active Machine Learning (2,0).",
      hi: "सेमिनार: Statistical Criteria of Active Machine Learning (2.0)।",
      it: "Seminario: Statistical Criteria of Active Machine Learning (2,0).",
    },
  },
  {
    id: "msc-thesis",
    from: "now",
    to: "ongoing",
    title: {
      en: "M.Sc. Thesis — Event–RGB Transformer Models for End-to-End Rodent Tracking",
      de: "Masterarbeit — Event–RGB Transformer-Modelle zur End-to-End-Verfolgung von Nagern",
      hi: "मास्टर थीसिस — कृन्तकों की एंड-टू-एंड ट्रैकिंग हेतु Event–RGB ट्रांसफॉर्मर मॉडल",
      it: "Tesi M.Sc. — Modelli Transformer Event–RGB per il tracking end-to-end di roditori",
    },
    org: "Lehrstuhl für Bildverarbeitung (LfB), RWTH Aachen",
    detail: {
      en: "Multimodal transformer fusing event-camera streams with RGB video for end-to-end rodent pose tracking. Working title.",
      de: "Multimodaler Transformer zur Fusion von Event-Kamera-Streams mit RGB-Video für End-to-End-Pose-Tracking von Nagern. Arbeitstitel.",
      hi: "इवेंट-कैमरा स्ट्रीम और RGB वीडियो को मिलाकर कृन्तकों की एंड-टू-एंड पोज़ ट्रैकिंग के लिए मल्टीमॉडल ट्रांसफॉर्मर। कार्यशील शीर्षक।",
      it: "Transformer multimodale che fonde stream da event camera e video RGB per pose tracking end-to-end di roditori. Titolo di lavoro.",
    },
  },
  {
    id: "ita",
    from: "10.2023",
    to: "03.2025",
    title: {
      en: "Research — Reinforcement Learning & Bayesian Optimization",
      de: "Forschung — Reinforcement Learning & Bayes'sche Optimierung",
      hi: "शोध — रिइन्फ़ोर्समेंट लर्निंग व बेज़ियन ऑप्टिमाइज़ेशन",
      it: "Ricerca — Reinforcement Learning & Ottimizzazione Bayesiana",
    },
    org: "ITA — Non-Woven, RWTH Aachen",
    detail: {
      en: "Gym sim env, RL agent training, BoTorch MOBO, WandB sweeps.",
      de: "Gym-Sim-Umgebung, RL-Agententraining, BoTorch MOBO, WandB-Sweeps.",
      hi: "Gym सिम वातावरण, RL एजेंट प्रशिक्षण, BoTorch MOBO, WandB स्वीप्स।",
      it: "Ambiente Gym, training agenti RL, BoTorch MOBO, sweep WandB.",
    },
  },
  {
    id: "awt",
    from: "04.2024",
    to: "09.2024",
    title: {
      en: "Advanced Web Tech Lab",
      de: "Advanced Web Tech Lab",
      hi: "Advanced Web Tech Lab",
      it: "Advanced Web Tech Lab",
    },
    org: "Informatik 9 — Lerntechnologien",
    detail: {
      en: "Plagiarism checker — full-stack, grade 1.3.",
      de: "Plagiatsprüfung — Full-Stack, Note 1,3.",
      hi: "प्लेजरिज़्म चेकर — फुल-स्टैक, ग्रेड 1.3।",
      it: "Plagiarism checker — full-stack, voto 1,3.",
    },
  },
  {
    id: "neurotx",
    from: "06.2020",
    to: "09.2024",
    title: {
      en: "Co-Founder · 2nd President · HW/SW Lead",
      de: "Mitgründer · 2. Vorsitzender · HW/SW-Leitung",
      hi: "सह-संस्थापक · द्वितीय अध्यक्ष · HW/SW प्रमुख",
      it: "Co-fondatore · 2° presidente · Lead HW/SW",
    },
    org: "NeuroTX Aachen e.V.",
    detail: {
      en: "BCI — LSTM/CNN, EEG protocols, team leadership.",
      de: "BCI — LSTM/CNN, EEG-Protokolle, Teamleitung.",
      hi: "BCI — LSTM/CNN, EEG प्रोटोकॉल, टीम नेतृत्व।",
      it: "BCI — LSTM/CNN, protocolli EEG, leadership team.",
    },
  },
  {
    id: "imi",
    from: "10.2022",
    to: "06.2023",
    title: {
      en: "Android & ML — EMG Biosignals",
      de: "Android & ML — EMG-Biosignale",
      hi: "Android व ML — EMG बायोसिग्नल",
      it: "Android & ML — Biosegnali EMG",
    },
    org: "Institut für Medizinische Informatik",
    detail: {
      en: "ML training on EMG, integration in Android app.",
      de: "ML-Training auf EMG, Integration in Android-App.",
      hi: "EMG पर ML प्रशिक्षण, Android ऐप में एकीकरण।",
      it: "Training ML su EMG, integrazione in app Android.",
    },
  },
  {
    id: "hci",
    from: "04.2021",
    to: "08.2021",
    title: {
      en: "Game Development — Unity (M3)",
      de: "Game-Entwicklung — Unity (M3)",
      hi: "गेम डेवलपमेंट — Unity (M3)",
      it: "Sviluppo gioco — Unity (M3)",
    },
    org: "Human Computer Interaction Center, RWTH Aachen",
    detail: {
      en: "Unity-based game project (M3).",
      de: "Unity-Spielprojekt (M3).",
      hi: "Unity-आधारित गेम प्रोजेक्ट (M3)।",
      it: "Progetto gioco Unity (M3).",
    },
  },
  {
    id: "webdesign",
    from: "10.2016",
    to: "12.2016",
    title: {
      en: "Web Design",
      de: "Webdesign",
      hi: "वेब डिज़ाइन",
      it: "Web design",
    },
    org: "Infoseek, Brand of My5 Technologies Pvt Ltd, Lucknow",
    detail: { en: "", de: "", hi: "", it: "" },
  },
  {
    id: "ror",
    from: "07.2019",
    to: "03.2022",
    title: {
      en: "Ruby on Rails Web Apps",
      de: "Ruby-on-Rails-Webanwendungen",
      hi: "Ruby on Rails वेब ऐप्स",
      it: "App web Ruby on Rails",
    },
    org: "Dekanat MWMB, RWTH Aachen",
    detail: {
      en: "Two Rails apps for the Faculty of Mechanical Engineering — both still in production. Incomings — exchange students, partner faculties, module mapping, language courses, exam results; PDF transcripts as official records for the home universities. Lehrnachweise — PDF teaching-record certificates for the faculty's professors; user management and authentication.",
      de: "Zwei Rails-Anwendungen für die Fakultät für Maschinenwesen — beide bis heute im Produktivbetrieb. Incomings — Austauschstudierende, Partnerfakultäten, Modulzuordnung, Sprachkurse, Prüfungsergebnisse; PDF-Transcripts als offizielle Leistungsnachweise für die Heimathochschulen. Lehrnachweise — PDF-Lehrnachweis-Bescheinigungen für Professor:innen der Fakultät; Benutzerverwaltung und Authentifizierung.",
      hi: "मैकेनिकल इंजीनियरिंग संकाय के लिए दो Rails ऐप्लिकेशन — दोनों आज भी प्रोडक्शन में। Incomings — एक्सचेंज छात्र, साझेदार संकाय, मॉड्यूल मैपिंग, भाषा पाठ्यक्रम, परीक्षा परिणाम; गृह विश्वविद्यालयों हेतु आधिकारिक PDF ट्रांसक्रिप्ट। Lehrnachweise — संकाय के प्रोफ़ेसरों के लिए PDF शिक्षण-प्रमाणपत्र; उपयोगकर्ता प्रबंधन व प्रमाणीकरण।",
      it: "Due applicazioni Rails per la Facoltà di Ingegneria Meccanica — entrambe tuttora in produzione. Incomings — studenti in scambio, facoltà partner, mappatura dei moduli, corsi di lingua, risultati d'esame; transcript PDF come certificati ufficiali per le università di provenienza. Lehrnachweise — certificati PDF di attività didattica per i professori della facoltà; gestione utenti e autenticazione.",
    },
  },
  {
    id: "bsc",
    from: "10.2018",
    to: "09.2022",
    title: {
      en: "B.Sc. Informatics",
      de: "B.Sc. Informatik",
      hi: "बी.एससी. इन्फोर्मेटिक्स",
      it: "B.Sc. Informatica",
    },
    org: "RWTH Aachen",
    detail: {
      en: "Thesis (1.3) at the Visual Computing Institute: 'Designing Responsive Student Behavior for Immersive Teacher Training' — HMD-based VR classroom for student-teacher training, virtual agents reacting to tone, gesture and proxemics via the Teacher Interpersonal Circle, built on the Unreal Breaking-Bad-Behavior stack (collab. Zuyd, Utrecht, Wageningen). Supervisors: J. Ehret, Dr. A. Bönsch.",
      de: "Bachelorarbeit (1,3) am Visual Computing Institute: 'Designing Responsive Student Behavior for Immersive Teacher Training' — HMD-VR-Klassenzimmer zum Training angehender Lehrkräfte; virtuelle Schüler:innen reagieren auf Stimme, Gestik und Proxemik gemäß dem Teacher Interpersonal Circle, aufbauend auf dem Unreal-Stack 'Breaking Bad Behavior' (Kooperation Zuyd, Utrecht, Wageningen). Betreuer: J. Ehret, Dr. A. Bönsch.",
      hi: "Visual Computing Institute में थीसिस (1.3): 'Designing Responsive Student Behavior for Immersive Teacher Training' — HMD-आधारित VR कक्षा, जिसमें वर्चुअल छात्र Teacher Interpersonal Circle के अनुसार आवाज़, हाव-भाव व प्रॉक्सेमिक्स पर प्रतिक्रिया देते हैं; Unreal 'Breaking Bad Behavior' स्टैक पर आधारित (Zuyd, Utrecht, Wageningen सहयोग)। पर्यवेक्षक: J. Ehret, Dr. A. Bönsch।",
      it: "Tesi (1,3) al Visual Computing Institute: 'Designing Responsive Student Behavior for Immersive Teacher Training' — aula VR su HMD per la formazione di docenti tirocinanti; agenti virtuali che reagiscono a tono, gesti e prossemica secondo il Teacher Interpersonal Circle, basata sullo stack Unreal 'Breaking Bad Behavior' (collab. Zuyd, Utrecht, Wageningen). Relatori: J. Ehret, Dr. A. Bönsch.",
    },
  },
];
