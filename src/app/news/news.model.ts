import {DirectusItemModel} from '../../shared/directusItem.model';
import * as moment from 'moment';

export class NewsModel extends DirectusItemModel {
  titre: string;
  detail: string;
  date: moment.Moment;

  constructor(data?: Partial<NewsModel>) {
    super(data);
    if (data) {
      this.titre = data.titre;
      this.detail = data.detail;
      this.date = moment(data.date, 'YYYY-MM-DD');
    }
  }
}
