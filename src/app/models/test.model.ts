import {DirectusItemModel} from '../../shared/directusItem.model';

export class TestModel extends DirectusItemModel {
  name: string;
  constructor() {
    super();
  }

  updateFromData(data: any) {
    super.updateFromData(data);
    this.name = data.name;
  }
}
