import {ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SizeProp} from '@fortawesome/fontawesome-svg-core';
import {BehaviorSubject, catchError, delay, filter, Observable, of, share, switchMap, tap} from 'rxjs';
import {SpotifyService} from 'src/app/services/spotify.service';
import {StateManager} from '../../services/state-manager.service';

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent implements OnInit, OnDestroy {

  items$: Observable<any> = this.getItems();
  elementToRender$ = new BehaviorSubject<string>('');

  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<boolean>(false);
  welcoming$ = new BehaviorSubject<boolean>(false);

  loadingSpinnerSize: SizeProp = 'xl';

  constructor(
    private spotifyService: SpotifyService,
    private stateManager: StateManager,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  @HostBinding('style.overflow')
  get overflow() {
    return 'hidden';
  }

  ngOnInit(): void {
    this.emitCurrentRoutePath();
  }

  /*
   *
   * Get search inputs emitted from the search inputs component.
   * If search inputs were valid => use them in a new observable to get the items (switchMap).
   * Else => return to the welcoming page
   *
   */
  getItems() {
    return this.stateManager.searchInputs$.pipe(
        switchMap(value => {
          if (!value.searchTerm || !value.searchType) {
            this.router.navigate(['welcoming']);
            return of(null);
          }
          else {
            // Use the search inputs(searchTerm, searchType) in async req
            // to get the items (tracks, artists or albums...) according to searchType
            return this.spotifyService
                .search(value.searchType.toLowerCase(), value.searchTerm).pipe(
                    catchError(err => {
                      if (err.status === 401) this.onError();
                      return of(null)
                    }),
                    filter(value => value != null),
                    tap(() => this.onSearchBegin()),
                    delay(1000),
                    tap(() => {
                      this.elementToRender$.next(value.searchType.toLowerCase());
                      this.onItemsFetched();
                    }),
                )
          }
        }),
    )
  }

  onItemsFetched() {
    this.loading$.next(false);
    this.welcoming$.next(false);
    this.error$.next(false);
  }

  onSearchBegin() {
    this.elementToRender$.next('');
    this.loading$.next(true);
    this.welcoming$.next(false);
    this.error$.next(false);
  }

  onError() {
    this.error$.next(true);
    this.loading$.next(false);
    this.welcoming$.next(false);
  }

  onRefresh(){
    this.error$.next(false);
    this.items$ = this.getItems();
  }


  emitCurrentRoutePath() {
    let currentPath = this.activatedRoute.snapshot.url[0].path;
    this.stateManager.emitCurrentRoutePath(currentPath);
  }

  ngOnDestroy(): void {}
}
