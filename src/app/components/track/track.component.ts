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
import {Artist} from "../../models/artist.model";

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
    if (this.track.previewUrl?.length != 0){
      this.stateManager.emitPlayedTrack(this.track);
      console.log('played track emitted from track component: ', this.track);
    }
  }

  onViewArtist(event: Event, artist: Artist) {
    event.stopPropagation();
    console.log('view artist triggered: ', artist);
    this.stateManager.emitSelectedArtist(artist);
    this.stateManager.emitModalOpened(true);
  }
  onViewTrack(event: Event) {
    event.stopPropagation();
    console.log('view artist triggered: ', this.track.title);
    this.stateManager.emitSelectedTrack(this.track);
    this.stateManager.emitModalOpened(true);
  }

}
