import { Component, Input } from '@angular/core';

@Component({
  selector: 'skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.css']
})
export class SkeletonLoaderComponent {

  @Input() loading: boolean;
  @Input() width: number;
  @Input() height: number;
}
