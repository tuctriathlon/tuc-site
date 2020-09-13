import {DirectusItemModel} from '../shared/directusItem.model';
import {DirectusFileModel} from '../shared/directusFiles/directusFile.model';

export class PartenaireModel extends DirectusItemModel {
  nom: string;
  logo: number;
  logoFile: DirectusFileModel;
  avantage: string;
  constructor() {
    super();
  }

  updateFromData(data: any) {
    super.updateFromData(data);
    this.nom = data.nom;
    this.logo = data.logo;
    this.avantage = data.avantage;
  }
}
