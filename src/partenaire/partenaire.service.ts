import { Injectable } from '@angular/core';
import {DirectusService} from '../shared/directus.service';
import {PartenaireModel} from './partenaire.model';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {CompteRenduModel} from '../compte-rendu/compte-rendu.model';
import {concatMap, map, tap} from 'rxjs/operators';
import {DirectusFileService} from '../shared/directusFiles/directus-file.service';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService extends DirectusService<PartenaireModel> {

  constructor(http: HttpClient,
              private directusFileService: DirectusFileService) {
    super(http, PartenaireModel, 'partenaire');
  }

  /**
   * laod all item
   * @param full load all dependencies
   */
  getAll(full: boolean = false): Observable<PartenaireModel[]> {
    return super.getAll(full).pipe(
      concatMap((partenaires: PartenaireModel[]) => {
        const partenairesWithLogo = partenaires.filter(partenaire => partenaire.logo && full);
        const partenairesWithoutlogo = partenaires.filter(partenaire => !partenaire.logo || !full);
        return forkJoin([
          ...partenairesWithLogo.map(partenaire => this.loadFile(partenaire, 'logo')),
          ...partenairesWithoutlogo.map(partenaire => of(partenaire))
        ]);
      })
    );
  }

  loadFile(object: PartenaireModel, key: string): Observable<PartenaireModel> {
    return this.directusFileService.getById(object[key]).pipe(
      map(file => {
        object[`${key}File`] = file;
        return object;
      })
    );
  }
}
