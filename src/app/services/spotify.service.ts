import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {Observable, catchError, map, of} from 'rxjs';
import { API_CONFIG, API_Config } from '../config/spotify-api.config';
import { Artist } from '../models/artist.model';
import { Track } from '../models/track.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  token: any = {
    access_token: '',
    token_type: '',
    expires_in: 0,
  };

  constructor(
    private http: HttpClient,
    private utils: UtilsService,
    @Inject(API_CONFIG) private apiConfig: API_Config
  ) {}

    search(type: string, query: string): Observable<any>{
      switch (type) {
          case 'track':
              return this.searchTrack(query)
          case 'artist':
              return this.searchArtist(query)
          case 'album':
              return this.searchAlbum(query)
          default:
              return of(null)
      }
    }

  searchTrack(query: string): Observable<Track[]> {
    let [url, headers] = this.buildUrl(query, 'track');

    return this.http.get<Track[]>(url, { headers: headers }).pipe(
      catchError((err, caught) => {
        this.refreshToken();
        [url, headers] = this.buildUrl(query, 'track');
        return this.http.get<Track[]>(url, { headers: headers });
      }),
      map((res: any) => res.tracks.items),
      map((items: any) =>
        items.map(
          (item: any) =>
            new Track({
              id: item.id,
              title: item.name,
              artists: item.artists.map((artist: any) => {
                return new Artist({ id: artist.id, name: artist.name });
              }),
              cover:
                item.album.images.length != 0 ? item.album.images[0].url : '',
              previewUrl: item.preview_url,
            })
        )
      )
    );
  }

  searchAlbum(query: string): Observable<any> {
    let [url, headers] = this.buildUrl(query, 'album');
    return this.http.get(url, { headers: headers }).pipe(
      catchError((err, caught) => {
        [url, headers] = this.buildUrl(query, 'album');
        return caught;
      }),
      map((res: any) => res)
    );
  }

  searchArtist(query: string): Observable<Artist[]> {
    // const searchTerm: string = query.split(' ')[0];
    let [url, headers] = this.buildUrl(query, 'artist');

    return this.http.get<Artist[]>(url, { headers: headers }).pipe(
      catchError((err, caught) => {
        this.refreshToken();
        [url, headers] = this.buildUrl(query, 'artist');
        return this.http.get<Artist[]>(url, { headers: headers });
      }),
      map((res: any) => res.artists.items),
      map((res: any) =>
        res.map(
          (item: any) =>
            new Artist({
              id: item.id,
              name: item.name,
              image: item.images.length != 0 ? item.images[0].url : '',
              followers: item.followers.total,
              genres: item.genres,
              popularity: item.popularity,
            })
        )
      ),
      map((artists: Artist[]) => this.utils.sortArtists(artists, query))
    );
  }

  buildUrl(query: string, type: string): [string, HttpHeaders] {
    // First get the token
    this.getToken();
    return [
      `${this.apiConfig.api_url}?${this.getParams(query, type)}`,
      this.getHeaders(),
    ];
  }

  /*
   * Get token from local storage if found in it
   * else (expired) request it from spotify api
   */
  getToken() {
    const token = JSON.parse(localStorage.getItem('spotify_search_token')!);
    if (token) {
      this.token = token;
      return;
    }

    this.requestToken().subscribe((res) => {
      this.token = res;
      localStorage.setItem('spotify_search_token', JSON.stringify(this.token));
    });
  }

  // Request token from spotify api
  requestToken(): Observable<any> {
    const auth = btoa(
      `${this.apiConfig.client_id}:${this.apiConfig.client_secret}`
    );
    const headers = new HttpHeaders({
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.http.post(this.apiConfig.token_url, body, { headers: headers });
  }

  // if token was expired
  refreshToken() {
    localStorage.removeItem('spotify_search_token');
    this.getToken();
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token.access_token}`,
    });
  }

  getParams(query: string, type: string): string {
    return [`q=${query}`, `type=${type}`].join('&');
  }
}
