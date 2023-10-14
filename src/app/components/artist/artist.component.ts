import { StateManager } from 'src/app/services/state-manager.service';
import { Component, Input } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {

  @Input()
  artist: Artist = new Artist({});

  loading: boolean = true;
  renderImage: boolean = false;

  ngOnInit(): void {
    if (this.artist) {
      setTimeout(()=> {
        this.loading = !this.loading;
      }, 1500)
    }

  }
}
