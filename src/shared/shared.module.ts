import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortByPipe } from './sort-by.pipe';
import { DirectusPageComponent } from './directus-page/directus-page.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { SafeHtmlPipe } from './safe-html.pipe';
import { DirectusPageContentDirective } from './directus-page/directus-page-content.directive';
import { DirectusPageButtonBarDirective } from './directus-page/directus-page-button-bar.directive';

@NgModule({
  declarations: [
    SortByPipe,
    DirectusPageComponent,
    SafeHtmlPipe,
    DirectusPageContentDirective,
    DirectusPageButtonBarDirective
  ],
  exports: [
    SortByPipe,
    SafeHtmlPipe,
    DirectusPageComponent,
    DirectusPageContentDirective,
    DirectusPageButtonBarDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
