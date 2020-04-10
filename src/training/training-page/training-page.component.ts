import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingModel} from '../training.model';
import {TrainingService} from '../training.service';
import * as moment from 'moment';
import {FullCalendarComponent} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-training-page',
  templateUrl: './training-page.component.html',
  styleUrls: ['./training-page.component.css']
})
export class TrainingPageComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, googleCalendarPlugin ];
  googleApiKey = environment.googleApiKey;
  events = {
    googleCalendarId: environment.googleCalendarTrainingId
  };

  trainingList: TrainingModel[] = [];
  selectedDate: moment.Moment;


  constructor(private trainingService: TrainingService) {
    this.selectedDate = moment('2020-04-02');
  }

  ngOnInit(): void {
    this.getSelectedDateTraining();
  }

  getSelectedDateTraining() {
    this.trainingService.getByDate(this.selectedDate).subscribe(trainings => {
      console.log(trainings);
      this.trainingList = trainings;
    });
  }

  handleDateClick(event) {
    this.selectedDate = moment(event.dateStr);
    this.getSelectedDateTraining();
  }

}
