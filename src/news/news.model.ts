import {DirectusItemModel} from '../shared/directusItem.model';

export class NewsModel extends DirectusItemModel {
  date: Date;
  titre: string;
  description: string;

  constructor(data: Partial<NewsModel> = {}) {
    super();
    this.date = data.date;
    this.titre = data.titre;
    this.description = data.description;
  }

  updateFromData(data: any) {
    super.updateFromData(data);
    this.date = data.date;
    this.titre = data.titre;
    this.description = data.description;
  }
}
