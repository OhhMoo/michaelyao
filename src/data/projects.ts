import type { CliLine } from "@/components/CliMockup";
import { SPEQTRO_LINES } from "./speqtro-cli";

export type ProjectLink = { label: string; href: string };
export type ProjectStat = { k: string; v: string };
export type FolderColor = "accent" | "grey" | "dgrey" | "black" | "white";

export type AsciiShape = "goldfish" | "jellyfish";

export type FolderId =
  | "agents"
  | "simulation"
  | "interp"
  | "writing"
  | "experiments"
  | "elsewhere";

export type FolderMeta = {
  id: FolderId;
  index: number;
  indexRoman: string;
  tabLabel: string;
  group: string;
  color: FolderColor;
  headline: string;
  headlineScript?: string[];
  paneHeading: string;
  paneHeadingScript?: string[];
  paneIntroHtml: string;
  metaChips: string[];
};

export type ProjectPreview =
  | { kind: "image"; src: string; alt?: string }
  | {
      kind: "image-pair";
      panes: { src: string; caption?: string; alt?: string }[];
    }
  | {
      kind: "image-gallery";
      title?: string;
      images: { src: string; caption?: string; alt?: string }[];
    }
  | { kind: "video"; src: string }
  | { kind: "iframe"; src: string; title?: string }
  | {
      kind: "iframe-pair";
      title?: string;
      panes: { src: string; caption?: string; title?: string }[];
    }
  | { kind: "svg"; node: "iceberg" | "sae" }
  | {
      kind: "ascii";
      shape: AsciiShape;
      theme?: "light" | "dark";
      caption?: string;
    }
  | { kind: "quote"; text: string; bg?: string }
  | { kind: "cli"; lines: CliLine[]; width?: number };

export type Project = {
  id: string;
  folder: FolderId;
  title: string;
  scriptParts?: string[];
  oneLiner: string;
  descriptionHtml: string;
  year: string;
  techStack: string[];
  links: ProjectLink[];
  stats?: ProjectStat[];
  preview?: ProjectPreview;
};

export const folders: FolderMeta[] = [
  {
    id: "agents",
    index: 1,
    indexRoman: "I",
    tabLabel: "01 · Agent",
    group: "Agent",
    color: "accent",
    headline: "Systems\nthat answer.",
    headlineScript: ["answer"],
    paneHeading: "Agent — systems that answer.",
    paneHeadingScript: ["answer"],
    paneIntroHtml:
      "Two agentic systems: one for spectroscopy, one for research memory. Both treat the tool-use loop as the primary surface.",
    metaChips: ["reasoning", "tools", "memory"],
  },
  {
    id: "simulation",
    index: 2,
    indexRoman: "II",
    tabLabel: "02 · Simulation",
    group: "Simulation",
    color: "grey",
    headline: "Numbers\nwith shape.",
    headlineScript: ["shape"],
    paneHeading: "Simulation — numbers with shape.",
    paneHeadingScript: ["shape"],
    paneIntroHtml:
      "Molecular dynamics, graph neural networks, and fragmentation pipelines — chemistry as a topology problem.",
    metaChips: ["MD", "GNN", "HPC"],
  },
  {
    id: "interp",
    index: 3,
    indexRoman: "III",
    tabLabel: "03 · Interpretability",
    group: "Interpretability",
    color: "dgrey",
    headline: "Features,\nas verbs.",
    headlineScript: ["as verbs"],
    paneHeading: "Interpretability — features, as verbs.",
    paneHeadingScript: ["as verbs"],
    paneIntroHtml:
      "Sparse autoencoders over RL checkpoints — what the agent learned, and when.",
    metaChips: ["SAE", "RL", "checkpoints"],
  },
  {
    id: "writing",
    index: 4,
    indexRoman: "IV",
    tabLabel: "04 · Photography",
    group: "Photography",
    color: "black",
    headline: "Frames,\nwhen I look up.",
    headlineScript: ["when I look up"],
    paneHeading: "Photography — frames, when I look up.",
    paneHeadingScript: ["when I look up"],
    paneIntroHtml:
      "A small archive of photographs — light, cities, the occasional mountain. Kept here mostly as a record of looking.",
    metaChips: ["35mm", "digital", "travel"],
  },
  {
    id: "experiments",
    index: 5,
    indexRoman: "V",
    tabLabel: "05 · Experiments",
    group: "Experiments",
    color: "white",
    headline: "Small things,\nworth sharing.",
    headlineScript: ["worth sharing"],
    paneHeading: "Experiments — small things, worth sharing.",
    paneHeadingScript: ["worth sharing"],
    paneIntroHtml:
      "Short experiments in visualization, plotting, and ML utilities. This folder is still opening.",
    metaChips: ["placeholder"],
  },
  {
    id: "elsewhere",
    index: 6,
    indexRoman: "VI",
    tabLabel: "06 · Elsewhere",
    group: "Elsewhere",
    color: "accent",
    headline: "Other\nplaces.",
    headlineScript: ["places"],
    paneHeading: "Elsewhere — other places.",
    paneHeadingScript: ["places"],
    paneIntroHtml:
      "Code, email, scholar — the usual coordinates.",
    metaChips: ["links"],
  },
];

