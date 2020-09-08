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

  public static randomQuestion(): FaqModel {
    const faqModel = new FaqModel();
    faqModel.question = TextUtils.randomTitle();
    faqModel.reponse = TextUtils.randomParagraph();
    faqModel.tag = 1;
    return faqModel;
  }

  updateFromData(data) {
    this.id = data.id;
    this.question = data.question;
    this.reponse = data.reponse;
    this.tag = data.tag;
    this.priorite = data.priorite;
  }
}
