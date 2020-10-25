import {DirectusItemModel} from '../shared/directusItem.model';
import {TextUtils} from '../shared/text.utils';

export class FaqModel extends DirectusItemModel {

  constructor() {
    super();
  }
  question: string;
  reponse: string;
  tag: number;
  priorite: number;

  updateFromData(data) {
    this.id = data.id;
    this.question = data.question;
    this.reponse = data.reponse;
    this.tag = data.tag;
    this.priorite = data.priorite;
  }
}
