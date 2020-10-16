import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable, of} from 'rxjs';
import {PageModel} from './directus-page/page.model';
import {concatMap, map, pluck, switchMap, tap} from 'rxjs/operators';
import {CardModel} from './card/card.model';
import {DirectusFileModel} from './directusFiles/directusFile.model';
import {assign, get} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private cardFields: any[];
  private pageFields: any[];
  constructor(private httpClient: HttpClient) {
    this.cardFields = [];
    this.pageFields = [];
  }

  get baseUrl() {
    return [environment.directusUrl, environment.directusProject].join('/');
  }

  urlBuilder(pathParts: string[]): string {
    return [this.baseUrl, ...pathParts].join('/');
  }

  /**
   * return all data
   * @param resourceName directus table name;
   */
  getAll(resourceName: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/items/${resourceName}`);
  }

  /**
   * create a page from the directus collections response
   * @param resourceName table name
   */
  loadResourceListPage(resourceName: string): Observable<PageModel> {
    return this.httpClient.get(`${this.baseUrl}/collections/${resourceName}`).pipe(
      pluck('data'),
      map<any, PageModel>(data => new PageModel({
        title: data.collection.replace('_', ' '),
        description: data.note || ''
      }))
    );
  }

  loadItemPage(resourceName: string, id: number): Observable<PageModel> {
    let converter;
    let pageFields;
    let fileFields = [];
    return this.getPageConverter(resourceName).pipe(
      switchMap(c => {
        converter = c;
        return this.getFieldsToDisplay(resourceName);
      }),
      switchMap((fields) => {
        pageFields = fields;
        fileFields = pageFields.filter(f => f.type === 'file');
        const params = new HttpParams().append('fields', ['*', ...fileFields.map(f => f.field + '.*')].join(','));
        return this.httpClient.get(`${this.baseUrl}/items/${resourceName}/${id}`, {params});
      }),
      pluck('data'),
      map<any, PageModel>(data => {
        const fields = Object.values(converter.fields).map(value => {
          const fieldRequired = pageFields.find(f => this.getFieldsName(value)[0] === f.field);
          if (fieldRequired) {
            return {
              value: fieldRequired.type === 'file' ? data[fieldRequired.field] : this.replaceByContent(value.toString(), data),
              name: fieldRequired.field,
              type: fieldRequired.type
            };
          } else {
            return {
              value,
              name: value,
              type: 'string'
            };
          }

        });
        return new PageModel({
          title: this.replaceByContent(converter.title, data),
          description: this.replaceByContent(converter.description, data),
          files: fileFields.map(file => new DirectusFileModel(data[file.field])),
          fields
        });
      })
    );
  }

  /**
   * load data in card format
   * @param resourceName table name
   */
  loadCards(resourceName: string): Observable<CardModel[]> {
    return this.getCardConverter(resourceName).pipe(
      switchMap((converter) => {
        const fields = this.getFilterFields(resourceName);
        let params = new HttpParams()
          .append('fields', fields.join(','));
        if (converter.sort) {
          params = params.append('sort', converter.sort);
        }
        return this.httpClient.get<any[]>(`${this.baseUrl}/items/${resourceName}`, {params});
      }),
      pluck('data'),
      map<any[], any[]>(data => {
        // si une des propriete est un tableau on duplique l'element pour afficher chaque clé
        const result = [];
        data.forEach(d => {
          if (Object.keys(d).some(key => Array.isArray(d[key]))) {
            Object.keys(d).forEach(key => {
              if (Array.isArray(d[key])) {
                d[key].forEach(v => {
                  result.push(Object.assign({...d}, {[key]: v}));
                });
              }
            });
          } else {
            result.push(d);
          }
        });
        return result;
      }),
      tap(data => console.log(data)),
      map<any[], CardModel[]>(data => data.map(d => {
        return this.toCard(resourceName, d);
      }))
    );
  }

  getCardConverter(resourceName: string): Observable<any> {
    if (this.cardFields.findIndex(f => f.table === resourceName) >= 0) {
      return of(this.cardFields.find(f => f.table === resourceName));
    } else {
      const params = new HttpParams().append('filter[table]', resourceName);
      return this.httpClient.get<any>(`${this.baseUrl}/items/item_to_card`, {params}).pipe(
        pluck('data'),
        map(data => {
          this.cardFields.push(data[0]);
          return data[0];
        })
      );
    }
  }

  getPageConverter(resourceName: string): Observable<any> {
    if (this.pageFields.findIndex(f => f.table === resourceName) >= 0) {
      return of(this.pageFields.find(f => f.table === resourceName));
    } else {
      const params = new HttpParams().append('filter[table]', resourceName);
      return this.httpClient.get<any>(`${this.baseUrl}/items/item_to_page`, {params}).pipe(
        pluck('data'),
        map(data => {
          this.pageFields.push(data[0]);
          return data[0];
        })
      );
    }
  }

  getResourceFields(resourceName: string): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlBuilder(['fields', resourceName])).pipe(
      pluck('data')
    );
  }

  /**
   * convert item to card
   * @param resourceName item resource name
   * @param item to convert
   */
  toCard(resourceName: string, item: any): CardModel {
    const converter = this.cardFields.find(f => f.table === resourceName);
    const card = new CardModel({
      title: this.replaceByContent(converter.title, item),
      subtitleLeft: this.replaceByContent(converter.subtitleleft, item),
      subtitleRight: this.replaceByContent(converter.subtitleright, item),
      icon: this.replaceByContent(converter.icon, item),
      image: get(item, this.getFieldsName(converter.image)[0])?.data.full_url,
      content: this.replaceByContent(converter.content, item),
      routerLink: ['/', 'page', resourceName, item.id]
    });
    return card;
  }

  /**
   * replace all {{key}} by the item key value
   * ex str: hello {{name}}
   * item: {name: 'Francis'}
   * return hello Francis
   * @param str initial string
   * @param item to ge value from
   */
  replaceByContent(str: string, item: any): string {
    let value = str || '';
    const fields = value.match(/{{[\w_.]*}}/g) || [];
    fields.forEach(field => {
      value = value.replace(field, get(item, field.replace(/{|}/g, '')) || '');
    });
    return value;
  }

  /**
   * return the filter fields value to retrieve data
   * @param resourceName item table name
   */
  getFilterFields(resourceName: string): string[] {
    const converter = this.cardFields.find(f => f.table === resourceName);
    const fieldList = ['id'];
    fieldList.push(...this.getFieldsName(converter.title));
    fieldList.push(...this.getFieldsName(converter.subtitleright));
    fieldList.push(...this.getFieldsName(converter.subtitleleft));
    fieldList.push(...this.getFieldsName(converter.content));
    fieldList.push(...this.getFieldsName(converter.icon));
    fieldList.push(this.getFieldsName(converter.image)[0] + '.*');
    return fieldList;
  }

  /**
   * find all {{field}} elements and return the list of them
   * @param str string to evaluate
   */
  getFieldsName(str): string[] {
    if (! str) {
      return [];
    }
    return (str.match(/{{2}[\w_.\*]*}{2}/g) || []).map(f => f.replace(/{{2}|}{2}/g, ''));
  }

  getFieldsToDisplay(resourceName: string): Observable<any[]> {
    let converter;
    return this.getPageConverter(resourceName).pipe(
      switchMap(c => {
        converter = c;
        return this.getResourceFields(resourceName);
      }),
      map(fields => {
        const pageFields = this.getFieldsName(JSON.stringify(converter.fields));
        return fields.filter(field => pageFields.some(f => f === field.field));
      })
    );
  }
}
