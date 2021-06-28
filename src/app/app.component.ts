import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    // Storage.remove({key: 'names'});
  }


}
