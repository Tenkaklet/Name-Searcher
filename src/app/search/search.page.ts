import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';
import {ApiService} from '../api.service';
import { Storage } from '@capacitor/storage';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  keywords: string;
  availableDomains: any[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private api: ApiService,
    private alertCtrl: AlertController
  ) {}


  ngOnInit() {
    Storage.get({key: 'names'}).then((res: any) => {
      this.keywords = JSON.parse(res.value);
      this.searchDomains(this.keywords);
    });
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: 'dots',
      message: 'Please wait...',
      duration: 2000,
    });
    await loading.present();
  }

  searchDomains(keywords: string) {
    this.api.searchDomains(keywords)
      .subscribe((s: any) => {
        const results = s.results;
        this.checkAvailability(results);
      });
  }

  checkAvailability(sites: any) {
    this.availableDomains = sites;
    sites.map((element) => {
      this.api.checkAvailability(element.domain).subscribe((is: any) => {
        const availability = is.status[0];
        this.availableDomains.push(availability);
      });
    });
  }

  async choose(domain) {
    const alert = await this.alertCtrl.create({
      header: domain.domain,
      animated: true,
      message: 'Would you like to continue with this domain?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            Browser.open({url: domain.registerURL});
          }
        }
      ]
    });

    await alert.present();
  }
}
