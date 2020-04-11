import {DirectusItemModel} from './directusItem.model';

export class TagModel extends DirectusItemModel {
  name: string;

  updateFromData(data: any) {
    super.updateFromData(data);
    this.name = data.name;
  }
}
