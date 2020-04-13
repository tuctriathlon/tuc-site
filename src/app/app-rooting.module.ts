import { RouterModule, Routes } from '@angular/router';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {Home2Component} from './pages/home2/home2.component';
import {EventPageComponent} from './pages/event-page/event-page.component';
import {DirectusPageComponent} from '../shared/directus-page/directus-page.component';
import {TestPageComponent} from './pages/test-page/test-page.component';

const appRoutes: Routes = [
  { path: 'home', component: Home2Component },
  { path: 'test', component: TestPageComponent },
  { path: 'event/:id', component: EventPageComponent },
  { path: ':url', component: DirectusPageComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
