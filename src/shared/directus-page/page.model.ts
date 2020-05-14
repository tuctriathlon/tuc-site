import {DirectusItemModel} from '../directusItem.model';
import {DirectusFileModel} from '../directusFiles/directusFile.model';

export class PageModel extends DirectusItemModel {
  title: string;
  url: string;
  description: string;
  icon: string;
  image: number | DirectusFileModel;
  files: DirectusFileModel[];
  order: number;

  constructor(data: Partial<PageModel> = {}) {
    super(data);
    this.title = data.title;
    this.url = data.url;
    this.description = data.description;
    this.icon = data.icon;
    if (data.image) {
      this.image = typeof data.image === 'number' ? data.image : new DirectusFileModel(data.image);
    }
    this.order = data.order;
    this.files = [];
  }

  get hasImageLoaded() {
    return this.image && typeof this.image !== 'number';
  }

  updateFromData(data: any) {
    super.updateFromData(data);
    this.title = data.title;
    this.url = data.url;
    this.description = data.description;
    this.icon = data.icon;
    if (data.image) {
      this.image = typeof data.image === 'number' ? data.image : new DirectusFileModel(data.image);
    }
    this.files = (data.files || []).map( f => {
      if (typeof f === 'number') {
        return f;
      } else {
        return new DirectusFileModel(f.directus_files_id);
      }
    });
  }
}
