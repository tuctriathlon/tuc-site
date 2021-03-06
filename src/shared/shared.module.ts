import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SortByPipe} from './sort-by.pipe';
import {DirectusPageComponent} from './directus-page/directus-page.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SafeHtmlPipe} from './safe-html.pipe';
import {DirectusPageContentDirective} from './directus-page/directus-page-content.directive';
import {DirectusPageButtonBarDirective} from './directus-page/directus-page-button-bar.directive';
import {CardComponent} from './card/card.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderService} from './loader.service';
import {LoaderInterceptor} from './loader.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {FieldComponent} from './field/field.component';
import {MapComponent} from './map/map.component';
import {IsUrlPipe} from './is-url.pipe';
import {MatChipsModule} from '@angular/material/chips';
import {CardFilterPipe} from './card/cardFilterPipe';
import {YouTubePlayerModule} from '@angular/youtube-player';

@NgModule({
  declarations: [
    SortByPipe,
    DirectusPageComponent,
    SafeHtmlPipe,
    DirectusPageContentDirective,
    DirectusPageButtonBarDirective,
    CardComponent,
    FieldComponent,
    MapComponent,
    IsUrlPipe,
    CardFilterPipe
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  exports: [
    SortByPipe,
    SafeHtmlPipe,
    IsUrlPipe,
    CardFilterPipe,
    DirectusPageComponent,
    DirectusPageContentDirective,
    DirectusPageButtonBarDirective,
    CardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatChipsModule,
    YouTubePlayerModule
  ]
})
export class SharedModule { }
