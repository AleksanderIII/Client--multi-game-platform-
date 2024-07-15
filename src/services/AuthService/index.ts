import apiConfig from "../../config";
import ApiService from "../ApiService/ApiService";
import ApiServiceConfig from "../ApiService/ApiServiceConfig";
import AuthService from "./AuthService";

// Создаем конфигурацию для Auth сервиса
const authServiceConfig = new ApiServiceConfig(
  apiConfig.baseURL,
  apiConfig.withCredentials
);

// Инициализируем ApiService с использованием конфигурации
const authApiService = new ApiService(
  authServiceConfig.getBaseURL(),
  authServiceConfig.getWithCredentials()
);

// Создаем и экспортируем экземпляр AuthService
export default new AuthService(authApiService);