const signatures: Record<string, string> = {
  "Back to the Future Logo Generator": "⚡",
  LogLint: "🐛",
  "Phone Verification": "📱",
  "Background Eraser": "✂️",
  "Emoji Search": "😎",
  "Digital War": "⚔️",
  WhatsQuiz: "🧠",
  BombWord: "💣",
  Bookmoji: "🔖",
  "Life Journal": "📔",
  ScoreKeeper: "🏆",
  "Planning Poker": "🃏",
  GlowGrid: "🧩",
  Voxal: "🎙️",
  "Makefile Games": "👾",
  "MapMind Quest": "🌍",
  Awalé: "🌱",
  Gyroll: "🔮",
  "Kid Draw": "🖍️",
  TrampoVision: "🤸",
  "Roadster Flight": "🏎️",
  "Lovable Tools Portfolio": "✨",
};

export const projectAnchor = (title: string) =>
  `project-${title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`;

export const ProjectSignature = ({ title }: { title: string }) => {
  return <span className="project-signature" aria-hidden="true">
    {signatures[title] ?? "✨"}
  </span>;
};