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

  getArtists(artists: Artist[]) {
    return  artists.map((artist: Artist) => artist.name).join(' & ')
  }

  buildArtistObject(item: any): Artist{
    return new Artist({
      id: item.id,
      name: item.name,
      image: item.images.length != 0 ? item.images[0].url : '',
      followers: item.followers.total,
      genres: item.genres,
      popularity: item.popularity,
    })
  }

  buildTrackObject(item: any): Track{
    return new Track({
      id: item.id,
      title: item.name,
      artists: item.artists.map((artist: any) => {
        return new Artist({
          id: artist.id,
          name: artist.name,
        });
      }),
      cover:
          item.album.images.length != 0 ? item.album.images[0].url : '',
      previewUrl: item.preview_url,
    })
  }
}
