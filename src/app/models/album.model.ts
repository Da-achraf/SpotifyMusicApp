import { Artist } from "./artist.model";

export class Album {
  id: string;
  title: string;
  type: string;
  artists: Artist[];
  totalTracks: number;
  cover: string;

  constructor(obj: any){
    this.id = obj.id;
    this.title = obj.title;
    this.type = obj.type;
    this.artists = obj.artists;
    this.totalTracks = obj.totalTracks;
    this.cover = obj.cover;
  }

}
