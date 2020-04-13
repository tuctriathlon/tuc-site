import {DirectusItemModel} from './directusItem.model';

export class PageModel extends DirectusItemModel {
  title: string;
  url: string;
  description: string;
  icon: string;
  image: number;
  order: number;

  constructor(data: Partial<PageModel> = {}) {
    super(data);
    this.title = data.title;
    this.url = data.url;
    this.description = data.description;
    this.icon = data.icon;
    this.image = data.image;
    this.order = data.order;
  }

  updateFromData(data: any) {
    super.updateFromData(data);
    this.title = data.title;
    this.url = data.url;
    this.description = data.description;
    this.icon = data.icon;
    this.image = data.image;
  }
}
