import axios, { AxiosRequestConfig } from "axios";
import { BACKEND_API_URL } from "../Common/Constants";

export default class HttpService {
  static handleResponse(url: string, data: any, isAxiosError = false): any {
    if (isAxiosError) {
      const errorMessage = data ? data.message : "";
      throw new Error(
        JSON.stringify({
          status: data.status,
          message: errorMessage,
        })
      );
    } else {
      return data.data;
    }
  }

  static async get(path: string) {
    try {
      const request: AxiosRequestConfig = {
        method: "GET",
        url: BACKEND_API_URL + path,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const response = await axios(request);
      return this.handleResponse(path, response);
    } catch (error: any) {
      return this.handleResponse(path, error.response, true);
    }
  }

  static async postFormData(
    path: string,
    body: any,
    isMultipartFormRequest?: boolean
  ) {
    try {
      const request: AxiosRequestConfig = {
        method: "POST",
        url: BACKEND_API_URL + path,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: body,
      };
      const response = await axios(request);
      return this.handleResponse(path, response);
    } catch (error: any) {
      return this.handleResponse(path, error.response, true);
    }
  }

  static async putFormData(path: string, body: any, isAPiKey = false) {
    try {
      const request: AxiosRequestConfig = {
        method: "put",
        url: BACKEND_API_URL + path,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: body,
      };
      const response = await axios(request);
      return this.handleResponse(path, response);
    } catch (error: any) {
      return this.handleResponse(path, error.response, true);
    }
  }

  static async delete(path: string) {
    try {
      const request: AxiosRequestConfig = {
        method: "delete",
        url: BACKEND_API_URL + path,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const response = await axios(request);
      return this.handleResponse(path, response);
    } catch (error: any) {
      return this.handleResponse(path, error.response, true);
    }
  }
}
