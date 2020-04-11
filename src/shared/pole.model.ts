import {DirectusItemModel} from './directusItem.model';

export class PoleModel extends DirectusItemModel {
  nom: string;
  email: string;

  updateFromData(data: any) {
    super.updateFromData(data);
    this.nom = data.nom;
    this.email = data.email;
  }
}
