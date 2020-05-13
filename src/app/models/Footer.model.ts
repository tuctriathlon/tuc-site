import {DirectusItemModel} from '../../shared/directusItem.model';

export class FooterModel extends DirectusItemModel {
  label: string;
  url: string;

  updateFromData(data: any) {
    super.updateFromData(data);
    this.label = data.label;
    this.url = data.url;
  }
}
