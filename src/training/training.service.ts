import { Injectable } from '@angular/core';
import {DirectusService} from '../shared/directus.service';
import {TrainingModel} from './training.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService extends DirectusService<TrainingModel> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, () => new TrainingModel(), 'training');
  }

  getByDate(date: moment.Moment): Observable<TrainingModel[]> {
    const filterParam = this.buildFilterParams('date_de_la_seance', 'eq', date.format('YYYY-MM-DD'));
    const params = new HttpParams().append(filterParam[0], filterParam[1]);
    return this.getList(this.baseUrl, {params});
  }
}
