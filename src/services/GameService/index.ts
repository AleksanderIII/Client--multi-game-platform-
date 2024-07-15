import apiConfig from "../../config";
import ApiService from "../ApiService/ApiService";
import GameService from "./GameService";

// Создаем ApiService для игрового сервиса
const gameApiService = new ApiService(
  apiConfig.baseURL,
  apiConfig.withCredentials
);

// Инициализируем GameService с использованием ApiService
const gameService = new GameService(gameApiService);

// Экспортируем экземпляр GameService
export default gameService;
