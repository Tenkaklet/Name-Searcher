import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ResultsPageRoutingModule } from './results-routing.module';

import { ResultsPage } from './results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ResultsPage]
})
export class ResultsPageModule {}
