import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingPageComponent } from './training-page/training-page.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../app/auth/authGuard';
import {MatButtonModule} from '@angular/material/button';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatCardModule} from '@angular/material/card';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {SharedModule} from '../shared/shared.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {CalendrierDynamicComponent} from './calendrier-dynamic/calendrier-dynamic.component';

const trainingRoutes: Routes = [
  {path: 'training', component: TrainingPageComponent, canActivate: [AuthGuard]},
  {path: 'calendrier-dynamique', component: CalendrierDynamicComponent},
];

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    TrainingPageComponent,
    CalendrierDynamicComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(trainingRoutes),
        MatButtonModule,
        FontAwesomeModule,
        MatCardModule,
        FullCalendarModule,
        SharedModule,
        MatButtonToggleModule,
    ],
  exports: [
    TrainingPageComponent,
    RouterModule
  ]
})
export class TrainingModule { }
