import { Injectable } from '@angular/core';
import {DirectusService} from "../../shared/directus.service";
import {ParametreInscrptionModel} from "../models/parametreInscrption.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParametreInscritpionService extends DirectusService<ParametreInscrptionModel> {

  constructor(protected http: HttpClient) {
    super(http, ParametreInscrptionModel,  'parametres_inscription');
  }
}
