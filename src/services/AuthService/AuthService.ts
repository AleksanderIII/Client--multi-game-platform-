import ApiService from "../ApiService/ApiService";

class AuthService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    console.log(apiService);
    this.apiService = apiService;
  }

  async login(credentials: { username: string; password: string }) {
    console.log("login");
    try {
      console.log(this.apiService, this);
      const response = await this.apiService.post<any>(
        "/auth/login",
        credentials
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Login failed: ${error.message}`);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }

  async register(credentials: { username: string; password: string }) {
    try {
      const response = await this.apiService.post<any>(
        "/auth/register",
        credentials
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Registration failed: ${error.message}`);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }
}

export default AuthService;
