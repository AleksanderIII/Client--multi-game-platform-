export class ApiConfig {
  baseURL: string;
  withCredentials: boolean;

  constructor(baseURL: string, withCredentials: boolean) {
    this.baseURL = baseURL;
    this.withCredentials = withCredentials;
  }
}

const developmentConfig = new ApiConfig(
  import.meta.env.VITE_API_BASE_URL as string,
  import.meta.env.VITE_WITH_CREDENTIALS === 'true'
);

const productionConfig = new ApiConfig(
  import.meta.env.VITE_API_BASE_URL as string,
  import.meta.env.VITE_WITH_CREDENTIALS === 'true'
);

const env = import.meta.env.VITE_ENV || 'development';

const apiConfig =
  env === 'production' ? productionConfig : developmentConfig;

export default apiConfig;