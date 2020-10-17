import {DirectusItemModel} from '../directusItem.model';

export class DirectusFileModel extends DirectusItemModel {
  id: number;
  title: string;
  type: string;
  description: string;
  tags: any[];
  data: any;

  constructor(props: Partial<DirectusFileModel> = {}) {
    super(props);
    this.title = props.title;
    this.type = props.type;
    this.description = props.description;
    this.tags = props.tags;
    this.data = props.data;
  }

  /**
   * Full URL to the original file.
   */
  get location() {
    return this.data.full_url;
  }

  get getIcon() {
    if (/^image/.test(this.type)) {
      return 'file-image';
    }
    switch (this.type) {
      case 'application/pdf':
        return 'file-pdf';
      case 'application/msword':
        return 'file-word';
      case 'application/gpx':
        return 'route';
      default:
        return 'file';
    }
  }

  updateFromData(data: any) {
    super.updateFromData(data);
    this.title = data.title;
    this.type = data.type;
    this.description = data.description;
    this.tags = data.tags;
    this.data = data.data;
  }

}
