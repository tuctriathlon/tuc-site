import {DirectusItemModel} from '../../shared/directusItem.model';
import {Moment, utc} from 'moment';

export class NewsModel extends DirectusItemModel {
  titre: string;
  detail: string;
  date: Moment;

  constructor(data?: Partial<NewsModel>) {
    super(data);
    if (data) {
      this.titre = data.titre;
      this.detail = data.detail;
      this.date = utc(data.date, 'YYYY-MM-DD');
    }
  }
}
