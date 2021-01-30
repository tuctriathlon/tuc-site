import { Injectable } from '@angular/core';
import {DirectusService} from '../directus.service';
import {HttpClient} from '@angular/common/http';
import {DirectusFileModel} from './directusFile.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map, pluck} from 'rxjs/operators';

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

  createFile(url: string, tags?: string[]): Observable<DirectusFileModel> {
    return this.http.post(`${this.baseUrl}`, {url, tags}).pipe(
      pluck('data'),
      map<any, DirectusFileModel>(file => this.toSingleModel(file))
    );
  }
}
