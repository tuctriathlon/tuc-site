import { RouterModule, Routes } from '@angular/router';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {DirectusPageComponent} from '../shared/directus-page/directus-page.component';
import {TestPageComponent} from './pages/test-page/test-page.component';
import {HomeComponent} from './pages/home/home.component';
import {ErrorPageComponent} from './pages/error-page/error-page.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestPageComponent },
  { path: 'erreur', component: ErrorPageComponent },
  { path: ':url', component: DirectusPageComponent },
  { path: 'page/:resourceName', component: DirectusPageComponent },
  { path: 'page/:resourceName/:id', component: DirectusPageComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { useHash: false, relativeLinkResolution: 'legacy' }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
