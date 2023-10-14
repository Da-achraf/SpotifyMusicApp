import {Injectable} from '@angular/core';
import {Artist} from '../models/artist.model';
import {Track} from "../models/track.model";

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  // Sort searched artists
  sortArtists(artists: Artist[], searchTerm: string): Artist[] {
    return [...artists].sort(
        (a, b) =>
            this.getSimilarity(searchTerm, a.name) -
            this.getSimilarity(searchTerm, b.name)
    );
  }

  private getSimilarity(searchTerm: string, artistName: string): number {
    return new Intl.Collator().compare(searchTerm, artistName);
  }

  objsEqualInValue(obj1: any, obj2: any) {
    const keys = Object.keys(obj1);
    for (const key of keys) if (obj1[key] !== obj2[key]) return false;
    return true;
  }

  getArtists(track: Track) {
    const artists = track.artists;
    let formattedArtists: string = '';
    for (let i = 0; i < artists.length; i++) {
      if (i == artists.length) {
        formattedArtists += artists[i].name;
      } else {
        formattedArtists += artists[i].name + ' & ';
      }
    }

    return formattedArtists;
  }
}
