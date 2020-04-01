import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from '../../models/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event: EventModel;
  public hovered: boolean;
  constructor() {
  }

  ngOnInit(): void {
    this.mouseLeave();
  }

  mouseEnter() {
    this.hovered = true;
  }

  mouseLeave() {
    this.hovered = !this.event.picture;
  }
}
