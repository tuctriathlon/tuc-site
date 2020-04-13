import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {PageService} from '../page.service';
import {Observable} from 'rxjs';
import {PageModel} from '../page.model';
import {concatAll, map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {DirectusFileModel} from '../directusFile.model';
import {DirectusFileService} from '../directus-file.service';
import {DirectusPageContentDirective} from './directus-page-content.directive';
import {DirectusPageButtonBarDirective} from './directus-page-button-bar.directive';

@Component({
  selector: 'app-directus-page',
  templateUrl: './directus-page.component.html',
  styleUrls: ['./directus-page.component.css']
})
export class DirectusPageComponent implements OnInit {
  @Input() url: null | string = null;
  @ContentChild(DirectusPageContentDirective, { static: true, read: TemplateRef }) pageContentTpl: TemplateRef<any>;
  @ContentChild(DirectusPageButtonBarDirective, { static: true, read: TemplateRef }) pageButtonBarTpl: TemplateRef<any>;
  paramUrl: string;
  page$: Observable<PageModel>;
  pageImage$: Observable<DirectusFileModel>;
  constructor(private pageService: PageService,
              private fileService: DirectusFileService,
              private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.page$ = this.route.paramMap.pipe(
      map(params => {
        if (params.has('url')) {
          this.paramUrl = params.get('url');
        }
        return this.pageService.getByUrl(this.url || this.paramUrl);
      }),
      concatAll()
    );
    this.pageImage$ = this.page$.pipe(
      map(page => {
        if (page.image) {
          return this.fileService.getById(page.image);
        }
      }),
      concatAll()
    );
  }
}
