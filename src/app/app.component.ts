import {
  Component, DoCheck,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {filter, map, Observable, of, switchMap, tap} from 'rxjs';
import { Track } from './models/track.model';
import { StateManager } from './services/state-manager.service';
import {Artist} from "./models/artist.model";
import {SpotifyService} from "./services/spotify.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy, DoCheck{
  ngDoCheck(): void {
    // console.log('Do Check from App component..');
  }
  @ViewChild('modalOverlay', { read: ElementRef })
  modalOverlay: ElementRef<HTMLElement>;
  @ViewChild('content', { read: ElementRef }) content: ElementRef<HTMLElement>;

  selectedTrack$: Observable<Track> = this.stateManager.selectedTrack$;
  selectedArtist$: Observable<Artist> = this.stateManager.selectedArtist$.pipe(
    map((value: Artist) => value.id),
    switchMap((id: string) => this.spotifyService.getArtistById(id))
  );
  modalOpened$: Observable<boolean> = this.stateManager.modalOpened$;

  showTrack$ = this.stateManager.playedTrack$.pipe(
    switchMap((value: Track) => of(value.id != null))
  )

  constructor(private stateManager: StateManager, private spotifyService: SpotifyService)
  {
    console.log('App component constructed');
  }

  ngOnDestroy(): void {
    console.log('App component destroyed');
  }
}
