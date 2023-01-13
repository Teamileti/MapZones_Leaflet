
import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from "chart.js";
import {ZonesDisplayService} from "../zones-display.service";
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  // zonesData: any;
  // labelData: any[] = [];
  //indexPerRegion: any = [];
  info: any[] = [];
  indexColor: any[] = [];
 displayedData: any;

  constructor(private zonesService: ZonesDisplayService) {
  }

  decideColor(index: number, i: number): void {
    if (index >= 0 && index < 0.1) {
      this.indexColor[i] = '#00008B';
    } else if (index >= 0.1 && index < 0.2) {
      this.indexColor[i] = '#0000FF';
    // } else if (index >= 0.1 && index < 0.2) {
    //   this.indexColor[i] = '#CD5C5C';
    } else if (index >= 0.2 && index < 0.3) {
      this.indexColor[i] = '#6495ED';
    } else if (index >= 0.3 && index < 0.4) {
      this.indexColor[i] = '#00BFFF';
    } else if (index >= 0.4 && index < 0.5) {
      this.indexColor[i] = '#00CED1';
    } else if (index >= 0.5 && index < 0.6) {
      this.indexColor[i] = '#8FBC8F';
    } else if (index >= 0.6 && index < 0.7) {
      this.indexColor[i] =  '#98FB98';
    } else if (index >= 0.7 && index < 0.8) {
      this.indexColor[i] = '#2E8B57';
    } else if (index >= 0.8 && index < 0.9) {
      this.indexColor[i] = '#6B8E23';
    } else {
      this.indexColor[i] = '#808000';
    }
}

  ngOnInit(): void {

    // this.zonesService.getZones().subscribe((result: any) => {
    //   this.zonesData = result;
    //   //console.log(result)
    //   if (this.zonesData.features != null) {
    //     //console.log(this.zonesData.features);
    //     for (let i = 0; i < this.zonesData.features.length; i++) {
    //       this.labelData.push(this.zonesData.features[i].properties.County);
    //       //this.indexData.push(this.zonesData.features[i].properties.SV_Index2);
    //     }
    //     this.labelData.forEach( (element, index ) => {
    //       if (this.countries.indexOf(this.labelData[index]) === -1){
    //         this.countries.push(this.labelData[index]);
    //       }
    //     })
    //     // for (let i=0; i< this.labelData.length; i++){
    //     //   if (this.countries.indexOf(this.labelData[i]) === -1){
    //     //     this.countries.push(this.labelData[i]);
    //     //   }
    //     // }
    //   }
    //   for (let i =0; i<this.countries.length; i++) {
    //     let region = this.countries[i];
    //     console.log(region)
    //     let sumIndexes = 0;
    //     let count = 0;
    //     let medIndex = 0;
    //     for (let j = 0; j < this.zonesData.features.length; j++) {
    //       console.log(this.zonesData.features[j].properties.County);
    //       if (this.zonesData.features[j].properties.County == region) {
    //         sumIndexes = sumIndexes + this.zonesData.features[j].properties.SV_Index2;
    //         console.log(sumIndexes)
    //         count = count + 1;
    //         medIndex = sumIndexes / count;
    //         this.decideColor(medIndex, i);
    //       }
    //       //console.log('index of region ' + this.zonesData.features[i].properties.County + 'is ' + medIndex)
    //       this.indexPerRegion[i] = medIndex;
    //     }
    //   }
    //   console.log(this.countries)
    //   console.log(this.indexPerRegion)
    //   console.log(this.indexColor)
    // });
    this.displayedData = this.zonesService.clickedZoneData;
    this.info.push(this.displayedData.Prcnt_U18);
    this.info.push(this.displayedData.Prcnt_65O);
    this.info.push(this.displayedData.Prcnt_HHBM);
    this.info.push(this.displayedData.Prcnt_Lng);
    this.info.push(this.displayedData.Prcnt_Rent);
    this.info.push(this.displayedData.Prcnt_NoCa);

    this.createChart(this.info, "pie", "piechart");
    this.createChart(this.info, "bar", "barchart");
  }

  createChart(labelData: any, type: any, id: any){
    new Chart(id, {
      type: type,
      data: {
        labels: ['Prcnt_U18', 'Prcnt_65O', 'Prcnt_HHBM' , 'Prcnt_Lng', 'Prcnt_Rent', 'Prcnt_NoCa'],
        datasets: [{
          label: 'Main Info per Region: ' + this.displayedData.Region,
          data: this.info,
          backgroundColor: '#8FBC8F',
        }]
      }
    });
  }

}
