import type { Locale } from "@/lib/i18n";

export type Preview =
  | { type: "iframe"; url: string }
  | { type: "image"; src: string };

export type Project = {
  id: string;
  title: string;
  blurb: Record<Locale, string>;
  stack: string[];
  repo?: string;
  live?: string;
  preview: Preview;
  year: number;
};

export const projects: Project[] = [
  {
    id: "msc-thesis",
    title: "M.Sc. Thesis — Event–RGB Transformer for Rodent Tracking",
    blurb: {
      en: "Ongoing thesis at LfB, RWTH Aachen. Multimodal transformer fusing event-camera streams with RGB video for end-to-end rodent pose tracking. Working title.",
      de: "Laufende Masterarbeit am LfB, RWTH Aachen. Multimodaler Transformer zur Fusion von Event-Kamera-Streams mit RGB-Video für End-to-End-Pose-Tracking von Nagern. Arbeitstitel.",
      hi: "LfB, RWTH Aachen में चल रही मास्टर थीसिस। इवेंट-कैमरा व RGB वीडियो को मिलाकर कृन्तकों की एंड-टू-एंड पोज़ ट्रैकिंग के लिए मल्टीमॉडल ट्रांसफॉर्मर। कार्यशील शीर्षक।",
      it: "Tesi M.Sc. in corso al LfB, RWTH Aachen. Transformer multimodale che fonde stream event-camera e video RGB per il pose tracking end-to-end di roditori. Titolo di lavoro.",
    },
    stack: ["PyTorch", "Transformers", "Event Cameras", "Computer Vision"],
    live: "https://lfb.rwth-aachen.de",
    preview: { type: "iframe", url: "https://lfb.rwth-aachen.de" },
    year: 2026,
  },
  {
    id: "bsc-thesis",
    title: "B.Sc. Thesis — Responsive Student Behavior for Immersive Teacher Training",
    blurb: {
      en: "HMD-based VR classroom (Unreal) where virtual students react to a trainee teacher's tone, gestures and proxemics via the Teacher Interpersonal Circle. Visual Computing Institute, RWTH Aachen — collab. Zuyd, Utrecht, Wageningen. Grade 1.3.",
      de: "HMD-VR-Klassenzimmer (Unreal): virtuelle Schüler:innen reagieren auf Stimme, Gestik und Proxemik der Lehrkraft via Teacher Interpersonal Circle. Visual Computing Institute, RWTH Aachen — Kooperation Zuyd, Utrecht, Wageningen. Note 1,3.",
      hi: "HMD-आधारित VR कक्षा (Unreal): वर्चुअल छात्र Teacher Interpersonal Circle के अनुसार शिक्षक के स्वर, हाव-भाव व प्रॉक्सेमिक्स पर प्रतिक्रिया करते हैं। Visual Computing Institute, RWTH Aachen — Zuyd/Utrecht/Wageningen सहयोग। ग्रेड 1.3।",
      it: "Aula VR su HMD (Unreal): studenti virtuali rispondono a tono, gesti e prossemica del docente tramite il Teacher Interpersonal Circle. Visual Computing Institute, RWTH Aachen — collab. Zuyd, Utrecht, Wageningen. Voto 1,3.",
    },
    stack: ["Unreal Engine", "C++", "VR / HMD", "Multimodal HCI"],
    live: "https://www.vr.rwth-aachen.de/completed_theses/",
    preview: { type: "image", src: "/previews/bsc-thesis.svg" },
    year: 2022,
  },
  {
    id: "ita-rl-bo",
    title: "RL × Bayesian Optimization — Non-Woven Process Control",
    blurb: {
      en: "OpenAI-Gym simulation environment for a non-woven textile line. Trained RL agents (PPO, SAC) and BoTorch multi-objective Bayesian optimization, hyperparameter sweeps via WandB. ITA, RWTH Aachen.",
      de: "OpenAI-Gym-Simulationsumgebung für eine Vliesstoff-Anlage. RL-Agenten (PPO, SAC) und BoTorch Multi-Objective Bayes'sche Optimierung trainiert, Hyperparameter-Sweeps mit WandB. ITA, RWTH Aachen.",
      hi: "नॉन-वोवन टेक्सटाइल लाइन के लिए OpenAI-Gym सिमुलेशन वातावरण। PPO/SAC एजेंट तथा BoTorch बहुउद्देश्यीय बेज़ियन ऑप्टिमाइज़ेशन, WandB स्वीप्स। ITA, RWTH Aachen।",
      it: "Ambiente di simulazione OpenAI-Gym per linea tessile non-woven. Agenti RL (PPO, SAC) e ottimizzazione bayesiana multi-obiettivo BoTorch, sweep WandB. ITA, RWTH Aachen.",
    },
    stack: ["Python", "PyTorch", "Gymnasium", "BoTorch", "WandB"],
    preview: { type: "image", src: "/previews/ita-rl-bo.svg" },
    year: 2025,
  },
  {
    id: "hanumantmarble",
    title: "Hanumant Marble — Web Platform",
    blurb: {
      en: "Next.js web platform for a marble business, live at hanumantmarble.com. Includes modern React UI and operational/business workflows.",
      de: "Next.js-Webplattform für ein Marmorunternehmen, live unter hanumantmarble.com. Mit moderner React-UI und betrieblichen Geschäftsabläufen.",
      hi: "एक संगमरमर व्यवसाय के लिए Next.js वेब प्लेटफ़ॉर्म, hanumantmarble.com पर लाइव। आधुनिक React UI और ऑपरेशनल/बिज़नेस वर्कफ़्लो सहित।",
      it: "Piattaforma web Next.js per un'azienda di marmi, live su hanumantmarble.com. Include UI React moderna e workflow operativi/business.",
    },
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Stripe"],
    repo: "https://github.com/shivamgif/hanumantmarble",
    live: "https://hanumantmarble.com",
    preview: { type: "iframe", url: "https://hanumantmarble.com" },
    year: 2026,
  },
  {
    id: "plagiarism-checker",
    title: "Cross-Platform Code Plagiarism Checker",
    blurb: {
      en: "Full-stack plagiarism detection app built with Next.js, FastAPI/Python and PostgreSQL in Docker. DFS-based sorting and clustering for cross-language code similarity, VS Code diff annotations. Grade 1.3.",
      de: "Full-Stack-Plagiatsprüfungs-App mit Next.js, FastAPI/Python und PostgreSQL in Docker. DFS-Sortierung und Clustering für sprachübergreifende Code-Ähnlichkeit, VS-Code-Diff-Annotationen. Note 1,3.",
      hi: "Next.js, FastAPI/Python तथा PostgreSQL (Docker) पर आधारित फुल-स्टैक प्लेजरिज़्म चेकर। क्रॉस-लैंग्वेज कोड समानता के लिए DFS सॉर्टिंग व क्लस्टरिंग, VS Code डिफ़ एनोटेशन। ग्रेड 1.3।",
      it: "App full-stack per il rilevamento del plagio con Next.js, FastAPI/Python e PostgreSQL in Docker. Ordinamento DFS e clustering per similarità di codice cross-language, annotazioni diff in VS Code. Voto 1,3.",
    },
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Docker", "TypeScript"],
    repo: "https://github.com/shivamgif/customplagerismcheck",
    preview: { type: "image", src: "/previews/plagiarism.svg" },
    year: 2024,
  },
  {
    id: "neurotx-bci",
    title: "NeuroTX — Brain-Computer Interface",
    blurb: {
      en: "Co-founder & 2nd president of NeuroTX Aachen e.V. LSTM and CNN models for EEG classification, recording protocols via the g.tec Python API, training pipelines for new members.",
      de: "Mitgründer & 2. Vorsitzender von NeuroTX Aachen e.V. LSTM- und CNN-Modelle zur EEG-Klassifikation, Aufnahmeprotokolle über die g.tec-Python-API, Schulungspipeline für neue Mitglieder.",
      hi: "NeuroTX Aachen e.V. के सह-संस्थापक एवं द्वितीय अध्यक्ष। EEG वर्गीकरण हेतु LSTM/CNN मॉडल, g.tec Python API से रिकॉर्डिंग प्रोटोकॉल, नए सदस्यों के लिए प्रशिक्षण पाइपलाइन।",
      it: "Co-fondatore e 2° presidente di NeuroTX Aachen e.V. Modelli LSTM e CNN per classificazione EEG, protocolli di registrazione con g.tec Python API, pipeline di formazione per nuovi membri.",
    },
    stack: ["Python", "PyTorch", "EEG", "LSTM", "CNN"],
    repo: "https://github.com/shivamgif/NeuroTX_BCI",
    live: "https://neurotx.de",
    preview: { type: "iframe", url: "https://neurotx.de" },
    year: 2024,
  },
  {
    id: "emg-android",
    title: "EMG ML — Android Clinical App",
    blurb: {
      en: "Preprocessing, feature extraction and ML model training on EMG biosignals from Uniklinik Aachen patients; integration into an Android app. Institut für Medizinische Informatik.",
      de: "Vorverarbeitung, Feature-Extraktion und ML-Modelltraining auf EMG-Biosignalen von Uniklinik-Aachen-Patient:innen; Integration in eine Android-App. Institut für Medizinische Informatik.",
      hi: "Uniklinik Aachen के मरीज़ों के EMG बायोसिग्नल्स पर प्रीप्रोसेसिंग, फ़ीचर एक्सट्रैक्शन व ML मॉडल प्रशिक्षण; Android ऐप में एकीकरण। Institut für Medizinische Informatik।",
      it: "Pre-elaborazione, estrazione di feature e training ML su biosegnali EMG di pazienti dell'Uniklinik Aachen; integrazione in un'app Android. Institut für Medizinische Informatik.",
    },
    stack: ["Python", "TensorFlow Lite", "Kotlin", "Android"],
    preview: { type: "image", src: "/previews/emg.svg" },
    year: 2023,
  },
  {
    id: "ios-todo",
    title: "iOS Todo App",
    blurb: {
      en: "Native Swift todo app — 190 commits, GitLab CI/CD, RWTH Aachen practical lab.",
      de: "Native Swift-Todo-App — 190 Commits, GitLab CI/CD, RWTH-Aachen-Praktikum.",
      hi: "नेटिव Swift टू-डू ऐप — 190 कमिट, GitLab CI/CD, RWTH Aachen प्रैक्टिकल।",
      it: "App todo nativa in Swift — 190 commit, GitLab CI/CD, laboratorio RWTH Aachen.",
    },
    stack: ["Swift", "iOS", "GitLab CI"],
    repo: "https://github.com/shivamgif/ios-todo-app",
    preview: { type: "image", src: "/previews/ios-todo.svg" },
    year: 2022,
  },
  {
    id: "hci-m3-game",
    title: "M3 Game — Unity (HCI Center)",
    blurb: {
      en: "Unity game project built at the Human Computer Interaction Center, RWTH Aachen.",
      de: "Unity-Spielprojekt am Human Computer Interaction Center der RWTH Aachen.",
      hi: "Human Computer Interaction Center, RWTH Aachen में बनाया गया Unity गेम प्रोजेक्ट।",
      it: "Progetto gioco Unity presso l'HCI Center della RWTH Aachen.",
    },
    stack: ["Unity", "C#"],
    repo: "https://github.com/shivamgif/M3-Game",
    preview: { type: "image", src: "/previews/m3-game.svg" },
    year: 2021,
  },
  {
    id: "racing-game",
    title: "Racing Game — NeuroTX",
    blurb: {
      en: "Unity racing game developed as part of the NeuroTX BCI project at RWTH Aachen.",
      de: "Unity-Rennspiel, entwickelt im Rahmen des NeuroTX-BCI-Projekts an der RWTH Aachen.",
      hi: "RWTH Aachen में NeuroTX BCI प्रोजेक्ट के हिस्से के रूप में बनाया गया Unity रेसिंग गेम।",
      it: "Gioco di corse Unity sviluppato nell'ambito del progetto BCI NeuroTX alla RWTH Aachen.",
    },
    stack: ["Unity", "C#"],
    repo: "https://github.com/shivamgif/Racing-game-F",
    preview: { type: "image", src: "/previews/racing.svg" },
    year: 2021,
  },
  {
    id: "stickycartridge",
    title: "Sticky Cartridge",
    blurb: {
      en: "JavaScript experiment — early portfolio piece.",
      de: "JavaScript-Experiment — frühes Portfolio-Stück.",
      hi: "JavaScript प्रयोग — प्रारंभिक पोर्टफोलियो कार्य।",
      it: "Esperimento JavaScript — primo lavoro di portfolio.",
    },
    stack: ["JavaScript"],
    repo: "https://github.com/shivamgif/stickycartridge",
    preview: { type: "image", src: "/previews/stickycartridge.svg" },
    year: 2019,
  },
];
