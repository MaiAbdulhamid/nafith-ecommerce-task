import Axios, { AxiosInstance } from "axios";

class Api {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = Axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 45000,
    });
  }

  get(endpoint: any, query = {}) {
    this.setAuthToken();
    return this.http.get(endpoint, {
      params: query,
    });
  }

  post(endpoint: any, data: any) {
    this.setAuthToken();
    return this.http.post(endpoint, data);
  }

  setAuthToken() {
    this.http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }
}

export default new Api();
