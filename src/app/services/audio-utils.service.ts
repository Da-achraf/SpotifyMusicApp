import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioUtilsService {

  constructor() { }

  calculatePlayBackWidth(audio: HTMLAudioElement) {
    audio.ontimeupdate = () => {

    }
  }
}
