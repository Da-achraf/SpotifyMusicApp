import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {StateManager} from 'src/app/services/state-manager.service';
import {UtilsService} from 'src/app/services/utils.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @ViewChild('searchInputContainer') searchInputContainer:
    | ElementRef
    | undefined;

  searchTypes: string[] = ['Track', 'Artist', 'Album'];
  searchInputs: SearchInputs;

  initialSearchInputs: SearchInputs;

  isDropDownOpened: boolean = false;

  subscriptions: Subscription[] = [];
  count: number = 0;

  constructor(
      private stateManager: StateManager,
      private router: Router,
      private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.initialSearchInputsSetup();
  }

  initialSearchInputsSetup() {
    this.subscriptions[this.count++] =
        this.stateManager.searchInputs$
                          .subscribe((value: SearchInputs) => {
                            this.searchInputs = value;
                          })

    this.initialSearchInputs = { ...this.searchInputs };
  }

  onEmitSearchInputs() {
    if (this.utils.objsEqualInValue(this.searchInputs, this.initialSearchInputs)) return
    if (this.searchInputs.searchTerm.length === 0) return

    this.stateManager.emitSearchInputs(this.searchInputs);
    this.initialSearchInputs = { ...this.searchInputs };
  }

  onNavigateToSelectedTypePage() {
    if (this.searchInputs.searchTerm.length === 0) return;
    const url = 'items';
    this.router.navigate([url]);
  }

  onSelectSearchType(type: string) {
    this.searchInputs.searchType = type;
    if (this.searchInputs.searchTerm.length != 0) this.onEmitSearchInputs();
  }

  onToggleDropDown(event) {
    event.stopPropagation();
    this.isDropDownOpened = !this.isDropDownOpened;
  }

  @HostListener('document:click', ['$event'])
  handleGlobalClick(event: MouseEvent) {
    console.log('Document clicked')
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.classList.contains('dropdown')) {
      if (this.isDropDownOpened) this.isDropDownOpened = false;
    }
  }

  get currentRoutePath(): string {
    let currentPath: string = '';

    this.stateManager.currentRoutePath$.subscribe((value: string) => {
      currentPath = value;
    });

    return currentPath;
  }

  ngOnDestroy(): void {
    console.log('SearchInputComponent OnDestroy');
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}

export interface SearchInputs {
  searchTerm: string;
  searchType: string;
}
