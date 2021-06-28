import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionSheetController, AlertController, ToastController} from '@ionic/angular';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  results: any;
  result: string;
  relatedWords: any;
  firstLetter: any;
  adjectives: any;
  words: Array<string> = [];
  selected: boolean;
  word: any;

  constructor(private api: ApiService, private route: ActivatedRoute, private actSheet: ActionSheetController,
              private toast: ToastController, private alertCtrl: AlertController,
              private router: Router) {}


  ngOnInit() {
    this.route.params.subscribe(res => {
      this.api.getSimilar(res.results).subscribe(result => {
        this.result = res.results;
        this.getRelatedWords(this.result);
        this.getAdjectives(this.result);
        this.firstLetter = this.result.substring(0, 1).toUpperCase();
        this.results = result;
      });
    });
    this.getStorage();

  }

  getRelatedWords(word: any) {
    this.api.relatedSpelling(word).subscribe(res => {
      this.relatedWords = res;
    });
  }

  getAdjectives(word: string) {
    this.api.adjectives(word).subscribe(res => {
      this.adjectives = res;

    });
  }
  async presentActionSheet(word: string) {
    const actionSheet = await this.actSheet.create({
      header: 'Add name ' + word,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Save',
        icon: 'bookmark-outline',
        handler: () => {
          this.presentToast(word);
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }
  chooseName(name: string) {
    this.presentActionSheet(name);

  }

  async presentToast(word: string) {
    const toast = await this.toast.create({
      message: word + ' has been saved.',
      duration: 2500
    });
    toast.present();
    this.words.push(word);
    Storage.set({key: 'names', value: JSON.stringify(this.words)}).then(() => {
      console.log('saved Item ', this.words);
      if(this.words.length === 3) {
        this.presentAlertConfirm();
      }
    }).catch(err => {
      console.log(err);
    });
  }
  getStorage() {
    Storage.get({key: 'names'}).then((data: any) => this.getStorageOutput(JSON.parse(data.value)), error => console.log('error' , error));
  }

  getStorageOutput(data) {
    console.log('data', data);
    if (data === null) {
      this.selected = true;
    } else {
      this.words = data;
      console.log('the words', this.words);
      Storage.get({key: 'names'}).then((res: any) => {
        const numOfWords = JSON.parse(res);
        if(numOfWords.length >= 3) {
          this.presentAlertConfirm();
          this.words = data;
        }
      });
    }


  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Ready?',
      animated: true,
      message: 'Are you satisfied with your words?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.router.navigateByUrl('/search');
          }
        }
      ]
    });

    await alert.present();
  }

  removeWord(word: any) {
    console.log('word', word);
    for (let i = 0; i < this.words.length; i++) {
      if(this.words[i] === word) {
        this.words.splice(i, 1);
      }
    }

    Storage.set({key: 'names', value: JSON.stringify(this.words)});
  }

}
