const signatures: Record<string, { symbol: string; kind?: string }> = {
  "Back to the Future Logo Generator": { symbol: "⚡" },
  LogLint: { symbol: ">_" },
  "Phone Verification": { symbol: "✓" },
  "Background Eraser": { symbol: "✂", kind: "checker" },
  "Emoji Search": { symbol: "😎" },
  "Digital War": { symbol: "7 · 9" },
  WhatsQuiz: { symbol: "?" },
  BombWord: { symbol: "💣" },
  Bookmoji: { symbol: "🔖" },
  "Life Journal": { symbol: "✎" },
  ScoreKeeper: { symbol: "21 : 18" },
  "Planning Poker": { symbol: "♠ 8" },
  GlowGrid: { symbol: "", kind: "grid" },
  Voxal: { symbol: "", kind: "wave" },
  "Makefile Games": { symbol: "$ make" },
  "MapMind Quest": { symbol: "🌍" },
  Awalé: { symbol: "", kind: "seeds" },
  Gyroll: { symbol: "", kind: "marble" },
  "Kid Draw": { symbol: "〰", kind: "crayon" },
  TrampoVision: { symbol: "↟", kind: "bounce" },
  "Roadster Flight": { symbol: "🏎️" },
  "Lovable Tools Portfolio": { symbol: "✦" },
};

export const projectAnchor = (title: string) =>
  `project-${title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`;

export const ProjectSignature = ({ title }: { title: string }) => {
  const signature = signatures[title] ?? { symbol: "✦" };
  return <span className={`project-signature signature-${signature.kind ?? "symbol"}`} aria-hidden="true">
    {signature.kind === "wave" || signature.kind === "grid" || signature.kind === "seeds"
      ? Array.from({ length: signature.kind === "grid" ? 9 : signature.kind === "seeds" ? 3 : 7 }, (_, i) => <i key={i} />)
      : signature.symbol}
  </span>;
};