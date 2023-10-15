import { Pipe, PipeTransform } from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {Artist} from "../../models/artist.model";

@Pipe({
  name: 'formatArtists'
})
export class FormatArtistsPipe implements PipeTransform {

  constructor(private utils: UtilsService) {}

  transform(value: Artist[], ...args: unknown[]): string {
    return this.utils.getArtists(value);
  }

}
