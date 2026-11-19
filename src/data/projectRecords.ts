/**
 * Plain project records shared by the gallery and the build-time agent
 * discovery files (llms.txt, index.md, crawler fallback). Keep this module free
 * of asset and component imports so vite.config.ts can load it in Node.
 */
export type ProjectCategory = "SaaS" | "Games" | "Tools" | "Dev" | "Fun" | "Design";

export interface ProjectRecord {
  title: string;
  description: string;
  longDescription: string;
  url: string;
  /** File name inside src/assets. */
  screenshot: string;
  tags: string[];
  categories: ProjectCategory[];
  date: string;
}

export const projectRecords: ProjectRecord[] = [{
  title: "Back to the Future Logo Generator",
  description: "Generate stunning logos in the iconic Back to the Future movie style.",
  longDescription: "Create amazing logos with the legendary Back to the Future aesthetic. Transform any text into the iconic yellow and orange movie-style logo with lightning effects and retro sci-fi vibes. Perfect for bringing that 1985 time-travel magic to your projects.",
  url: "https://bttf.erwann.app",
  screenshot: "bttf-logo.jpg",
  tags: ["Logo Generator", "Design", "Retro"],
  categories: ["Design", "Fun", "Tools"],
  date: "Jun 2025"
}, {
  title: "LogLint",
  description: "Smart log analysis and linting tool for developers.",
  longDescription: "A powerful tool designed to help developers analyze and lint their log files with ease. LogLint intelligently detects patterns, highlights issues, and provides actionable insights to improve code quality and debugging efficiency.",
  url: "https://logs.erwann.app",
  screenshot: "loglint-screenshot.jpg",
  tags: ["Developer Tools", "Analysis", "Productivity"],
  categories: ["Dev", "Tools"],
  date: "Jul 2025"
}, {
  title: "Phone Verification",
  description: "Revolutionary WhatsApp reverse verification - costless and secure.",
  longDescription: "A groundbreaking phone verification system using WhatsApp reverse verification technology. Completely costless and highly secure, this innovative approach eliminates SMS costs while providing robust authentication. Perfect for modern applications that need reliable phone verification without the hefty price tag.",
  url: "https://phone-verif.com",
  screenshot: "phone-verif-screenshot.jpg",
  tags: ["WhatsApp", "Security", "Authentication"],
  categories: ["SaaS", "Dev", "Tools"],
  date: "Aug 2025"
}, {
  title: "Background Eraser",
  description: "AI-powered background removal tool with precision.",
  longDescription: "Remove backgrounds from images instantly with cutting-edge AI technology. Perfect for product photos, profile pictures, and creative projects. Features batch processing, high-resolution exports, and intelligent edge detection.",
  url: "https://bg.erwann.app",
  screenshot: "bg-eraser-demo.jpg",
  tags: ["AI", "Image Processing", "Design"],
  categories: ["Tools", "Design"],
  date: "Sep 2025"
}, {
  title: "Emoji Search",
  description: "Find the perfect emoji instantly with smart search.",
  longDescription: "Never struggle to find the right emoji again. This intelligent search tool helps you discover and copy emojis quickly with keyword search, category filtering, and recent history tracking. Perfect for content creators and anyone who loves expressive communication.",
  url: "https://emoji-search.lovable.app",
  screenshot: "emoji-search-hero.jpg",
  tags: ["Utility", "Search", "Fun"],
  categories: ["Tools", "Fun"],
  date: "Oct 2025"
}, {
  title: "Digital War",
  description: "Strategic number battle game with tactical grid-based gameplay.",
  longDescription: "An engaging strategic board game where two players battle for control of the grid. Place your numbers strategically, capture opponent tiles, and dominate the battlefield. Features include undo moves, customizable grid sizes, and an action log to track the flow of battle. Test your tactical thinking in this addictive number-based strategy game.",
  url: "https://digital-war.erwann.app",
  screenshot: "digital-war-screenshot.jpg",
  tags: ["Game", "Strategy", "Fun"],
  categories: ["Games", "Fun"],
  date: "Nov 2025"
}, {
  title: "WhatsQuiz",
  description: "Real-time multiplayer quiz game controlled through WhatsApp.",
  longDescription: "A fun and innovative multiplayer quiz platform where players answer questions via WhatsApp in real-time. Host or join games with friends, play solo with customizable difficulty and categories, and enjoy live scores with instant feedback. Features WhatsApp integration for seamless gameplay and easy setup in seconds.",
  url: "https://waquizz.lovable.app",
  screenshot: "waquizz-screenshot.jpg",
  tags: ["Game", "Quiz", "WhatsApp"],
  categories: ["Games", "Fun"],
  date: "Dec 2025"
}, {
  title: "BombWord",
  description: "Explosive multiplayer word party game - type fast or get blasted!",
  longDescription: "A thrilling real-time multiplayer word game where speed is everything. Create or join private rooms with up to 16 players, choose from multiple languages, and race against the clock to type words before the bomb explodes. Features training mode for solo practice and explosive fun for parties and game nights.",
  url: "https://wordbomb.lovable.app",
  screenshot: "wordbomb-screenshot.jpg",
  tags: ["Game", "Multiplayer", "Word"],
  categories: ["Games", "Fun"],
  date: "Jan 2026"
}, {
  title: "Bookmoji",
  description: "Save and share bookmarks described with emojis — instant visual link recall.",
  longDescription: "A playful bookmark service where you save links with emoji descriptions instead of titles. Search your bookmarks by emoji, browse a visual grid of your favorite sites, and share collections with friends. No more forgetting why you saved that tab — the emojis tell the whole story at a glance.",
  url: "https://bookmoji.erwann.app",
  screenshot: "bookmoji-screenshot.jpg",
  tags: ["Bookmarks", "Emoji", "Productivity"],
  categories: ["Tools", "Fun"],
  date: "Jan 2026"
}, {
  title: "Life Journal",
  description: "Personal journaling app to capture and cherish life moments.",
  longDescription: "A beautiful life journaling application to document your memories, thoughts, and experiences. Features secure authentication with email/password or WhatsApp login, dark/light theme support, and a clean intuitive interface. Perfect for keeping a personal diary of your life's precious moments.",
  url: "https://souvenirs.erwann.app",
  screenshot: "souvenirs-screenshot.jpg",
  tags: ["Journal", "Personal", "Memories"],
  categories: ["Tools"],
  date: "Feb 2026"
}, {
  title: "ScoreKeeper",
  description: "Track scores for any game with flexible rules and multiple players.",
  longDescription: "A versatile score tracking app perfect for board games, card games, or any competitive activity. Add unlimited players, choose between highest or lowest wins rules, set target scores or fixed rounds, and keep a complete history of your game nights. Clean, intuitive interface makes score keeping effortless.",
  url: "https://score.erwann.app",
  screenshot: "scoresheet-screenshot.jpg",
  tags: ["Game", "Utility", "Tracker"],
  categories: ["Tools", "Games"],
  date: "Mar 2026"
}, {
  title: "Planning Poker",
  description: "Free real-time Planning Poker tool for agile teams.",
  longDescription: "A free, real-time Planning Poker tool for agile teams. No sign-up required — just create a session and start estimating. Features hidden votes, instant reveal, multiple card decks, and seamless team collaboration via shareable links.",
  url: "https://poker-planning.lovable.app",
  screenshot: "poker-planning-screenshot.jpg",
  tags: ["Agile", "Team", "Productivity"],
  categories: ["Dev", "Tools"],
  date: "Apr 2026"
}, {
  title: "GlowGrid",
  description: "Daily minimalist puzzle — light up the grid in as few moves as possible.",
  longDescription: "A sleek daily logic puzzle inspired by the classic Lights Out. Tap a tile to toggle it and its neighbours, and try to light up the entire grid in the fewest moves. Includes a daily challenge, streak tracking, hints, replays and shareable results. Beautiful glowing UI with a calm, focused vibe.",
  url: "https://glow-grid.erwann.app",
  screenshot: "glowgrid-screenshot.jpg",
  tags: ["Puzzle", "Daily", "Game"],
  categories: ["Games", "Fun"],
  date: "May 2026"
}, {
  title: "Voxal",
  description: "Team push-to-talk — walkie-talkie style voice chat, no meetings needed.",
  longDescription: "A real-time push-to-talk voice communication tool for teams. See who's online, drop into a channel, and talk instantly by holding a key — just like a walkie-talkie. No meetings, no scheduling, zero friction. Create rooms in seconds with no accounts or downloads required.",
  url: "https://www.voxal.app",
  screenshot: "voxal-screenshot.jpg",
  tags: ["Voice", "Team", "Real-time"],
  categories: ["SaaS", "Tools"],
  date: "Jun 2026"
}, {
  title: "Makefile Games",
  description: "A collection of terminal games written entirely in GNU Make — just `make` and play.",
  longDescription: "Ten classic games (Connect 4, Wordle, Minesweeper, Sokoban, Mastermind, Hangman, Tic-Tac-Toe, Quizz, Guess the number, Weather) implemented purely in GNU Make. No compilation, no dependencies — clone the repo, run `make`, and pick a game from the interactive menu. A fun exploration of how far you can push a build system.",
  url: "https://github.com/ErwannRobin/makefile-game",
  screenshot: "makefile-game-screenshot.jpg",
  tags: ["Terminal", "Make", "Games"],
  categories: ["Games", "Dev", "Fun"],
  date: "Jun 2026"
}, {
  title: "MapMind Quest",
  description: "Explore the world, unlock continents, and conquer daily geography challenges.",
  longDescription: "A captivating geography adventure game where you travel across the globe, unlock continents level by level, and complete daily quests to earn rewards. Test your knowledge of countries, capitals, and landmarks in a beautifully animated world map with a charming explorer companion.",
  url: "https://mapmind-quest.lovable.app",
  screenshot: "mapmind-quest-screenshot.jpg",
  tags: ["Game", "Geography", "Adventure"],
  categories: ["Games", "Fun"],
  date: "Jul 2026"
}, {
  title: "Awalé",
  description: "The classic African seed-sowing strategy game — play online, vs AI, or with friends.",
  longDescription: "A polished digital version of Awalé, the centuries-old African seed-sowing board game of the oware family. Play quick matches at your level, face opponents online, challenge an AI with adjustable difficulty, or pass & play with a friend. Includes interactive tutorials to learn the rules, puzzle challenges to sharpen your tactics, and an ELO-based ranking system that grows with you.",
  url: "https://awale.erwann.app",
  screenshot: "awale-screenshot.jpg",
  tags: ["Game", "Strategy", "Board"],
  categories: ["Games", "Fun"],
  date: "Aug 2026"
}, {
  title: "Gyroll",
  description: "Endless 3D marble run you steer by tilting your phone — how far can you go?",
  longDescription: "A sleek endless 3D marble runner where you steer a gleaming ball down a neon city track by tilting your phone. Chase distance, collect star power for speed boosts, and survive the daily run — fall and you restart at the last checkpoint. Simple to pick up, impossible to put down.",
  url: "https://gyroll.erwann.app",
  screenshot: "gyroll-screenshot.jpg",
  tags: ["Game", "3D", "Endless Runner"],
  categories: ["Games", "Fun"],
  date: "Sep 2026"
}, {
  title: "scribili",
  description: "A blank sheet, fat crayon colours and stickers for toddlers to draw with their fingers.",
  longDescription: "A finger-first drawing sheet made for very small hands: a full-screen white canvas, ten chunky colour swatches and a tray of emoji stickers to stamp anywhere. No menus to learn, no wrong way to draw — everything happens by touch, so the first masterpiece takes about two seconds. Built as a calm, ad-free space little ones can hand back to you already finished.",
  url: "https://scribi.li",
  screenshot: "kid-draw-screenshot.jpg",
  tags: ["Drawing", "Kids", "Touch"],
  categories: ["Fun", "Design"],
  date: "Oct 2026"
}, {
  title: "TrampoVision",
  description: "Film a trampoline set and get every skill named, scored and coached.",
  longDescription: "Point a camera at a trampoline set and TrampoVision does the judging: it names each skill, works out its difficulty, proposes an execution score and tells you what to fix. Everything runs in your browser — the video never leaves your device. Perfect for coaches and athletes who want instant, objective feedback on every bounce.",
  url: "https://trampo-vision.erwann.app",
  screenshot: "trampo-vision-screenshot.jpg",
  tags: ["AI", "Video Analysis", "Sports"],
  categories: ["Tools", "Fun"],
    date: "Oct 2026"
  }, {
    title: "Roadster Flight",
    description: "Launch a rocket-assisted roadster off monumental ramps above the clouds — then land it perfectly.",
    longDescription: "A cinematic 3D stunt game where you launch a rocket-assisted roadster off monumental ramps above the clouds, then fight gravity to bring it back down for a perfect landing. Drag to line up your approach, feel the boost, and nail the touchdown across three levels of increasing ambition.",
    url: "https://carlander.erwann.app",
    screenshot: "carlander-screenshot.jpg",
    tags: ["Game", "3D", "Stunt"],
    categories: ["Games", "Fun"],
    date: "Oct 2026"
  }, {
    title: "Famous Logo Generators",
    description: "Type once and see your words in iconic movie, TV, game and brand logo styles.",
    longDescription: "A free collection of famous logo style generators: type your name, your band or your cat once and preview it in every iconic lettering at the same time. Pick a style to fine-tune colours, backgrounds and animations, then export a PNG, GIF or video. No sign-up, available in 13 languages.",
    url: "https://logos.erwann.app",
    screenshot: "logos-screenshot.jpg",
    tags: ["Logo Generator", "Design", "Typography"],
    categories: ["Design", "Fun", "Tools"],
    date: "Nov 2026"
  }, {
    title: "Claim Your Spot",
    description: "One giant advertising page where 500 brands each own a numbered space.",
    longDescription: "A giant digital advertising page: 500 numbered spaces, one per brand. Buy a spot, rent it out, or receive offers from other brands who want the same square. Built from zero for the Ship or Die $100K Hackathon — if the project wins, the prize pays for a real full-page newspaper ad carrying the first 500 logos. Independent project, not endorsed by the hackathon: the print edition is an ambition, not a guarantee.",
    url: "https://www.claimyourspot.bid",
    screenshot: "claim-your-spot-screenshot.jpg",
    tags: ["Marketplace", "Advertising", "Hackathon"],
    categories: ["SaaS", "Fun"],
    date: "Nov 2026"
  }, {
    title: "Portfolio",
  description: "This very portfolio showcasing all my Lovable creations.",
  longDescription: "A modern, elegant portfolio website built with Lovable to showcase all the tools and projects I've created. Features a clean design, smooth animations, dark/light mode support, and is easily extensible for future projects. Built with React, TypeScript, and Tailwind CSS.",
  url: "https://erwann.app",
  screenshot: "portfolio-screenshot.jpg",
  tags: ["Portfolio", "React", "Lovable"],
  categories: ["Dev", "Design"],
  date: "May 2026"
}];
