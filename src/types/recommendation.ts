export interface Item {
  id: string;
  title: string;
  year: number;
  category: string;
  genres: string[];
  description: string;
  popularity: number;
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  occupation: string;
  avatar: string;
}

export interface Recommendation {
  item: Item;
  score: number;
  source: 'svd' | 'content' | 'hybrid' | 'trending';
  features: {
    svdScore?: number;
    contentSimilarity?: number;
    userItemSimilarity?: number;
    popularity?: number;
    recency?: number;
    demographicMatch?: number;
  };
}

export interface ModelInfo {
  name: string;
  type: string;
  description: string;
  usedIn: string[];
  output: string;
}
