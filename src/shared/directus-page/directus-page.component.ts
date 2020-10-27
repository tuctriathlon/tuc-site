import {Component, ContentChild, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {PageService} from './page.service';
import {Observable, of, Subscription} from 'rxjs';
import {PageModel} from './page.model';
import {concatMap, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {DirectusFileService} from '../directusFiles/directus-file.service';
import {DirectusPageContentDirective} from './directus-page-content.directive';
import {DirectusPageButtonBarDirective} from './directus-page-button-bar.directive';
import {LoaderService} from '../loader.service';
import {ResourceService} from '../resource.service';
import {CardModel} from '../card/card.model';
import {Location} from '@angular/common';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-directus-page',
  templateUrl: './directus-page.component.html',
  styleUrls: ['./directus-page.component.css']
})
export class DirectusPageComponent implements OnInit, OnDestroy {
  @Input() url: null | string = null;
  @Input() fullWidth = false;
  @Input() page: null | PageModel = null;
  @Input() resource: string | null = null;
  @ContentChild(DirectusPageContentDirective, { static: true, read: TemplateRef }) pageContentTpl: TemplateRef<any>;
  @ContentChild(DirectusPageButtonBarDirective, { static: true, read: TemplateRef }) pageButtonBarTpl: TemplateRef<any>;
  paramUrl: string;
  loading = false;
  id: number;
  fullScreen = false;
  page$: Observable<PageModel>;
  childPage$: Observable<PageModel[]>;
  cards$: Observable<CardModel[]>;
  fields$: Observable<any[]>;
  queryParams: any = {};
  filters: string[] | number[] = [];
  selectedFilter: string | number | null = null;
  subscriptions: Subscription[];
  constructor(private pageService: PageService,
              private fileService: DirectusFileService,
              private loaderService: LoaderService,
              private resourceService: ResourceService,
              private route: ActivatedRoute,
              public location: Location,
              private authService: AuthService) {
    this.subscriptions = [];
    this.subscriptions.push(this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    }));
  }

  ngOnInit(): void {
    this.subscriptions.push(this.authService.onLogin.subscribe(() => {
      this.ngOnInit();
    }));
    this.loading = true;
    this.route.queryParamMap.subscribe(params => {
      if (params.has('embedded')) {
        this.fullScreen = true;
        this.queryParams.token = params.get('embedded');
      }
      if (params.has('token')) {
        this.queryParams.token = params.get('token');
      }
    });
    this.route.paramMap.pipe(
      tap(params => {
        if (params.has('resourceName')) {
          this.resource = params.get('resourceName');
        }
        if (params.has('url')) {
          this.paramUrl = params.get('url');
        }
        if (params.has('id')) {
          this.id = parseInt(params.get('id'), 10);
        }
      })
    ).subscribe(() => {
      if (this.page) {
        this.page$ = of(this.page);
        this.loading = false;
      } else if (this.resource && this.id) {
        this.page$ = this.resourceService.loadItemPage(this.resource, this.id);
        this.fields$ = this.resourceService.getFieldsToDisplay(this.resource);
      } else if (this.resource) {
        this.page$ = this.resourceService.loadResourceListPage(this.resource);
        this.cards$ = this.resourceService.loadCards(this.resource).pipe(
          tap(cards => this.filters = cards.map(c => c.filter)
              .filter((f, i, self) => self.indexOf(f) === i && f))
        );
      } else {
        this.loadPage();
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  /**
   * load page from directus database
   */
  loadPage() {
    this.page$ = this.route.paramMap.pipe(
      // get page name from url
      tap(params => {
        if (params.has('url')) {
          this.paramUrl = params.get('url');
        }
      }),
      // load page content
      concatMap(() => this.pageService.getByUrl(this.url || this.paramUrl)),
      tap(page => this.childPage$ = this.pageService.getChildren(page.id))
    );
  }

  loadContent() {
    if (this.resource) {
      return this.resourceService.getAll(this.resource);
    } else {
      return of([]);
    }
  }
}
