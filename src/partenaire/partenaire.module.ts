import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../app/auth/authGuard';
import {PartenairePageComponent} from './partenaire-page/partenaire-page.component';

const partenaireRoutes: Routes = [
  {path: 'partenaire', component: PartenairePageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    PartenairePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(partenaireRoutes),
  ],
  exports: [
    PartenairePageComponent,
    RouterModule
  ]
})
export class PartenaireModule { }
