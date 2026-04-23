// Hardcoded portfolio data — swap with real values later
const DATA = {
  identity: {
    handle: "moralesbang",
    name: "Morales",
    firstName: "Juan",
    lastName: "Morales",
    role: "Software Engineer",
    specialty: "React & frontend systems",
    location: "Medellín, CO",
    timezone: "UTC-5 · GMT-5",
    status: "Working at Humand",
    email: "moralesbang.dev@gmail.com",
    tagline: "I build fast, predictable interfaces with a pinch of obsessive detail.",
  },

  stats: [
    { k: "Years", v: "6+" },
    { k: "Commits this year", v: "1,284" },
    { k: "Projects in prod", v: "23" },
    { k: "Coffees today", v: "3" },
  ],

  projects: [
    {
      id: "atlas",
      name: "Atlas",
      italic: "DS",
      tagline: "Open-source design system with 60+ React components, CSS tokens, and interactive docs generated straight from the code.",
      stack: ["React", "TypeScript", "Radix", "CSS", "Storybook"],
      year: "2025",
      role: "Lead",
      status: "v2.1 — active",
      links: [{ label: "source", href: "#" }, { label: "docs", href: "#" }],
      mock: "ds",
    },
    {
      id: "cronos",
      name: "Cronos",
      italic: null,
      tagline: "Time-tracking app that understands context: integrates git, calendar, and editor to categorize your day without writing a single entry.",
      stack: ["React", "Electron", "SQLite", "Rust"],
      year: "2024",
      role: "Co-founder",
      status: "private beta",
      links: [{ label: "demo", href: "#" }, { label: "changelog", href: "#" }],
      mock: "chart",
    },
    {
      id: "lexicon",
      name: "Lexicon",
      italic: null,
      tagline: "Notion-style collaborative editor for product teams. CRDTs at the core, plugins at the surface. Syncs offline.",
      stack: ["React", "Yjs", "tRPC", "Postgres"],
      year: "2024",
      role: "Frontend Lead",
      status: "prod · 12k MAU",
      links: [{ label: "site", href: "#" }, { label: "writeup", href: "#" }],
      mock: "editor",
    },
    {
      id: "meridian",
      name: "Meridian",
      italic: null,
      tagline: "CLI + dashboard for observability of LLM agents. Tracks calls, costs, and per-prompt regressions across 5 models.",
      stack: ["React", "Node", "ClickHouse", "Claude API"],
      year: "2025",
      role: "Solo",
      status: "WIP",
      links: [{ label: "preview", href: "#" }, { label: "notes", href: "#" }],
      mock: "dashboard",
    },
  ],

  stack: [
    {
      cat: "Frontend",
      items: [
        { name: "React", lvl: 5, primary: true },
        { name: "TypeScript", lvl: 5, primary: true },
        { name: "Next.js", lvl: 4 },
        { name: "Remix", lvl: 4 },
        { name: "TanStack Query", lvl: 5 },
        { name: "Vite", lvl: 4 },
      ],
    },
    {
      cat: "Styling & UI",
      items: [
        { name: "Modern CSS", lvl: 5 },
        { name: "Tailwind", lvl: 4 },
        { name: "Radix / shadcn", lvl: 4 },
        { name: "Framer Motion", lvl: 3 },
        { name: "Storybook", lvl: 4 },
      ],
    },
    {
      cat: "Backend & data",
      items: [
        { name: "Node.js", lvl: 4 },
        { name: "tRPC / REST", lvl: 4 },
        { name: "Postgres", lvl: 3 },
        { name: "Prisma", lvl: 4 },
        { name: "Redis", lvl: 3 },
      ],
    },
    {
      cat: "Toolbelt",
      items: [
        { name: "Neovim", lvl: 5, primary: true },
        { name: "Claude Code", lvl: 5, primary: true },
        { name: "tmux", lvl: 4 },
        { name: "Git / lazygit", lvl: 5 },
        { name: "zsh + fzf", lvl: 4 },
      ],
    },
  ],

  experience: [
    {
      date: "2024 — present",
      current: true,
      role: "Senior Frontend Engineer",
      italic: "Frontend",
      company: "Confidential",
      at: "B2B SaaS · 40 people",
      desc: "Leading the UI layer of the main product: progressive migration to React 18, design of the internal design system, and a data-layer refactor that cut TTI by 40%.",
      tags: ["React 18", "Design Systems", "Performance", "Mentoring"],
    },
    {
      date: "2022 — 2024",
      role: "Full-stack Engineer",
      company: "Startup (stealth)",
      at: "seed · 8 people",
      desc: "Built the MVP from scratch with Next.js, Postgres, and tRPC. Shipped onboarding, billing, collaborative editor, and auth in 4 months before Series A.",
      tags: ["Next.js", "tRPC", "Postgres", "MVP"],
    },
    {
      date: "2020 — 2022",
      role: "Frontend Engineer",
      company: "Agency",
      at: "consulting · multiple clients",
      desc: "Shipped ~15 products for fintech and e-commerce clients. Learned to write CSS that survives a 3-week QA cycle and to estimate in real human-hours.",
      tags: ["React", "E-commerce", "CSS", "Client work"],
    },
    {
      date: "2019",
      role: "Junior Developer",
      company: "First job",
      at: "onsite · internal team",
      desc: "First gig. jQuery, Bootstrap, and a lot of copy-pasting from Stack Overflow. Learned to read other people's code — turned out to be the most useful skill of my career.",
      tags: ["jQuery", "PHP", "Humility"],
    },
  ],

  uses: [
    {
      corner: "01",
      title: "Editor",
      items: [
        { k: "editor", v: "Neovim 0.10" },
        { k: "distro", v: "LazyVim (custom)" },
        { k: "theme", v: "kanagawa-dragon", accent: true },
        { k: "font", v: "JetBrains Mono" },
        { k: "AI", v: "Claude Code", accent: true },
      ],
    },
    {
      corner: "02",
      title: "Shell & OS",
      items: [
        { k: "OS", v: "macOS 14 · Arch" },
        { k: "shell", v: "zsh + starship" },
        { k: "term", v: "Ghostty" },
        { k: "multiplex", v: "tmux" },
        { k: "fuzzy", v: "fzf + rg", accent: true },
      ],
    },
    {
      corner: "03",
      title: "Hardware",
      items: [
        { k: "laptop", v: "MBP 14\" M3" },
        { k: "keyboard", v: "Keychron Q1 Pro" },
        { k: "switches", v: "Gateron Brown" },
        { k: "monitor", v: "Dell U2723QE" },
        { k: "audio", v: "Sony WH-1000XM5" },
      ],
    },
  ],

  contact: [
    { k: "email", v: "moralesbang.dev@gmail.com", href: "mailto:moralesbang.dev@gmail.com" },
    { k: "github", v: "@moralesbang", href: "https://github.com/moralesbang" },
    { k: "twitter", v: "@moralesbang", href: "#" },
    { k: "linkedin", v: "in/moralesbang", href: "#" },
    { k: "cal", v: "cal.com/moralesbang", href: "#" },
    { k: "cv", v: "download.pdf", href: "#" },
  ],
};

window.DATA = DATA;
