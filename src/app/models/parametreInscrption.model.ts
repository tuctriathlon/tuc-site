import {DirectusItemModel} from '../../shared/directusItem.model';

export class ParametreInscrptionModel extends DirectusItemModel {
  ouvert: boolean;
  fermeture: Date;
  ouvertureAncien: Date;
  ouvertureNouveau: Date;

  updateFromData(data: any) {
    super.updateFromData(data);
    this.ouvert = data.ouvert;
    this.fermeture = data.fermeture;
    this.ouvertureAncien = data.ouvertureAncien;
    this.ouvertureNouveau = data.ouvertureNouveau;
  }
}
