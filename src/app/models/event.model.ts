import * as moment from 'moment';
import {CardModel} from '../../shared/card/card.model';
import {CardInterface} from '../../shared/card/card.interface';
import {PageInterface} from '../../shared/directus-page/page.interface';
import {PageModel} from '../../shared/directus-page/page.model';

const SUMMARY_LENGTH = 400;

export enum EventType {
  GOOGLE,
  CR
}

export class EventModel implements CardInterface, PageInterface {
  id: number;
  type: EventType;
  title: string;
  description: string;
  author: string;
  date: moment.Moment;
  location: string;
  picture: string;
  labels: string[];

  get summary(): string {
    return this.description.substring(0, 250) + (this.isTrunked ? '...' : '');
  }

  get isTrunked(): boolean {
    return this.description.length >= SUMMARY_LENGTH;
  }

  get dateFormatted(): string {
    return this.date.format('DD-MM-YYYY');
  }

  toCard(): CardModel {
    const card = new CardModel();
    card.title = this.title;
    card.subtitleRight = this.author;
    card.subtitleLeft = this.dateFormatted;
    card.content = this.description;
    card.image = this.picture;
    card.link = ['/', 'event', this.id.toString()].join('/');
    return card;
  }

  toPage(): PageModel {
    const page = new PageModel();
    page.title = this.title;
    page.description = this.description;
    return page;
  }
}
