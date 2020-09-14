import {Component, OnInit, ViewChild} from '@angular/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {TrainingModel} from '../training.model';
import * as moment from 'moment';
import {TrainingService} from '../training.service';

@Component({
  selector: 'app-calendrier-dynamic',
  templateUrl: './calendrier-dynamic.component.html',
  styleUrls: ['./calendrier-dynamic.component.css']
})
export class CalendrierDynamicComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  events: any[] = [];
  selectedDate: moment.Moment;
  trainingList: TrainingModel[] = [];

  constructor(private trainingService: TrainingService) {
    this.selectedDate = moment();
  }

  get isToday() {
    return this.selectedDate.isSame(moment(), 'day');
  }

  get todayTrainings(): TrainingModel[] {
    return this.trainingList.filter(e => this.selectedDate.isSame(e.start, 'day'));
  }

  get currentDateFormatted(): string {
    return this.selectedDate.format('YYYY-MM-DD');
  }

  get calendarApi() {
    return this.calendarComponent.getApi();
  }

  ngOnInit(): void {
    this.getSelectedDateTraining();
    this.updateEvents();
  }

  updateEvents() {
    const startOfWeek = this.selectedDate.clone().startOf('isoWeek');
    const endOfWeek = this.selectedDate.clone().endOf('isoWeek');
    this.trainingService.getGoogleEvents(startOfWeek, endOfWeek).subscribe(events => {
      this.trainingList = events;
      this.events = events.map(e => e.toFullCalendar());
    });
  }

  getSelectedDateTraining() {
    /*this.trainingService.getByDate(this.selectedDate).subscribe(trainings => {
      this.todayTrainings.forEach(training => {
        const index = trainings.findIndex(t => t.type === training.type);
        if (index >= 0) {
          training = defaults(training, trainings[index]);
        }
      });
    });*/
  }

  selectDate(date: string | moment.Moment) {
    this.selectedDate = moment(date);
    this.calendarComponent.getApi().select(this.currentDateFormatted);
    this.getSelectedDateTraining();
  }

  handleClickEvent(event) {
    console.log(event);
  }

  nextWeek() {
    this.calendarApi.next();
    this.selectDate(this.selectedDate.add(1, 'week'));
    this.updateEvents();
  }

  today() {
    this.calendarApi.today();
    this.selectDate(moment());
    this.updateEvents();
  }

  prevWeek() {
    this.calendarApi.prev();
    this.selectDate(this.selectedDate.subtract(1, 'week'));
    this.updateEvents();
  }

}
