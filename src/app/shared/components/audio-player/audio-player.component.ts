import {
  ChangeDetectionStrategy,
  Component, DoCheck,
  HostBinding,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import {SizeProp} from '@fortawesome/fontawesome-svg-core';
import {faCirclePause, faCirclePlay, IconDefinition,} from '@fortawesome/free-solid-svg-icons';
import {
  BehaviorSubject,
  filter,
  interval,
  Observable,
  of,
  pairwise,
  share,
  startWith,
  Subscription,
  switchMap,
  tap
} from 'rxjs';
import {Track} from 'src/app/models/track.model';
import {StateManager} from '../../../services/state-manager.service';

const AUDIO_DURATION: number = 29.753469;

@Component({
  selector: 'audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnDestroy, OnChanges, DoCheck {
  @HostBinding('style.width.px')
  get _width(){
    return this.width
  }

  audio: HTMLAudioElement = new Audio();

  localPlayedTrack: Track = new Track({id: 0});

  width: number = 300;
  playBackWidth: number = 0;

  faIcon: IconDefinition = faCirclePlay;
  size: SizeProp = '2x';

  currentPlayedTrack$:Observable<Track> = <Observable<Track>> this.getCurrentPlayedTrack();
  audioTime$: Observable<number>;
  loading$ = new BehaviorSubject<boolean>(false);

  subs: Map<string, Subscription> = new Map();

  constructor(private stateManager: StateManager){}

  getCurrentPlayedTrack(){
    return this.stateManager
      .playedTrack$
      .pipe(
        startWith(new Track({})),
        pairwise(),
        switchMap(value => {
          return ((value[0]?.id === value[1]?.id)) && this.localPlayedTrack ? of(null) : of(value[1])
        }),
        filter(value => value != null),
        tap(value => this.onNewTrackReceived(value)),
        tap((value) => this.localPlayedTrack = value),
        tap(() => console.log('playedTrack$ used..')),
        share()
      )
  }

  ngDoCheck(): void {
    // console.log('Do Check from audio component..');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('on changes...');
  }

  async onNewTrackReceived(playedTrack: Track) {
    this.audio.pause();
    if (this.subs.has('audioTime')) this.unSubscribe('audioTime');
    this.audio = new Audio(playedTrack.previewUrl);
    await this.playAudio();
  }

  async playAudio() {
    await this.audio.play();
    this.calculatePlayBack();
    this.faIcon = faCirclePause;
  }

  calculatePlayBack(){
    let sub: Subscription;
    this.audioTime$ = interval(1000)
    sub = this.audioTime$
              .subscribe(() => {
                this.playBackWidth = (this.audio.currentTime * this.width) / AUDIO_DURATION
                if (this.audio.currentTime >= AUDIO_DURATION) this.endAudio()
              })
    this.subs.set('audioTime', sub);
  }

  endAudio() {
    this.audio.currentTime = AUDIO_DURATION;
    this.audio.pause();
    this.playBackWidth = 0;
    this.unSubscribe('audioTime');
    this.localPlayedTrack = null
    this.faIcon = faCirclePlay;
  }

  toggleAudio() {
    this.audio.paused ? this.playAudio() : this.pauseAudio();
  }

  pauseAudio() {
    this.unSubscribe('audioTime');
    this.audio.pause();
    this.localPlayedTrack = null
    this.faIcon = faCirclePlay;
  }

  unSubscribe(key: string) {
    this.subs.get(key).unsubscribe();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
