import { Injectable } from '@angular/core';
import {DirectusService} from '../directus.service';
import {PageModel} from './page.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {forkJoin, merge, Observable, of} from 'rxjs';
import {DirectusFileModel} from '../directusFiles/directusFile.model';
import {environment} from '../../environments/environment';
import {last, map, mergeAll, pluck, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageService extends DirectusService<PageModel> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, PageModel, 'page');
  }

  getByUrl(url: string): Observable<PageModel> {
    const params = new HttpParams().append('filter[url]', url)
      .append('fields', '*,image.*,files.directus_files_id.*,resources.item_to_card_id.table');
    if (url) {
      return this.get(this.baseUrl, {params}).pipe(
        map(data => {
          return data;
        }),
        switchMap(data => this.loadResourceTraduction(data))
      );
    } else {
      return of(new PageModel());
    }
  }

  loadResourceTraduction(page: PageModel): Observable<PageModel> {
    const url = [environment.directusUrl, environment.directusProject, 'collections'].join('/');
    const queries = page.resources.map((r, index) => this.httpClient.get<any>(`${url}/${r.name}`).pipe(
      pluck('data'),
      map(col => {
        page.resources[index].traduction = col.translation ? col.translation.find(t => t.local = 'fr-Fr').translation : '';
        return page;
      })
    ));
    return merge(...queries).pipe(
      last()
    );
  }

  /**
   * return all page which don't have parent page
   */
  getRootPages(): Observable<PageModel[]> {
    const params = new HttpParams().set('filter[parent][null]', null);
    return this.getList(this.baseUrl, {params});
  }

  /**
   * return child page for submenu
   * @param parentId parent page id
   */
  getChildren(parentId: number): Observable<PageModel[]> {
    if (parentId) {
      const params = new HttpParams().set('filter[parent]', parentId.toString());
      return this.getList(this.baseUrl, {params});
    } else {
      return of([]);
    }
  }

  getPageFiles(pageId: number): Observable<DirectusFileModel[]> {
    const url = [environment.directusUrl, environment.directusProject, 'items', 'page_directus_files'].join('/');
    const params = new HttpParams().append('fields[0]', 'id')
      .append('fields[1]', 'directus_files_id.*')
      .append('filter[page_id]', pageId.toString());
    return this.httpClient.get<DirectusFileModel>(url, {params}).pipe(
      pluck('data'),
      map<any[], DirectusFileModel[]>(data => data.map(d => {
        const file = new DirectusFileModel();
        file.updateFromData(d.directus_files_id);
        return file;
      }))
    );
  }
}
