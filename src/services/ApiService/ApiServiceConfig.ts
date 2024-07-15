import { AxiosRequestConfig } from "axios";

class ApiServiceConfig {
  protected baseURL: string;
  protected withCredentials: boolean;

  constructor(baseURL: string, withCredentials: boolean = false) {
    this.baseURL = baseURL;
    this.withCredentials = withCredentials;
  }

  public getRequestConfig(): AxiosRequestConfig {
    return {
      baseURL: this.baseURL,
      withCredentials: this.withCredentials,
    };
  }

  public getBaseURL(): string {
    return this.baseURL;
  }

  public getWithCredentials(): boolean {
    return this.withCredentials;
  }
}

export default ApiServiceConfig;