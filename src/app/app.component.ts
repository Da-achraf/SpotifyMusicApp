import {
  Component, DoCheck,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {filter, Observable, of, switchMap, tap} from 'rxjs';
import { Track } from './models/track.model';
import { StateManager } from './services/state-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy, DoCheck{
  ngDoCheck(): void {
    console.log('Do Check from App component..');
  }
  @ViewChild('modalOverlay', { read: ElementRef })
  modalOverlay: ElementRef<HTMLElement>;
  @ViewChild('content', { read: ElementRef }) content: ElementRef<HTMLElement>;

  selectedTrack$: Observable<Track> = this.stateManager.selectedTrack$
  showTrack$ = this.stateManager.playedTrack$

  constructor(private stateManager: StateManager)
  {
    console.log('App component constructed');
  }

  ngOnDestroy(): void {
    console.log('App component destroyed');
  }
}
