import {Component, Input, OnInit} from '@angular/core';
import {TrainingModel} from '../training.model';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.css']
})
export class TrainingCardComponent implements OnInit {
  @Input() training: TrainingModel;
  constructor() { }

  get icon(): string {
    switch (this.training.type) {
      case 'swim':
        return 'swimmer';
      case 'bike':
        return 'biking';
      case 'run':
        return 'running';
      default:
        return 'dumbbell';
    }
  }

  ngOnInit(): void {
  }

}
