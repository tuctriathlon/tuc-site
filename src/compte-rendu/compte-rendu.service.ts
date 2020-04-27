import { Injectable } from '@angular/core';
import {DirectusService} from '../shared/directus.service';
import {CompteRenduModel} from './compte-rendu.model';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {concatMap, map, tap} from 'rxjs/operators';
import {DirectusFileService} from '../shared/directus-file.service';

@Injectable({
  providedIn: 'root'
})
export class CompteRenduService extends DirectusService<CompteRenduModel> {

  constructor(httpCLient: HttpClient,
              private directusFileService: DirectusFileService) {
    super(httpCLient, CompteRenduModel, 'compte_rendu');
  }

  /**
   * load item
   * @param id item id
   * @param full load all dependencies
   */
  getById(id: number, full = false): Observable<CompteRenduModel> {
    return super.getById(id, full).pipe(
      concatMap(cr => {
        if (cr.image && full) {
          return this.loadFile(cr, 'image');
        } else {
          return of(cr);
        }
      })
    );
  }

  /**
   * laod all item
   * @param full load all dependencies
   */
  getAll(full: boolean = false): Observable<CompteRenduModel[]> {
    return super.getAll(full).pipe(
      concatMap(crs => {
        const crsWithImage = crs.filter(cr => cr.image && full);
        const crsWithoutImage = crs.filter(cr => !cr.image || !full);
        return forkJoin([...crsWithImage.map(cr => this.loadFile(cr, 'image')), ...crsWithoutImage.map(cr => of(cr))]).pipe(
          tap(list => console.log(list))
        );
      })
    );
  }

  loadFile(object: CompteRenduModel, key: string): Observable<CompteRenduModel> {
    return this.directusFileService.getById(object[key]).pipe(
      map(file => {
        object[`${key}File`] = file;
        return object;
      })
    );
  }
}
