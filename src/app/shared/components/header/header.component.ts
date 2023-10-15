import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild,} from '@angular/core';
import {faArrowLeft, faHome} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('headerContainer', { read: ElementRef })
  headerContainer: ElementRef<HTMLElement>;

  @ViewChild('home', { read: ElementRef })
  home: ElementRef<HTMLElement>;

  @ViewChild('back', { read: ElementRef })
  back: ElementRef<HTMLElement>;

  // Icons
  faHome = faHome;
  faArrowLeft = faArrowLeft;

  ngAfterViewInit(): void {
    // this.headerContentPositioningOnScroll();

    this.home.nativeElement.addEventListener('click', (event) =>
      this.homeClicked()
    );

    this.back.nativeElement.addEventListener('click', (event) =>
      this.backClicked()
    );
  }

  // headerContentPositioningOnScroll() {
  //   window.addEventListener('scroll', (event) => {
  //     const scrollY = window.scrollY;
  //     if (scrollY > 15) {
  //       this.headerContainer.nativeElement.classList.remove('max-w-[70rem]');
  //       this.headerContainer.nativeElement.style.maxWidth = '100%';
  //     } else {
  //       this.headerContainer.nativeElement.style.maxWidth = '70rem';
  //     }
  //   });
  // }

  homeClicked() {
    this.home.nativeElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
      this.home.nativeElement.style.transform = 'scale(1)';
    }, 200);
  }

  backClicked() {
    this.back.nativeElement.style.transform = 'scaleX(1.2) translateX(-.7rem)';
    setTimeout(() => {
      this.back.nativeElement.style.transform = 'scaleX(1) translateX(0)';
    }, 200);
  }
}
