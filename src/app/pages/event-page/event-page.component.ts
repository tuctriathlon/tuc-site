import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../services/event.service';
import {EventModel} from '../../models/event.model';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  event: EventModel;
  constructor(private route: ActivatedRoute,
              private eventService: EventService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.event = this.eventService.getById(+params.get('id'));
      if (!this.event) {
        // GO TO page not found
      }
    });
  }

}
