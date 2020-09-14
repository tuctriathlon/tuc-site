import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {pluck, tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParametresSiteService {
  _googleApiKey: string;
  _calendrier: string;
  constructor(private http: HttpClient) {
    this.loadParameters()
  }

  get directusUrl() {
    return environment.directusUrl
  }

  get directusProject() {
    return environment.directusProject
  }

  get googleApiKey() {
    return this._googleApiKey
  }

  get calendrier() {
    return this._calendrier
  }

  loadParameters():Observable<any> {
    return this.http.get(`${this.directusUrl}/${this.directusProject}/items/parametres_site/1`).pipe(
      pluck('data'),
      tap((params: any) => {
        this._googleApiKey = params.googleApiKey;
        this._calendrier = params.calendrier_dynamique;
      })
    );
  }
}
