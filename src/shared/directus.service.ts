import {DirectusItemModel} from './directusItem.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {map, pluck} from 'rxjs/operators';

export abstract class DirectusService<T extends DirectusItemModel> {
  protected resourceName: string;
  protected resourceList: T[];
  protected constructor(protected http: HttpClient,
                        protected tctr: () => T,
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
  getAll(): Observable<T[]> {
    return this.getList(this.baseUrl);
  }

  /**
   * retreive item by Id
   * @param id the item Id
   */
  getById(id: number): Observable<T> {
    return this.get(this.baseUrl + '/' + id);
  }

  /**
   * create a new item
   * @param item the item to create
   */
  addItem(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item).pipe(pluck('data'));
  }

  /**
   * update item
   * @param item the item to update
   */
  updateItem(item: T): Observable<T> {
    return this.http.patch<T>(this.baseUrl + '/' + item.id, item).pipe(pluck('data'));
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
      map<any, T>(this.toSingleModel)
    );
  }

  protected getList(url: string, options = {}): Observable<T[]> {
    return this.http.get<T>(url, options).pipe(
      pluck('data'),
      map<any[], T[]>(data => this.toArrayModel(data))
    );
  }

  /**
   * return a T instance from data
   * @param data any
   */
  private toSingleModel(data: any): T {
    const t = this.tctr();
    t.updateFromData(data);
    return t;
  }

  /**
   * return an array of T instances from data
   * @param data any
   */
  private toArrayModel(data: any[]): T[] {
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
