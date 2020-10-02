import {DirectusItemModel} from './directusItem.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {map, pluck} from 'rxjs/operators';

export abstract class DirectusService<T extends DirectusItemModel> {
  protected resourceName: string;
  protected resourceList: T[];
  protected constructor(protected http: HttpClient,
                        protected ctor: new(props: Partial<T>) => T,
                        resourceName: string) {
    this.resourceName = resourceName;
    this.resourceList = [];
  }

  get baseUrl(): string {
    return [environment.directusUrl, environment.directusProject, 'items',  this.resourceName].join('/');
  }

  /**
   * retrieve all data
   */
  getAll(full = false, options?: {sort?: string[]}): Observable<T[]> {
    let params = new HttpParams();
    if (options.sort) {
      params = params.append('sort', '-date');
    }
    return this.getList(this.baseUrl, {params});
  }

  /**
   * retreive item by Id
   * @param id the item Id
   * @param full load dependencies
   */
  getById(id: number, full = false): Observable<T> {
    return this.http.get(this.baseUrl + '/' + id).pipe(
      pluck('data'),
      map<any, T>(data => this.toSingleModel(data))
    );
  }

  /**
   * create a new item
   * @param item the item to create
   */
  addItem(item: T): Observable<T> {
    return this.post(this.baseUrl, item);
  }

  /**
   * update item
   * @param item the item to update
   */
  updateItem(id: number, item: Partial<T>): Observable<T> {
    return this.http.patch<T>(this.baseUrl + '/' + id, item).pipe(pluck('data'));
  }

  /**
   * delete item
   * @param id the id of the item to delete
   */
  deleteItem(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  protected get(url: string, options = {}): Observable<T> {
    return this.http.get<T>(url, options).pipe(
      pluck('data'),
      map<any[], T[]>(data => this.toArrayModel(data)),
      pluck('0')
    );
  }

  /**
   * send request and create a list of instances
   * @param url api
   * @param options cf directus documentation
   */
  protected getList(url: string, options = {}): Observable<T[]> {
    return this.http.get<T>(url, options).pipe(
      pluck('data'),
      map<any[], T[]>(data => this.toArrayModel(data))
    );
  }

  /**
   * send post request and create instance of Item
   * @param url api
   * @param body content
   */
  protected post(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body).pipe(
      pluck('data'),
      map<any, T>(data => this.toSingleModel(data))
    );
  }

  /**
   * return a T instance from data
   * @param data any
   */
  protected toSingleModel(data: Partial<T>): T {
    const t = new this.ctor(data);
    t.updateFromData(data);
    return t;
  }

  /**
   * return an array of T instances from data
   * @param data any
   */
  protected toArrayModel(data: any[]): T[] {
    return data.map(d => this.toSingleModel(d));
  }

  /**
   * build directus filters query params
   * @param field field to apply filter on
   * @param operator available values eq | gt | lt
   * @param value accepted value
   */
  protected buildFilterParams(field: string, operator: string, value: string) {
    return [`filter[${field}][${operator}]`, value];
  }
}
