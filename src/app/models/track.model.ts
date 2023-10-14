import { Artist } from "./artist.model";

export class Track {
  id: string;
  title: string;
  artists: Artist[];
  cover: string;
  previewUrl: string;
  isPreviewVisible: boolean;

  constructor(obj: any){
    this.id = obj.id || null;
    this.title = obj.title || null;
    this.artists = obj.artists || null;
    this.cover = obj.cover || null;
    this.previewUrl = obj.previewUrl || null;
    this.isPreviewVisible = obj.isPreviewVisible || null;
  }

}
