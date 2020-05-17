import { Injectable } from '@angular/core';
import {DirectusService} from '../shared/directus.service';
import {TrainingModel} from './training.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {environment} from '../environments/environment';
import {map, pluck} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService extends DirectusService<TrainingModel> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, TrainingModel, 'training');
  }

  getByDate(date: moment.Moment): Observable<TrainingModel[]> {
    const filterParam = this.buildFilterParams('date', 'eq', date.format('YYYY-MM-DD'));
    const params = new HttpParams().append(filterParam[0], filterParam[1]);
    return this.getList(this.baseUrl, {params});
  }

  getGoogleEvents(from: moment.Moment, to: moment.Moment): Observable<any> {
    const key = environment.googleApiKey;
    const maxResults = 20;
    const calendarId = encodeURIComponent(environment.googleCalendarTrainingId);
    return this.httpClient.get(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?` +
    `key=${key}&maxResults=${maxResults}&singleEvents=true&timeMin=${encodeURIComponent(from.format())}` +
    `&timeMax=${encodeURIComponent(to.format())}`).pipe(
      pluck('items'),
      map<any[], TrainingModel[]>( data => this.toArrayModel(data))
    );
  }
}
