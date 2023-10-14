import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Track } from 'src/app/models/track.model';
import { StateManager } from 'src/app/services/state-manager.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
})
export class TrackComponent implements OnInit, AfterViewInit {

  @Input() track: Track = new Track({});
  @Output() currentTrack: EventEmitter<Track> = new EventEmitter();

  @Input('loading') loading: boolean;

  constructor(private stateManager: StateManager) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onPreview() {
    this.track.isPreviewVisible = true;
    this.stateManager.emitPlayedTrack(this.track);
    console.log('played track emitted from track component: ', this.track);
  }

  onViewArtist(event: Event) {
    event.stopPropagation();
    console.log('view artsit triggered: ', this.track.title);
    this.stateManager.emitSelectedTrack(this.track);
    this.stateManager.emitModalOpened(true);
  }


  // getArtists() {
  //   const artists = this.track.artists;
  //   let formattedArtists: string = '';
  //   for (let i = 0; i < artists.length; i++) {
  //     if (i == artists.length) {
  //       formattedArtists += artists[i].name;
  //     } else {
  //       formattedArtists += artists[i].name + ' & ';
  //     }
  //   }
  //
  //   return formattedArtists;
  // }

  formatArtist(artistName: string, index: number) {
    const artistsCount = this.track.artists.length;
    if (artistsCount <= 3) return artistName;
    if (index == 3) return 'And Others...';
    else return '';
  }
}
