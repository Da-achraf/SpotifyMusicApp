import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {Observable, map, of} from 'rxjs';
import { API_CONFIG, API_Config } from '../config/spotify-api.config';
import { Artist } from '../models/artist.model';
import { Track } from '../models/track.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {

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
    let url = this.buildUrl(query, 'track');

    return this.http.get<Track[]>(url).pipe(
        map((res: any) => res.tracks.items),
        map((items: any) =>
            items.map(
              (item: any) => this.utils.buildTrackObject(item)
            )
          )
        );
  }

    searchAlbum(query: string): Observable<any> {
    let url = this.buildUrl(query, 'album');
    return this.http.get(url).pipe(
      map((res: any) => res)
    );
  }

    searchArtist(query: string): Observable<Artist[]> {
    let url = this.buildUrl(query, 'artist');
    return this.http.get<Artist[]>(url)
        .pipe(
            map((res: any) => res.artists.items),
              map((res: any) =>
                res.map(
                  (item: any) => this.utils.buildArtistObject(item)
                )
              ),
            map((artists: Artist[]) => this.utils.sortArtists(artists, query))
        );
  }

    getArtistById(param: string): Observable<Artist>{
      const query = `${param}`
      let url = this.buildUrl(query, 'artist', this.apiConfig.artists_url);
      return this.http.get<Artist>(url)
          .pipe(
              map((item: any) => this.utils.buildArtistObject(item)),
          );
  }

    buildUrl(
        query: string,
        type: string,
        basicUrl = this.apiConfig.search_url
    ): string {
      if (basicUrl === this.apiConfig.search_url)
          return `${basicUrl}?${this.getParams(query, type)}`
      else
          return `${basicUrl}/${query}`
  }

    getParams(query: string, type: string): string {
    return [`q=${query}`, `type=${type}`].join('&');
  }
}
