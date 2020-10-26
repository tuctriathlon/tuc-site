import { Pipe, PipeTransform } from '@angular/core';
import {CardModel} from './card.model';

@Pipe({
  name: 'cardFilter'
})
export class CardFilterPipe implements PipeTransform {

  transform(cards: CardModel[], filter: number|string|null): CardModel[] {
    if (filter) {
      return (cards || []).filter(v => v.filter === filter);
    } else {
      return cards;
    }
  }

}
