import apiConfig from "../../config";
import ApiService from "../ApiService/ApiService";
import ApiServiceConfig from "../ApiService/ApiServiceConfig";
import PlayersService from "./PlayerService";

// Создаем конфигурацию для Players сервиса
const playersServiceConfig = new ApiServiceConfig(
  apiConfig.baseURL,
  apiConfig.withCredentials
);

// Инициализируем ApiService для Players сервиса
const playersApiService = new ApiService(
  playersServiceConfig.getBaseURL(),
  playersServiceConfig.getWithCredentials()
);

// Создаем и экспортируем экземпляр PlayersService
export default new PlayersService(playersApiService);
