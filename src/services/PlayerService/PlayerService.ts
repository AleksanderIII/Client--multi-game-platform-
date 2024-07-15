import ApiService from "../ApiService/ApiService";
import { Player } from "../../models";

class PlayersService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async fetchPlayers(): Promise<Player[]> {
    try {
      const response = await this.apiService.get<Player[]>("/players");
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch players: ${error.message}`);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }

  async createPlayer(data: any): Promise<any> {
    try {
      const response = await this.apiService.post<any>("/players", data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create player: ${error.message}`);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }

  async updatePlayer(id: string, data: any): Promise<any> {
    try {
      const response = await this.apiService.put<any>(`/players/${id}`, data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update player: ${error.message}`);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }

  async deletePlayer(id: string): Promise<any> {
    try {
      const response = await this.apiService.delete<any>(`/players/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete player: ${error.message}`);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }
}

export default PlayersService;