import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from '../../models/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() event: EventModel;
  constructor() { }

  ngOnInit(): void {
  }

}
