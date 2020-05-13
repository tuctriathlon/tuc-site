import {DirectusItemModel} from '../shared/directusItem.model';
import {CardInterface} from '../shared/card/card.interface';
import {CardModel} from '../shared/card/card.model';
import * as moment from 'moment';

export class TrainingModel extends DirectusItemModel implements CardInterface {
  type: string;
  owner: string;
  date: string;
  description: string;
  start: string;
  end: string;
  title: string;
  location: string;

  get icon(): string {
    switch (this.type) {
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

  private typeFromString(str: string = '') {
    if (str.match(/natation/i)) {
      return 'swim';
    } else if (str.match(/velo|ht|home trainer/i)) {
      return 'bike';
    } else if (str.match(/cap|trail|course a pied/i)) {
      return 'run';
    }
    return 'other';
  }

  updateFromData(data: any) {
    super.updateFromData(data);
    this.type = data.type_de_training || this.typeFromString(data.summary);
    this.owner = data.owner;
    this.date = data.date_de_la_seance;
    this.start = data.start?.dateTime;
    this.end = data.end?.dateTime;
    this.title = data.summary;
    this.location = data.location;
    this.description = data.description_seance;
  }

  toCard(): CardModel {
    const card  = new CardModel();
    card.title = this.title;
    card.content = this.description || '';
    card.subtitleRight = moment(this.start).format('DD-MM-YYYY HH:MM');
    card.subtitleLeft = this.location;
    card.icon = this.icon;
    return card;
  }

  toFullCalendar(): any {
    return {
      title: this.title,
      start: this.start || this.date,
      backgroundColor: this.backgroundColor,
      textColor: this.textColor
    };
  }

  get backgroundColor(): string {
    switch (this.type) {
      case 'swim':
        return 'blue';
      case 'bike':
        return 'red';
      case 'run':
        return 'lime';
      default:
        return 'yellow';
    }
  }

  get textColor(): string {
    switch (this.type) {
      case 'swim':
        return 'white';
      case 'bike':
        return 'white';
      case 'run':
        return 'black';
      default:
        return 'black';
    }
  }
}
