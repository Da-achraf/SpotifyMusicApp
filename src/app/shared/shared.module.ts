import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ModalComponent } from './components/modal/modal.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ScrollTextDirective } from './directives/scroll-text.directive';

@NgModule({
  declarations: [
    SkeletonLoaderComponent,
    LoadingSpinnerComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    TruncatePipe,
    ModalComponent,
    AudioPlayerComponent,
    ScrollTextDirective,
  ],
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  exports: [
    SkeletonLoaderComponent,
    LoadingSpinnerComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    TruncatePipe,
    ModalComponent,
    AudioPlayerComponent,
  ],
})
export class SharedModule {}
