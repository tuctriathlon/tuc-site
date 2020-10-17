import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsPageComponent } from './news-page/news-page.component';
import { NewsComponent } from './news/news.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

const newsRoutes: Routes = [
  {path: 'news', component: NewsPageComponent},
];

@NgModule({
  declarations: [NewsPageComponent, NewsComponent],
  exports: [
    NewsComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    RouterModule.forChild(newsRoutes),
    SharedModule,
  ]
})
export class NewsModule { }
