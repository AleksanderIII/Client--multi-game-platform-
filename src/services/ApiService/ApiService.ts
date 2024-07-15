import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { IApiService, ApiResponse } from "../../models";

export default class ApiService implements IApiService {
  private axiosInstance = axios.create();
  private baseURL: string;
  private withCredentials: boolean;

  constructor(baseURL: string, withCredentials: boolean = false) {
    this.baseURL = baseURL;
    this.withCredentials = withCredentials;
    this.configure();
  }

  // Приватный метод для конфигурации Axios
  private configure() {
    this.axiosInstance.defaults.baseURL = this.baseURL;
    this.axiosInstance.defaults.withCredentials = this.withCredentials;
  }

  // Новые методы для установки базового URL и withCredentials
  setBaseURL(baseURL: string): void {
    this.baseURL = baseURL;
    this.configure();
  }

  setWithCredentials(withCredentials: boolean): void {
    this.withCredentials = withCredentials;
    this.configure();
  }

  private async request<T>(
    config: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: response.config,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(
          `Request failed with status ${axiosError.response?.status}`
        );
      } else if (error instanceof Error) {
        throw new Error(`Request failed: ${error.message}`);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: "get", url });
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    console.log({ ...config, method: "post", url, data });
    return this.request<T>({ ...config, method: "post", url, data });
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: "put", url, data });
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: "delete", url });
  }
}
