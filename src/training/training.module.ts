import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingPageComponent } from './training-page/training-page.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/authGuard';
import { TrainingCardComponent } from './training-card/training-card.component';
import {MatButtonModule} from '@angular/material/button';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatCardModule} from '@angular/material/card';
import {FullCalendarModule} from '@fullcalendar/angular';
import {SharedModule} from '../shared/shared.module';

const trainingRoutes: Routes = [
  {path: 'training', component: TrainingPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    TrainingPageComponent,
    TrainingCardComponent
  ],
  imports: [
      CommonModule,
      RouterModule.forChild(trainingRoutes),
      MatButtonModule,
      FontAwesomeModule,
      MatCardModule,
      FullCalendarModule,
      SharedModule
  ],
  exports: [
    TrainingPageComponent,
    RouterModule
  ]
})
export class TrainingModule { }
