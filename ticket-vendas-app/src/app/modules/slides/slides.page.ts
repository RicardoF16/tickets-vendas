import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesComponent implements OnInit {

  @Input() listImages: Array<string>;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    loop: true
  };

  constructor() { }

  ngOnInit() {
  }

}
