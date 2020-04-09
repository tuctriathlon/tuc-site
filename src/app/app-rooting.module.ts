import { RouterModule, Routes } from '@angular/router';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {HomeComponent} from './pages/home/home.component';
import {Home2Component} from './pages/home2/home2.component';
import {EventPageComponent} from './pages/event-page/event-page.component';
import {TestPageComponent} from './pages/test-page/test-page.component';
import {AuthGuard} from '../auth/authGuard';

const appRoutes: Routes = [
  // { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'home', component: HomeComponent },
  { path: 'home2', component: Home2Component , canActivate: [AuthGuard]},
  { path: 'event/:id', component: EventPageComponent },
  { path: 'test', component: TestPageComponent },
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
