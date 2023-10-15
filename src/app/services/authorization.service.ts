import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {API_Config, API_CONFIG} from "../config/spotify-api.config";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(@Inject(API_CONFIG) private apiConfig: API_Config, private http: HttpClient) { }

  getToken(): any {
    console.log('Step 10..');
    const token = JSON.parse(localStorage.getItem('spotify_search_token')!);
    if (token) {
      console.log('Getting Token');
      return token;
    }

    this.requestToken().subscribe((token) => {
      console.log('Setting Token');
      localStorage.setItem('spotify_search_token', JSON.stringify(token));
      return token;
    });
  }

  private requestToken(): Observable<any> {
    return this.http.post(this.apiConfig.token_url, '');
  }

  getRefreshedToken() {
    localStorage.removeItem('spotify_search_token');
    return this.getToken();
  }
}