export const projects: Project[] = [
  {
    id: "speqtro",
    folder: "agents",
    title: "SPEQTRO",
    oneLiner: "an instrument that answers back.",
    descriptionHtml: `An agentic spectroscopy reasoning system. Parses <tt>JCAMP-DX</tt>, Bruker FID, and raw CSV spectra; routes them through four independent ML evidence streams that collapse into one defensible structural guess. CLI, GUI, and MCP-server surfaces.`,
    year: "2026",
    techStack: ["Python", "PyTorch", "MCP", "Spectroscopy"],
    links: [{ label: "GitHub ↗", href: "https://github.com/OhhMoo/SPEQTRO" }],
    stats: [
      { k: "Parsers", v: "JCAMP · FID · CSV" },
      { k: "Ensemble", v: "4 streams" },
      { k: "Tests", v: "34 units" },
    ],
    preview: { kind: "video", src: "/videos/speqtro-video.mp4" },
  },
  {
    id: "langalpha",
    folder: "agents",
    title: "LangAlpha",
    scriptParts: ["Alpha"],
    oneLiner: "a research memory, on purpose.",
    descriptionHtml: `A persistent multi-agent research harness. Every investigation gets its own Daytona sandbox with an <tt>agent.md</tt> memory the agent reads, appends, and cites. 23 prebuilt finance skills; per-workspace encrypted vaults; programmatic tool calling end-to-end.`,
    year: "2025–26",
    techStack: ["FastAPI", "LangGraph", "React", "Daytona"],
    links: [
      { label: "GitHub ↗", href: "https://github.com/ginlix-ai/LangAlpha" },
      { label: "Live ↗", href: "https://langalpha.com/" },
    ],
    stats: [
      { k: "Sandbox", v: "Daytona" },
      { k: "Memory", v: "agent.md" },
      { k: "Skills", v: "23 prebuilt" },
    ],
    preview: {
      kind: "image-gallery",
      title: "LangAlpha — product tour",
      images: [
        { src: "/images/works/langalpha/1-chart.png", caption: "Chart · GOOGL technicals", alt: "GOOGL candlestick chart with MA/RSI overlays" },
        { src: "/images/works/langalpha/2-market.png", caption: "Market overview · AI-generated brief", alt: "Market overview dashboard" },
        { src: "/images/works/langalpha/3-workspaces.png", caption: "Workspaces · per-investigation memory", alt: "Workspaces list" },
        { src: "/images/works/langalpha/4-automations.png", caption: "Automations · scheduled briefs", alt: "Automations templates" },
      ],
    },
  },
  {
    id: "water",
    folder: "simulation",
    title: "Water, clustered",
    scriptParts: ["clustered"],
    oneLiner: "a liquid with two minds.",
    descriptionHtml: `Structural heterogeneity in supercooled water, framed against the <span class="scriptital">Shi &amp; Tanaka</span> two-state hypothesis. MD on HPC → order-parameter extraction → UMAP → HDBSCAN / GMM. The plot above is live — scroll, zoom, it's the actual run.`,
    year: "2025–26",
    techStack: ["OpenMM", "HDBSCAN", "UMAP", "HPC"],
    links: [{ label: "GitHub ↗", href: "https://github.com/OhhMoo/Water_Clustering" }],
    stats: [
      { k: "Framework", v: "Shi & Tanaka" },
      { k: "Embedding", v: "UMAP → 2D" },
      { k: "Clustering", v: "HDBSCAN · GMM" },
    ],
    preview: {
      kind: "iframe-pair",
      title: "water 3D clustering",
      panes: [
        { src: "/plotly/water-3d-cluster0.html", caption: "cluster 0", title: "Cluster 0 — Low-density" },
        { src: "/plotly/water-3d-cluster1.html", caption: "cluster 1", title: "Cluster 1 — High-density" },
      ],
    },
  },
  {
    id: "iceberg",
    folder: "simulation",
    title: "Iceberg PyG",
    scriptParts: ["PyG"],
    oneLiner: "same numbers, different home.",
    descriptionHtml: `ICEBERG's MS/MS fragmentation pipeline — 19 files, 8 GNN families (GGNN, PNA, GINE…) — ported from DGL to PyTorch Geometric. DAG fragment pipelines redesigned around <tt>Batch</tt> and <tt>scatter_</tt>.`,
    year: "2025",
    techStack: ["PyTorch", "PyG", "Chem"],
    links: [{ label: "GitHub ↗", href: "https://github.com/OhhMoo/ms-pred-PyG-ver" }],
    stats: [
      { k: "Files", v: "19 migrated" },
      { k: "GNN families", v: "8" },
      { k: "Primitive", v: "MessagePassing" },
    ],
    preview: { kind: "svg", node: "iceberg" },
  },
  {
    id: "sae",
    folder: "interp",
    title: "SAE × RL",
    scriptParts: ["× RL"],
    oneLiner: "features, as verbs.",
    descriptionHtml: `PPO fine-tuning with <tt>verl</tt> → activation caching → sparse-autoencoder training with <span class="scriptital">BatchTopK</span>. Features classified across checkpoints as <span class="em scriptital">born</span>, <span class="em scriptital">died</span>, or <span class="em scriptital">stable</span> — a way to ask what the agent learned, and when.`,
    year: "2025",
    techStack: ["PyTorch", "SAELens", "verl"],
    links: [{ label: "GitHub ↗", href: "https://github.com/OhhMoo/sae_rl" }],
    stats: [
      { k: "SAE", v: "BatchTopK" },
      { k: "Training", v: "verl · SAELens" },
      { k: "Tracked", v: "birth · drift · death" },
    ],
    preview: { kind: "svg", node: "sae" },
  },
  {
    id: "ph-shibuya",
    folder: "writing",
    title: "Shibuya",
    oneLiner: "a crossing, from above.",
    descriptionHtml:
      "Tokyo, looking down at the intersection from a quieter window. Neon and rain, held still.",
    year: "2024",
    techStack: ["travel", "city"],
    links: [],
    preview: { kind: "image", src: "/images/works/photos/shibuya.jpg", alt: "Shibuya crossing" },
  },
  {
    id: "ph-villa",
    folder: "writing",
    title: "Restrooms →",
    oneLiner: "a sign, in a quiet room.",
    descriptionHtml:
      "Getty Villa. Hex tile floor, a statue half in shadow, the smallest of signs catching the afternoon. Most of what you remember from a museum is the room between the rooms.",
    year: "2025",
    techStack: ["interior", "light"],
    links: [],
    preview: { kind: "image", src: "/images/works/photos/villa.jpg", alt: "Villa interior with sunlight on tile floor" },
  },
  {
    id: "ph-griffith",
    folder: "writing",
    title: "Griffith",
    oneLiner: "LA, on the hour it goes blue.",
    descriptionHtml:
      "The walk back down from the observatory, when the city has finished turning on. A pine, a path, a thousand windows lit at once.",
    year: "2025",
    techStack: ["city", "dusk"],
    links: [],
    preview: { kind: "image", src: "/images/works/photos/griffith.jpg", alt: "Los Angeles skyline at dusk from Griffith" },
  },
  {
    id: "ph-meguro",
    folder: "writing",
    title: "Meguro",
    oneLiner: "the parasite museum, with a parasite of my own.",
    descriptionHtml:
      "Outside the Meguro Parasitological Museum. The book on my screen is <span class=\"scriptital\">Love Parasite</span> (戀愛寄生蟲) — a coincidence small enough to take a picture of.",
    year: "2025",
    techStack: ["travel", "Tokyo"],
    links: [],
    preview: { kind: "image", src: "/images/works/photos/meguro.jpg", alt: "Phone showing book cover outside the Meguro Parasitological Museum" },
  },
  {
    id: "ph-train-coffee",
    folder: "writing",
    title: "Shinkansen",
    oneLiner: "a paper cup, at speed.",
    descriptionHtml:
      "Morning light through the carriage window, the platform sliding away. Coffee held still in a hand that isn't.",
    year: "2025",
    techStack: ["travel", "Japan"],
    links: [],
    preview: { kind: "image", src: "/images/works/photos/train-coffee.jpg", alt: "Hand holding a paper cup of coffee on a Japanese train" },
  },
  {
    id: "ph-espresso",
    folder: "writing",
    title: "Dirty",
    oneLiner: "espresso, into milk.",
    descriptionHtml:
      "A small bar at night, the moment the shot lands. Two layers, briefly, before they aren't.",
    year: "2025",
    techStack: ["café", "still life"],
    links: [],
    preview: { kind: "image", src: "/images/works/photos/espresso.jpg", alt: "Barista pouring espresso into a glass of iced milk" },
  },
  {
    id: "ph-kaiseki",
    folder: "writing",
    title: "Kaiseki",
    oneLiner: "one dish, presented as a question.",
    descriptionHtml:
      "A single course on lacquerware, pine needles, a wedge of citrus. The kind of plating where the empty space is also the meal.",
    year: "2025",
    techStack: ["food", "Japan"],
    links: [],
    preview: { kind: "image", src: "/images/works/photos/kaiseki.jpg", alt: "Kaiseki course on lacquer tray" },
  },
  {
    id: "ex-methyl",
    folder: "experiments",
    title: "Tetraazamacrocycle at SSP",
    scriptParts: ["at SSP"],
    oneLiner: "cross-bridged macrocycles for dye bleaching.",
    descriptionHtml:
      "Synthesis and characterization of cross-bridged methyl-arm tetraazamacrocycles (Me₂B1#N₄) and structural studies of late transition metal complexes (Ni, Co, Cu). Dye bleaching catalysis via Fenton-type advanced oxidation. SSP at SWOSU, advised by Dr. Hubin, Dr. Ellis, and Dr. Ononiwu.",
    year: "2024",
    techStack: ["Inorganic Chem", "Catalysis", "NMR", "UV-Vis", "Mass Spec"],
    links: [{ label: "Presentation ↗", href: "/Team_Methyl_Presentation.pdf" }],
    preview: {
      kind: "image-pair",
      panes: [
        { src: "/images/works/crystal-dark.png", alt: "Crystal under polarized light (dark field)", caption: "dark field" },
        { src: "/images/works/crystal-light.png", alt: "Crystal under polarized light (bright field)", caption: "bright field" },
      ],
    },
  },
  {
    id: "ex-ph",
    folder: "experiments",
    title: "Reusable pH Indicator Synthesis",
    scriptParts: ["pH"],
    oneLiner: "color as chemistry.",
    descriptionHtml:
      "Synthesis of a reusable pH indicator from natural pigments. A hands-on experiment demonstrating acid-base equilibria through visible color transitions across the pH scale.",
    year: "2024",
    techStack: ["Organic Chem", "Synthesis", "Acid-Base"],
    links: [],
    preview: { kind: "video", src: "/videos/ph-indicator.mp4" },
  },
  {
    id: "ex1",
    folder: "experiments",
    title: "coming soon",
    scriptParts: ["soon"],
    oneLiner: "a folder, still opening.",
    descriptionHtml:
      "Short experiments in visualization, plotting, and small ML utilities will land here as they're worth sharing.",
    year: "—",
    techStack: ["placeholder"],
    links: [],
    preview: { kind: "ascii", shape: "jellyfish", theme: "light", caption: "more to come." },
  },
  {
    id: "el1",
    folder: "elsewhere",
    title: "GitHub",
    oneLiner: "all the code, in one place.",
    descriptionHtml:
      "Repositories for SPEQTRO, LangAlpha, Water Clustering, SAE × RL, Iceberg PyG, and the small things.",
    year: "live",
    techStack: [],
    links: [{ label: "github.com/OhhMoo ↗", href: "https://github.com/OhhMoo" }],
    preview: { kind: "quote", text: "@ohhmoo", bg: "#141210" },
  },
  {
    id: "el2",
    folder: "elsewhere",
    title: "Email",
    oneLiner: "the slowest and best.",
    descriptionHtml:
      "For research conversations, collaborations, or anything worth more than a message.",
    year: "live",
    techStack: [],
    links: [{ label: "myao3411@gmail.com ↗", href: "mailto:myao3411@gmail.com" }],
    preview: { kind: "quote", text: "write, reply, say hello.", bg: "#f5f5f5" },
  },
  {
    id: "el3",
    folder: "elsewhere",
    title: "Scholar",
    oneLiner: "papers, when they land.",
    descriptionHtml:
      "Google Scholar profile will live here once the first preprints are out.",
    year: "soon",
    techStack: ["soon"],
    links: [],
    preview: { kind: "ascii", shape: "goldfish", theme: "light", caption: "coming, in 2026." },
  },
];
