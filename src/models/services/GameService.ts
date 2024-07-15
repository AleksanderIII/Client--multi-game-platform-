import { Game } from "../Game";

export interface IGameService {
  fetchGames(): Promise<Game[]>;
  createGame(data: Game): Promise<Game>;
  updateGame(id: string, data: Game): Promise<Game>;
  deleteGame(id: string): Promise<void>;
}
