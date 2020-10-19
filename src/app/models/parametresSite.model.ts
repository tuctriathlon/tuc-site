import {DirectusItemModel} from '../../shared/directusItem.model';

export class ParametresSite extends DirectusItemModel {
  googleApiKey: string;
  calendrier: string;

  constructor(data: Partial<ParametresSite> = {}) {
    super(data);
    this.googleApiKey = data.googleApiKey;
    this.calendrier = data.calendrier;
  }

  updateFromData(data: any) {
    super.updateFromData(data);
    this.googleApiKey = data.google_api_key;
    this.calendrier = data.calendrier_dynamique;
  }
}
