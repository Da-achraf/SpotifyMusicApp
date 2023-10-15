import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription, from, share, tap, shareReplay, filter} from 'rxjs';
import { SearchInputs } from '../components/search-input/search-input.component';
import { Track } from '../models/track.model';
import {Artist} from "../models/artist.model";

@Injectable({
  providedIn: 'root',
})
export class StateManager {
  private tracks: BehaviorSubject<Track[]> = new BehaviorSubject([
    new Track({}),
  ]);
  public tracks$: Observable<Track[]> = from(this.tracks);

  searchTypes: string[] = ['Track', 'Artist', 'Album'];
  private searchInputs: BehaviorSubject<SearchInputs> = new BehaviorSubject({
    searchTerm: '',
    searchType: this.searchTypes[0],
  });
  public searchInputs$: Observable<SearchInputs> = from(this.searchInputs).pipe(
    // filter((value: SearchInputs) => value.searchTerm.length != 0 || value.searchType.length != 0),
    tap(() => console.log('SearchInputs$ used..'))
  );

  private currentRoutePath: Subject<string> = new Subject();
  public currentRoutePath$: Observable<string> = from(this.currentRoutePath);

  private playedTrack: BehaviorSubject<Track> = new BehaviorSubject(null);
  public playedTrack$: Observable<Track> = from(this.playedTrack).pipe(
    filter((value: Track) => value != null),
  );

  private selectedTrack: BehaviorSubject<Track> = new BehaviorSubject<Track>(null);
  public selectedTrack$: Observable<Track> = from(this.selectedTrack).pipe(
    // filter((value: Track) => value != null),
    tap(() => console.log('selectedTrack$ used..'))
  );
  private selectedArtist: BehaviorSubject<Artist> = new BehaviorSubject<Artist>(null);
  public selectedArtist$: Observable<Artist> = from(this.selectedArtist).pipe(
    // filter((value: Track) => value != null),
    tap(() => console.log('selectedArtist$ used..'))
  );

  private modalOpened: Subject<boolean> = new Subject();
  public modalOpened$: Observable<boolean> = from(this.modalOpened);

  subscriptions: Subscription[] = [];

  count: number = 0;

  emitTracks(value: Track[]) {
    this.tracks.next(value);
  }

  emitSearchInputs(value: SearchInputs) {
    this.searchInputs.next(value);
  }

  emitCurrentRoutePath(value: string) {
    this.currentRoutePath.next(value);
  }

  emitPlayedTrack(value: Track) {
    this.playedTrack.next(value);
  }

  emitSelectedTrack(value: Track) {
    console.log('emitted track: ', value);
    this.selectedTrack.next(value);
  }
  emitSelectedArtist(value: Artist) {
    console.log('emitted artist: ', value);
    this.selectedArtist.next(value);
  }

  emitModalOpened(value: boolean) {
    this.modalOpened.next(value);
  }

}
