// One dark cell per character image — no duplicates.
export const charImgs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;
export const BLACK_COUNT = charImgs.length;

export const charMessages: Record<string, string> = {
  "1": "Michael is here!",
  "2": "Reading molecular simulation papers :)",
  "3": "Photography is my therapy.",
  "4": "Coffee fuels every late-night experiment.",
  "5": "Music helps me focus.",
  "6": "Hope I can have my own cat one day :)",
  "7": "Badminton!",
  "8": "Zelda BOTW is the best game ever :)",
  "9": "Supercooled water is fascinating.",
  "10": "Python is my second language.",
  b1: "Thank you for watching!",
  b2: "More interesting products are coming now",
};

export type GridLayout = { cols: number; rows: number };

export function getLayout(width: number): GridLayout {
  return width <= 600 ? { cols: 5, rows: 9 } : { cols: 9, rows: 5 };
}

export function imgPath(charKey: string): string {
  if (charKey === "b1" || charKey === "b2") {
    return `/images/buttom-characters/${charKey.slice(1)}.jpg`;
  }
  return `/images/characters/${charKey}.png`;
}

export type SocialLinkType = "github" | "linkedin" | "email";

export type SocialLink = {
  type: SocialLinkType;
  href: string;
  label: string;
};

export type CellSpec = {
  index: number;
  isBlack: boolean;
  charKey?: string;
  message?: string;
  link?: SocialLink;
};

export function buildCells(layout: GridLayout, blackCount = BLACK_COUNT): CellSpec[] {
  const total = layout.cols * layout.rows;
  const center = Math.floor(layout.rows / 2) * layout.cols + Math.floor(layout.cols / 2);

  const blackSet = new Set<number>([center]);
  while (blackSet.size < blackCount) {
    blackSet.add(Math.floor(Math.random() * total));
  }

  const otherImgs = charImgs.filter((k) => k !== "1");
  const shuffled = [...otherImgs].sort(() => Math.random() - 0.5);
  const imgMap = new Map<number, string>([[center, "1"]]);
  let imgIdx = 0;
  for (const idx of blackSet) {
    if (idx !== center) {
      imgMap.set(idx, shuffled[imgIdx % shuffled.length] ?? "1");
      imgIdx++;
    }
  }

  const cells: CellSpec[] = [];
  for (let i = 0; i < total; i++) {
    const isBlack = blackSet.has(i);
    if (isBlack) {
      const charKey = imgMap.get(i) ?? "1";
      cells.push({ index: i, isBlack: true, charKey, message: charMessages[charKey] });
    } else {
      cells.push({ index: i, isBlack: false });
    }
  }
  return cells;
}

export function buildRowCells(layout: GridLayout): CellSpec[] {
  const cols = layout.cols;
  const center = Math.floor(cols / 2);

  // Three fixed-position social link cells, evenly spread around the center.
  const offset = Math.min(2, center);
  const leftPos = center - offset;
  const rightPos = center + offset;

  const linkMap = new Map<number, SocialLink>([
    [leftPos, { type: "github", href: "https://github.com/OhhMoo", label: "GitHub" }],
    [center, { type: "linkedin", href: "https://www.linkedin.com/in/yiqi-yao-michael/", label: "LinkedIn" }],
    [rightPos, { type: "email", href: "mailto:myao3411@gmail.com", label: "Email" }],
  ]);

  const cells: CellSpec[] = [];
  for (let i = 0; i < cols; i++) {
    const link = linkMap.get(i);
    if (link) {
      cells.push({ index: i, isBlack: true, link, message: link.label });
    } else {
      cells.push({ index: i, isBlack: false });
    }
  }
  return cells;
}
