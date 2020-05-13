import {TextUtils} from '../text.utils';
import * as moment from 'moment';
import { sample } from 'lodash';

const SUMMARY_LENGTH = 400;

export class CardModel {
  title: string;
  icon?: string;
  content: string;
  subtitleLeft: string;
  subtitleRight: string;
  image: string;
  routerLink: string[];

  get hasSubtitle(): boolean {
    return !!this.subtitleLeft && !!this.subtitleRight;
  }

  get summary(): string {
    return this.content.replace(/<img[^>]*>|<iframe>[^<\/iframe>]*<\/iframe>/, '')
      .substr(0, SUMMARY_LENGTH) + '...';
  }

  static RandomCard(): CardModel {
    const card = new CardModel();
    const pictures = ['../assets/photo/nage.jpg', '../assets/photo/velo.jpg', '../assets/photo/cap.JPG', '../assets/photo/ski.jpeg'];
    card.subtitleLeft = 'TUC Triathlon';
    card.title = TextUtils.randomTitle();
    card.content = TextUtils.randomParagraph();
    card.subtitleRight = moment().format('DD/MM/YYYY');
    card.image = sample(pictures);
    return card;
  }
}
