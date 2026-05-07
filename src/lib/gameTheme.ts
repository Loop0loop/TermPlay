import type { GameAccent } from "../data/games";

interface GameTheme {
  card: string;
  showcase: string;
  gradient: string;
}

export const gameThemeByAccent: Record<GameAccent, GameTheme> = {
  gascii: {
    card: "bg-game-blue-card",
    showcase: "from-game-blue-showcase",
    gradient: "from-game-blue-gradient to-surface-canvas",
  },
  mienjine: {
    card: "bg-game-purple-card",
    showcase: "from-game-purple-showcase",
    gradient: "from-game-purple-gradient to-surface-canvas",
  },
};
