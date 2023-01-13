import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {ZonesDisplayService} from "../zones-display.service";
import {map, Subject, interval, Subscription, takeUntil, take, takeWhile} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent implements AfterViewInit, OnDestroy{

  private map: any;
  zonesLayer:any;
  notifier = new Subject();

  private initMap(): void {
    this.map = L.map('map', {
      center: [40.7128, -74.0060],
      zoom: 8
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href=" ">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  constructor(private zonesService: ZonesDisplayService, private router: Router) {}

  private displayZones(){
    this.zonesService.getZones().pipe(takeUntil(this.notifier))
      .subscribe(
        (response: any) =>
        {
          this.zonesLayer = response;
          this.buildLayers();
        }
      )
  }


  private displayLegend(){

    let legend = new L.Control({position: 'bottomright'});
    legend.onAdd = function (map) {

      let div = L.DomUtil.create('div', 'legend');
      let labels = ['<strong>SV Indexes</strong>'];
      let indexes = ['0-0.1', '0.1-0.2', '0.2-0.3', '0.3-0.4', '0.4-0.5', '0.5-0.6', '0.6-0.7', '0.7-0.8', '0.8-0.9', '0.9-1'];
      let colors = ['#00008B', '#0000FF', '#6495ED', '#00BFFF', '#00CED1', '#8FBC8F', '#98FB98', '#2E8B57', '#6B8E23', '#2E8B57', '#6B8E23', '#808000' ];
      let style = ['<style> ' +
      '' +
      '.legend {\n' +
      '  padding: 6px 8px;\n' +
      '  font: 14px Arial, Helvetica, sans-serif;\n' +
      '  background: white;\n' +
      '  background: rgba(255, 255, 255, 0.8);\n' +
      '  line-height: 24px;\n' +
      '  color: #555;\n' +
      '}' +
      ' </style>'];


      for (let i = 0; i < indexes.length; i++) {

        div.innerHTML +=
          labels.push(
            '<span class="circle" style="background:' + (colors[i]) + '"><mat-icon>O</mat-icon></span> ' +
            (indexes[i] ? indexes[i] : '+'));
      }
      div.innerHTML = labels.join('<br>') + style;
      return div;
    };
    legend.addTo(this.map);
  }


  private buildLayers(): any {

    const specificZoneData = (e: any) => {
      this.zonesService.clickedZoneData = e.target.feature.properties;
    }

    const onEachFeature = (feature: any, layer: any) => {
      let content = "<b>State:</b>" + feature.properties.State + "<br>"
        + "<b>Country:</b>" + feature.properties.County + "<br>"
        + "<b>Region:</b>" + feature.properties.Region + "<br>"
        + "<b>Pop_T:</b>" + feature.properties.Pop_T + "<br>"
        + "<b>PopDense:</b>" + feature.properties.PopDense + "<br>"
        + "<b>Prcnt_U18:</b>" + feature.properties.Prcnt_U18 + "<br>"
        + "<b>Under18:</b>" + feature.properties.Under18 + "<br>"
        + "<b>Prcnt_65O:</b>" + feature.properties.Prcnt_65O + "<br>"
        + "<b>Over65:</b>" + feature.properties.Over65 + "<br>"
        + "<b>Prcnt_HHBM:</b>" + feature.properties.Prcnt_HHBM + "<br>"
        + "<b>HH_Below50:</b>" + feature.properties.HH_Below50 + "<br>"
        + "<b>Prcnt_Lng:</b>" + feature.properties.Prcnt_Lng + "<br>"
        + "<b>PoorEng:</b>" + feature.properties.PoorEng + "<br>"
        + "<b>Non_white:</b>" + feature.properties.Non_white + "<br>"
        + "<b>Occ_HU:</b>" + feature.properties.Occ_HU + "<br>"
        + "<b>HU:</b>" + feature.properties.HU + "<br>"
        + "<b>Prcnt_Rent:</b>" + feature.properties.Prcnt_Rent + "<br>"
        + "<b>SV_Index2:</b>" + feature.properties.SV_Index2 + "<br><br>"
        + "<button id= 'chartBtn'  mat-button routerLink='/chart' >View Chart</button>" + "<br><br>";



      let customOptions =
        {
          width: '400',
          maxHeight: '250',
          maxWidth: '400',
        }


      if (feature.properties) {
        layer.bindPopup(content, customOptions);
        layer.on({
          mouseover: function over(e: any) {
            (e.target).setStyle({
              color: '#FF7F50',
              weight: 5,
              opacity: 0.5
            })
            layer.bindTooltip(feature.properties.State + '<br>' + feature.properties.County);
            layer.openTooltip();
          },
          mouseout: function over(e: any) {
            e.target.setStyle(setColor(feature))
            layer.unbindTooltip();
            layer.closeTooltip();
          },
          click: function(e: any){
            specificZoneData(e);
          }
        })
      }
    }

    function setColor(feature: any) {
      let index = feature.properties.SV_Index2;
      if (index >= 0 && index < 0.1) {
        return {color: '#00008B', weight: 2,
          opacity: 0.5}
      } else if (index >= 0.1 && index < 0.2) {
        return {color: '#0000FF',weight: 2,
          opacity: 0.5}
      } else if (index >= 0.2 && index < 0.3) {
        return {color: '#6495ED',weight: 2,
          opacity: 0.5}
      } else if (index >= 0.3 && index < 0.4) {
        return {color: '#00BFFF',weight: 2,
          opacity: 0.5}
      } else if (index >= 0.4 && index < 0.5) {
        return {color: '#00CED1',weight: 2,
          opacity: 0.5}
      } else if (index >= 0.5 && index < 0.6) {
        return {color: '#8FBC8F',weight: 2,
          opacity: 0.5}
      } else if (index >= 0.6 && index < 0.7) {
        return {color: '#98FB98',weight: 2,
          opacity: 0.5}
      } else if (index >= 0.7 && index < 0.8) {
        return {color: '#2E8B57',weight: 2,
          opacity: 0.5}
      } else if (index >= 0.8 && index < 0.9) {
        return {color: '#6B8E23',weight: 2,
          opacity: 0.5}
      } else  {
        return {color: '#808000',weight: 2,
          opacity: 0.5}
      }
    }

    L.geoJSON(this.zonesLayer.features, {
      onEachFeature: onEachFeature,
      style: setColor,

    }).addTo(this.map);
  }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    let id = event.target.id;
    if (id == 'chartBtn') {
      this.openChart();
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.displayZones();
    this.displayLegend();
  }

  ngOnDestroy(): void {
   this.notifier.next('');
   this.notifier.complete();
  }

  private openChart() {
    this.router.navigate(["/chart"]);
  }
}
