import {
  ChangeDetectionStrategy,
  Component, DoCheck,
  HostBinding,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {SizeProp} from '@fortawesome/fontawesome-svg-core';
import {faCirclePause, faCirclePlay, IconDefinition,} from '@fortawesome/free-solid-svg-icons';
import {
  BehaviorSubject,
  delay,
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
import {UtilsService} from "../../../services/utils.service";

const AUDIO_DURATION: number = 29.753469;

@Component({
  selector: 'audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AudioPlayerComponent implements OnInit, OnDestroy, OnChanges, DoCheck {
  @HostBinding('style.width.px')
  get _width(){
    return this.width
  }

  track: Track = new Track({});
  audio: HTMLAudioElement = new Audio();

  currentPlayed$:Observable<Track> = <Observable<Track>> this.test();

  width: number = 300;
  playBackWidth: number = 0;
  currentTime: number = 0;

  loading$ = new BehaviorSubject<boolean>(false);

  faIcon: IconDefinition = faCirclePlay;
  size: SizeProp = '2x';

  audioTime$: Observable<number>;

  subs: Map<string, Subscription> = new Map();


  test(){
    return this.stateManager
      .playedTrack$
      .pipe(
        startWith(new Track({})),
        pairwise(),
        switchMap(value => {
          return (value[0]?.id === value[1]?.id) ? of(null) : of(value[1])
        }),
        filter(value => value != null),
        tap(value => this.onNewPlayedTrackReceived(value)),
        tap(() => this.loading$.next(true)),
        delay(700),
        tap(() => this.loading$.next(false)),
        tap(() => console.log('playedTrack$ used..')),
        share()
      )
  }

  constructor(private stateManager: StateManager, private utils: UtilsService) {}

  ngDoCheck(): void {
    console.log('Do Check from audio component..');
  }

  ngOnInit(): void {
      // this.test()
      // let sub: Subscription;
      // sub = this.stateManager
      //           .playedTrack$
      //           .subscribe(async (playedTrack: Track) => {
      //             if (playedTrack.id)
      //               await this.onNewPlayedTrackReceived(playedTrack);
      //           });
      // this.subs.set('playedTrack', sub);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('on changes...');
  }

  async onNewPlayedTrackReceived(playedTrack: Track) {
    this.track = playedTrack;
    this.audio.pause();
    if (this.subs.has('audioTime')) this.unSubscribe('audioTime');
    this.audio = new Audio(playedTrack.previewUrl);
    await this.playAudio();
  }

  async playAudio() {
    await this.audio.play();
    this.faIcon = faCirclePause;
    this.updatePlayBack();
  }

  updatePlayBack() {
    this.calculatePlayBack()
  }

  calculatePlayBack(){
    let sub: Subscription;
    this.audioTime$ = interval(500)
    sub = this.audioTime$
              .subscribe(val => {
                this.playBackWidth = (this.audio.currentTime * this.width) / AUDIO_DURATION
                if (this.audio.currentTime >= AUDIO_DURATION) this.endAudio()
              })
    this.subs.set('audioTime', sub);
  }

  onPaused() {
    this.pauseAudio();
  }

  endAudio() {
    this.audio.currentTime = AUDIO_DURATION;
    this.audio.pause();
    this.playBackWidth = 0;
    this.unSubscribe('audioTime');
    this.faIcon = faCirclePlay;
  }

  toggleAudio() {
    this.audio.paused ? this.playAudio() : this.onPaused();
  }

  pauseAudio() {
    this.unSubscribe('audioTime');
    this.audio.pause();
    this.faIcon = faCirclePlay;
  }

  unSubscribe(key: string) {
    this.subs.get(key).unsubscribe();
  }

  getArtists(){
    return this.utils.getArtists(this.track);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
