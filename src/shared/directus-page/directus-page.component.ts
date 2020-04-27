import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {PageService} from '../page.service';
import {Observable, of} from 'rxjs';
import {PageModel} from './page.model';
import {concatMap, map, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {DirectusFileService} from '../directus-file.service';
import {DirectusPageContentDirective} from './directus-page-content.directive';
import {DirectusPageButtonBarDirective} from './directus-page-button-bar.directive';
import {LoaderService} from '../loader.service';

@Component({
  selector: 'app-directus-page',
  templateUrl: './directus-page.component.html',
  styleUrls: ['./directus-page.component.css']
})
export class DirectusPageComponent implements OnInit {
  @Input() url: null | string = null;
  @Input() fullWidth = false;
  @Input() page: null | PageModel = null;
  @ContentChild(DirectusPageContentDirective, { static: true, read: TemplateRef }) pageContentTpl: TemplateRef<any>;
  @ContentChild(DirectusPageButtonBarDirective, { static: true, read: TemplateRef }) pageButtonBarTpl: TemplateRef<any>;
  paramUrl: string;
  loading = false;
  page$: Observable<PageModel>;
  constructor(private pageService: PageService,
              private fileService: DirectusFileService,
              private loaderService: LoaderService,
              private route: ActivatedRoute) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }

  ngOnInit(): void {
    this.loading = true;
    if (this.page) {
      this.page$ = of(this.page);
    } else {
      this.loadPage();
    }
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
      concatMap((page) => {
        // if page has image load file
        if (page.image) {
          return this.fileService.getById(page.image).pipe(
            map(image => {
              page.imageFile = image;
              return page;
            })
          );
        } else {
          return of(page);
        }
      })
    );
  }
}
