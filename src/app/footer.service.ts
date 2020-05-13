import { Injectable } from '@angular/core';
import {DirectusService} from '../shared/directus.service';
import {FooterModel} from './models/Footer.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FooterService extends DirectusService<FooterModel> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, FooterModel, 'footer');
  }
}
