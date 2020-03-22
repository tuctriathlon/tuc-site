import * as moment from 'moment';
import {TextUtils} from '../utils/text.utils';

const SUMMARY_LENGTH = 400;

export enum EventType {
  GOOGLE,
  CR
}

export class EventModel {
  type: EventType;
  title: string;
  description: string;
  author: string;
  date: moment.Moment;
  location: string;
  picture: string;
  labels: string[];

  public static generateMock(): EventModel {

    const event = new EventModel();
    event.author = 'TUC Triathlon';
    event.type = Math.floor(Math.random() * 2) ? EventType.GOOGLE : EventType.CR;
    event.title = TextUtils.randomTitle();
    event.description = TextUtils.randomParagraph();
    event.date = moment();
    event.location = 'Toulouse';
    event.picture = event.type === EventType.CR ? '../assets/image_tuc.jpg' : '';
    event.labels = [];
    return event;
  }

  get summary(): string {
    return this.description.substring(0, 250) + (this.isTrunked ? '...' : '');
  }

  get isTrunked(): boolean {
    return this.description.length >= SUMMARY_LENGTH;
  }

  get dateFormated(): string {
    return this.date.format('DD-MM-YYYY');
  }
}
