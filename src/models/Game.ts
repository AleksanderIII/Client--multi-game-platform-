export interface Game {
  id: number;
  name: string;
  genre: string;
  releaseDate: string;
  imageUrl?: string;
  isReleased: boolean;
}
