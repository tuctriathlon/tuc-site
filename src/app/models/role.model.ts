import {DirectusItemModel} from '../../shared/directusItem.model';

export class RoleModel extends DirectusItemModel {
  name: string;
  description: string;

  constructor(data?: Partial<RoleModel>) {
    super();
    if (data) {
      this.updateFromData(data);
    }
  }

  updateFromData(data: any) {
    super.updateFromData(data);
    this.name = data.name;
    this.description = data.description;
  }
}
