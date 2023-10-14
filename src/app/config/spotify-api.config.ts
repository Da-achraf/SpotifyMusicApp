import { InjectionToken } from "@angular/core";

export interface API_Config {
  api_url: string;
  token_url: string;
  client_id: string;
  client_secret: string;
}

const API_Config: API_Config = {
  api_url: 'https://api.spotify.com/v1/search',
  token_url: 'https://accounts.spotify.com/api/token',
  client_id: '2dfa4d39e8df4059b6ad9f746908a0c6',
  client_secret: '5a9a0f961eca4fa982e724595d70dcff'
}

export const API_CONFIG: InjectionToken<API_Config> = new InjectionToken('API_CONFIG',{
  providedIn: 'root',
  factory: () => API_Config
})

