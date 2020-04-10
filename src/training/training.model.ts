import {DirectusItemModel} from '../shared/directusItem.model';

export class TrainingModel extends DirectusItemModel {
  type: string;
  owner: string;
  date: string;
  description: string;

  updateFromData(data: any) {
    super.updateFromData(data);
    this.type = data.type_de_training;
    this.owner = data.owner;
    this.date = data.date_de_la_seance;
    this.description = data.description_seance;
  }
}
