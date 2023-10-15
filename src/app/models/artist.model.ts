export class Artist {
  id: string;
  name: string;
  image: string;
  followers: number;
  genres: string[];
  popularity: number

  constructor(obj: any){
    this.id = obj.id;
    this.name = obj.name;
    this.image = obj.image;
    this.followers = obj.followers;
    this.genres = obj.genres;
    this.popularity = obj.popularity;
  }

}
