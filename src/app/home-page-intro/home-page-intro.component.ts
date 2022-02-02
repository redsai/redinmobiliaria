import { Component, OnInit } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';

@Component({
  selector: 'app-home-page-intro',
  templateUrl: './home-page-intro.component.html',
  styleUrls: ['./home-page-intro.component.scss']
})
export class HomePageIntroComponent implements OnInit {

  //new WOW().init();
  constructor() { 
    new WOW().init();
  }

  ngOnInit(): void {
  }

}
