import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ZonesDisplayService {

  clickedZoneData : any;

  constructor(private http: HttpClient) { }

  getZones(): any{
    return this.http.get<any>('https://data-beta-nyc-files.s3.amazonaws.com/resources/a532598e-7313-4c7e-a9d0-e0804b527bb3/cf01eccd73eb44d796458277b4737103geojsonsocialvulnerabilityindexcensustracts.geojson?Signature=m14HMuh9G0qxPmCJu9iiIPcqK5M%3D&Expires=1673521577&AWSAccessKeyId=AKIAWM5UKMRH2KITC3QA',
      {responseType: 'json'});
  }
}
