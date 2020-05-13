import {DirectusItemModel} from '../shared/directusItem.model';
import {PageInterface} from '../shared/directus-page/page.interface';
import {CardInterface} from '../shared/card/card.interface';
import {PageModel} from '../shared/directus-page/page.model';
import {CardModel} from '../shared/card/card.model';

export enum UserStatus {
  DRAFT= 'draft',
  INVITED = 'invited',
  ACTIVE= 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted'
}
export class UserModel extends DirectusItemModel implements PageInterface, CardInterface {
  firstName: string;
  lastName: string;
  email: string;
  emailNotifications: true;
  password: string;
  role: number;
  status: UserStatus;

  updateFromData(data: any) {
    super.updateFromData(data);
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.email = data.email;
    this.emailNotifications = data.email_notifications;
    this.role = data.role;
    this.status = data.status;
  }

  toData(): any {
    const data = {};
    Object.keys(this).forEach(key => {
      if (this[key]) {
        data[key] = this[key];
      }
    });
    return data;
  }

  toPage(): PageModel {
    const page = new PageModel();
    page.title = 'Profile';
    page.icon = 'user';
    page.description = '';
    return page;
  }

  toCard(): CardModel {
    const card = new CardModel();
    card.title = `${this.firstName} ${this.lastName}`;
    return card;
  }
}
