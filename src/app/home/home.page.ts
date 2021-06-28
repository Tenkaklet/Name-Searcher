import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  sentence: any;
  constructor(private router: Router) {}

  getChange(e) {
    const searchable = e;
    console.log(searchable);
    if (searchable === '') {
      return;
    }

    this.router.navigateByUrl('results/' + searchable);
  }

}
