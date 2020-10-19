import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
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
  selectedDate: moment.Moment;
  trainingList: TrainingModel[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridWeek',
    locale: 'fr',
    firstDay: 1,
    dateClick: (event) => this.selectDate(event.dateStr),
    height: 200,
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    eventClick: (event) => this.handleClickEvent(event),
    events: []
  };

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
    this.updateEvents();
  }

  updateEvents() {
    const startOfWeek = this.selectedDate.clone().startOf('isoWeek');
    const endOfWeek = this.selectedDate.clone().endOf('isoWeek');
    this.trainingService.getGoogleEvents(startOfWeek, endOfWeek).subscribe(events => {
      this.trainingList = events;
      this.calendarOptions.events = events.map(e => e.toFullCalendar());
    });
  }

  selectDate(date: string | moment.Moment) {
    this.selectedDate = moment(date);
    this.calendarComponent.getApi().select(this.currentDateFormatted);
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
