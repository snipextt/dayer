import axios, { Axios } from "axios";
interface Response<T> {
  data: T;
  message: string;
  error: string;
}

export class AuthenticatedHttpClient {
  http: Axios;

  constructor(
    tokenCallBack: (arg: Record<string, any>) => Promise<string | null>,
  ) {
    this.http = axios.create({
      baseURL: "http://localhost:3000/api",
    });
    this.http.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        Promise.reject(error);
        return error.response.data;
      },
    );

    this.http.interceptors.request.use(
      async (config) => {
        const token = await tokenCallBack({
          template: "backend",
        });
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  async get<T>(url: string): Promise<Response<T>> {
    return this.http.get(url);
  }

  async post<T>(url: string, data?: Record<string, any>): Promise<Response<T>> {
    return this.http.post(url, data);
  }

  async put<T>(url: string, data?: Record<string, any>): Promise<Response<T>> {
    return this.http.put(url, data);
  }

  async delete<T>(url: string): Promise<Response<T>> {
    return this.http.delete(url);
  }
}
