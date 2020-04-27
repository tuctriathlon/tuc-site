import {Component, Input, OnInit} from '@angular/core';
import {CardModel} from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: CardModel = CardModel.RandomCard();
  rotated: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  rotate() {
    this.rotated = !this.rotated;
  }

}
