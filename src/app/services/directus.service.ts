import {DirectusItemModel} from '../models/directusItem.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {pluck} from 'rxjs/operators';

export abstract class DirectusService<T extends DirectusItemModel> {
  protected resourceName: string;
  protected resourceList: T[];
  protected constructor(protected http: HttpClient, resourceName: string) {
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
    return this.http.get<T[]>(this.baseUrl).pipe(pluck('data'));
  }

  /**
   * retreive item by Id
   * @param id the item Id
   */
  getById(id: number): Observable<T> {
    return this.http.get<T>(this.baseUrl + '/' + id).pipe(pluck('data'));
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
  }}
