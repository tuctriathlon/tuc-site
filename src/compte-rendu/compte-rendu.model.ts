import {DirectusItemModel} from '../shared/directusItem.model';
import {PageModel} from '../shared/directus-page/page.model';
import {PageInterface} from '../shared/directus-page/page.interface';
import {CardInterface} from '../shared/card/card.interface';
import {CardModel} from '../shared/card/card.model';
import * as moment from 'moment';
import {DirectusFileModel} from '../shared/directusFile.model';

export class CompteRenduModel extends DirectusItemModel implements PageInterface, CardInterface {
  title: string;
  date: moment.Moment;
  location: string;
  recit: string;
  image: number;
  imageFile: DirectusFileModel;
  owner: string;

  updateFromData(data: any) {
    super.updateFromData(data);
    this.title = data.title;
    this.date = moment(data.date, 'YYYY-MM-DD');
    this.location = data.location;
    this.recit = (data.recit || '').replace(/<script*[^</]*<\/script>/, '');
    this.owner = data.owner;
    this.image = data.image;
  }

  toCard(): CardModel {
    const card = new CardModel();
    card.title = this.title;
    card.subtitleLeft = this.location;
    card.subtitleRight = this.date.format('DD-MM-YYYY');
    card.content = this.recit;
    card.image = this.imageFile?.location;
    card.routerLink = ['/', 'compte-rendu', this.id.toString()];
    return card;
  }

  toPage(): PageModel {
    const page = new PageModel();
    page.title = this.title;
    page.description = this.recit;
    page.image = this.image;
    page.imageFile = this.imageFile;
    return page;
  }

}
