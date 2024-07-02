import axios, { AxiosInstance, AxiosPromise } from 'axios';
import config from "./config";
import {SerpingConfig} from "./types";

class Serping {
  private axiosInstance: AxiosInstance;

  constructor({ region = 'us-east-1', apiKey }: SerpingConfig) {
    
    const baseURL = config.serpingApi[region].baseUrl + "/api/v1/";
    const axiosConfig = {
      baseURL,
      headers: {
        'x-api-key': apiKey ?? config.serpingApi[region].apiKey
      }
    };
    const axiosInstance = axios.create(axiosConfig);

    this.axiosInstance = axiosInstance; 
   }

  private async get(endpoint: string, params?: Record<string, any>) {
    try {
      return await this.axiosInstance.get(endpoint, { params });
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Request failed');
      } else {
        throw new Error(error.message || 'Request failed');
      }
    }
  }

  async googleSerp(params: { q: string, [key: string]: any}): AxiosPromise<any> {
    if(!params.q) throw new Error("query is empty");
    const response = await this.get("google/serp", params);
    const data = response.data;
    return data;
  }
}

export default Serping;
