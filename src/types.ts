export interface GameData {
  date: string;
  opponent: string;
  availablePitchers: string;
}

export interface Lineup {
  inning: number;
  positions: {
    [position: string]: string;
  };
}

export const POSITIONS = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF'] as const;
