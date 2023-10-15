import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ModalComponent } from './components/modal/modal.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { ScrollTextDirective } from './directives/scroll-text.directive';
import { FormatArtistsPipe } from './pipes/format-artists.pipe';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpRequestInterceptor} from "./interceptors/http-request.interceptor";

@NgModule({
  declarations: [
    SkeletonLoaderComponent,
    LoadingSpinnerComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    AudioPlayerComponent,
    ScrollTextDirective,
    FormatArtistsPipe,
  ],
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  exports: [
    SkeletonLoaderComponent,
    LoadingSpinnerComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    AudioPlayerComponent
  ],
  providers : [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ]
})
export class SharedModule {}
