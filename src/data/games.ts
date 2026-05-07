import type { GameCopyKey } from "../lib/i18n";

export type GameAccent = "gascii" | "mienjine";

export interface GameData {
  id: string;
  copyKey: GameCopyKey;
  accentColor: GameAccent;
  marker: string;
  issueDate: string;
}

export const gamesData = [
  {
    id: "gascii",
    copyKey: "gascii",
    accentColor: "gascii",
    marker: "G",
    issueDate: "27/02",
  },
  {
    id: "mienjine",
    copyKey: "mienjine",
    accentColor: "mienjine",
    marker: "M",
    issueDate: "27/02",
  }
] satisfies [GameData, ...GameData[]];
