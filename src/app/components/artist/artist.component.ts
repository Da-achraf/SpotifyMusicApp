import {Component, Input, OnInit} from '@angular/core';
import { Artist } from 'src/app/models/artist.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit{

  @Input()
  artist: Artist = new Artist({});

  loading: boolean = true;

  ngOnInit(): void {
    console.log('artist: ', this.artist);
    setTimeout(()=> {
      this.loading = false;
      console.log('Loading', this.loading)
    }, 1500)
  }
}
