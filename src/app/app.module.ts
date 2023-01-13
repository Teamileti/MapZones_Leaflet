import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZonesComponent } from './zones/zones.component';
import {ZonesDisplayService} from "./zones-display.service";
import {HttpClientModule} from "@angular/common/http";
import { ChartComponent } from './chart/chart.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    ZonesComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [ZonesDisplayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
