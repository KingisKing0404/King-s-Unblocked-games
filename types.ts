
export interface Game {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  iframeUrl: string;
  description: string;
  rating: number;
  plays: string;
}

export type Category = 'All' | 'Puzzle' | 'Action' | 'Arcade' | 'Classic' | 'Sports';
