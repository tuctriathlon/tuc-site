import { Injectable } from '@angular/core';
import {DirectusService} from '../directus.service';
import {HttpClient} from '@angular/common/http';
import {DirectusFileModel} from './directusFile.model';
import {environment} from '../../environments/environment';

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
}
