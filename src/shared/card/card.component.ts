import {Component, Input, OnInit} from '@angular/core';
import {CardModel} from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: CardModel = new CardModel();
  @Input() face: 'front' | 'back' | 'rotate' = 'rotate';
  rotated: boolean;
  constructor() { }

  ngOnInit(): void {
    this.rotated = this.face === 'back';
  }

  rotate() {
    if (this.face === 'rotate') {
      this.rotated = !this.rotated;
    }
  }

}
