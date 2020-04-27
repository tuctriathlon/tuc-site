import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompteRenduPageComponent } from './compte-rendu-page/compte-rendu-page.component';
import {SharedModule} from '../shared/shared.module';
import {Router, RouterModule, Routes} from '@angular/router';
const crRoutes: Routes = [
  {path: 'compte-rendu/:id', component: CompteRenduPageComponent},
  // TODO edit/create component
];

@NgModule({
  declarations: [
    CompteRenduPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(crRoutes)
  ],
  exports: [
    CompteRenduPageComponent,
    RouterModule
  ]
})
export class CompteRenduModule { }
