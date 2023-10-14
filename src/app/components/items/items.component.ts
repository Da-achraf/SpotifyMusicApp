import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import {catchError, delay, Observable, of, Subscription, switchMap, tap} from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';
import { StateManager } from '../../services/state-manager.service';
@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit, OnDestroy {
  items: any[] = [];
  elementToRender: string = '';

  loading: boolean = false;
  error: boolean = false;
  welcoming: boolean = true;

  // isModalOpened: boolean = false;

  loadingSpinnerSize: SizeProp = 'xl';

  items$: Observable<any> = this.getSearchInputs();

  subscriptions: Subscription[] = [];
  count: number = 0;
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
   * If search inputs were valid => Launch the search.
   * Else => return to the welcoming page
   *
   */
  getSearchInputs() {
    return this.stateManager.searchInputs$.pipe(
        switchMap(value => {
          if (!value.searchTerm || !value.searchType) {
            this.router.navigate(['welcoming']);
            return of(null);
          }
          else {
            console.log(value);
            return this.spotifyService
                .search(value.searchType.toLowerCase(), value.searchTerm).pipe(
                    catchError((err, caught) => {
                      if (err.status != 401){
                        this.onError();
                        return of(null)
                      }
                      else return caught
                    }),
                    tap(() => this.onSearchBegin()),
                    delay(700),
                    tap(() => this.elementToRender = value.searchType.toLowerCase()),
                    tap(() => this.onItemsFetched()),
                )
          }
        }),
        tap(value => console.log(value))
    )
  }

  onItemsFetched() {
    this.loading = false;
    this.welcoming = false;
    this.error = false;
  }

  onSearchBegin() {
    this.elementToRender = '';
    this.loading = true;
    this.welcoming = false;
    this.error = false;
  }

  onError() {
    this.error = true;
    this.loading = false;
    this.welcoming = false;
  }

  emitCurrentRoutePath() {
    let currentPath = this.activatedRoute.snapshot.url[0].path;
    this.stateManager.emitCurrentRoutePath(currentPath);
  }

  onModalOpened() {
    let isModalOpened = false;
    this.stateManager.modalOpened$.subscribe((value: boolean) => {
      isModalOpened = value;
    });
    return isModalOpened;
  }

  unSubscribe() {
    this.subscriptions.forEach((item: Subscription) => item.unsubscribe());
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }
}
