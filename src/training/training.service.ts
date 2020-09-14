import { Injectable } from '@angular/core';
import {DirectusService} from '../shared/directus.service';
import {TrainingModel} from './training.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {environment} from '../environments/environment';
import {map, pluck, tap} from 'rxjs/operators';

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
      map<any[], TrainingModel[]>( items => {
        return items.map(item => {
          const heureDebut = (item.description || item.summary || '').match(/\d\dh\d\d/i);
          const duree = (item.description || '').match(/\d?\d:\d\d:\d\d/i);
          const training = new TrainingModel();
          const debut  = moment(item.start.date);
          if (heureDebut && heureDebut.length) {
            debut.add(heureDebut[0].split('h')[0], 'hours').add(heureDebut[0].split('h')[1], 'minutes');
          }
          const fin  = debut.clone();
          if (duree && duree.length) {
            fin.add(duree[0].split(':')[0], 'hour').add(duree[0].split(':')[1], 'minutes');
          }
          training.start = debut.toISOString(true);
          training.end = moment(training.start).toISOString(true);
          training.description = (item.description || '').replace(/Commentaire :[\w\sêéèëàäâïîôöüûù,-]*$/i, '');
          training.title = item.summary;
          training.type = training.typeFromString(item.description);
          return training;
        });
        //return this.toArrayModel(data);
      })
    );
  }

  getIcalEvents(url: string): Observable<any> {
    return this.httpClient.get(url).pipe(
      tap(_ => console.log('ics'))
    );
  }
}
