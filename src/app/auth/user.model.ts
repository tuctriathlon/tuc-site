import {DirectusItemModel} from '../../shared/directusItem.model';
import {CardInterface} from '../../shared/card/card.interface';
import {CardModel} from '../../shared/card/card.model';
import {DirectusFileModel} from '../../shared/directusFiles/directusFile.model';

export enum UserStatus {
  DRAFT= 'draft',
  INVITED = 'invited',
  ACTIVE= 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted'
}
export class UserModel extends DirectusItemModel implements CardInterface {
  first_name: string;
  last_name: string;
  email: string;
  emailNotifications: true;
  password: string;
  role: number;
  status: UserStatus;
  company: string;
  avatar: number | DirectusFileModel;

  updateFromData(data: any) {
    super.updateFromData(data);
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.emailNotifications = data.email_notifications;
    this.role = data.role;
    this.status = data.status;
    this.company = data.company;
    this.avatar = data.avatar;
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

  toCard(): CardModel {
    const card = new CardModel();
    card.title = `${this.first_name} ${this.last_name}`;
    return card;
  }
}
