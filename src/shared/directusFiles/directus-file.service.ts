import { Injectable } from '@angular/core';
import {DirectusService} from '../directus.service';
import {HttpClient} from '@angular/common/http';
import {DirectusFileModel} from './directusFile.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map, pluck} from 'rxjs/operators';
import {Form} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DirectusFileService extends DirectusService<DirectusFileModel> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, DirectusFileModel, 'files');
  }

  get baseUrl(): string {
    return [environment.directusUrl, environment.directusProject, this.resourceName].join('/');
  }

  addItem(item: DirectusFileModel): Observable<DirectusFileModel> {
    throw new Error('not implemented');
  }

  createFile(data: FormData): Observable<DirectusFileModel> {
    return this.http.post(`${this.baseUrl}`, data).pipe(
      pluck('data'),
      map<any, DirectusFileModel>(file => this.toSingleModel(file))
    );
  }
}
