import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DirectusService} from '../../shared/directus.service';
import {ParametresSite} from '../models/parametresSite.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParametresSiteService extends DirectusService<ParametresSite> {
  private parametres: ParametresSite;
  constructor(public http: HttpClient) {
    super(http, ParametresSite, 'parametres_site');
  }

  get googleApiKey() {
    return this.parametres.googleApiKey;
  }

  get calendrier() {
    return this.parametres.calendrier;
  }

  initService(): Promise<ParametresSite> {
    return this.getById(1).pipe(
      tap(params => {
      this.parametres = params;
    })
    ).toPromise();
  }

}
