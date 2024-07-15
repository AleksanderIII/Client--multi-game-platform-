import { Game, IApiService } from "../../models";

class GameService {
  private apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  async fetchGames() {
    try {
      const response = await this.apiService.get<Game[]>("/games");
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch games: ${error.message}`);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }

  async createGame(data: Game) {
    try {
      const response = await this.apiService.post<Game>("/games", data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create game: ${error.message}`);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }

  async updateGame(id: string, data: Game) {
    try {
      const response = await this.apiService.put<Game>(`/games/${id}`, data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update game: ${error.message}`);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }

  async deleteGame(id: string) {
    try {
      const response = await this.apiService.delete<Game>(`/games/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete game: ${error.message}`);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }
}

export default GameService;
