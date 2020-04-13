export abstract class DirectusItemModel {
  id: number;

  constructor(data: Partial<DirectusItemModel> = {}) {
    this.id = data.id;
  }

  updateFromData(data: any) {
    this.id = data.id;
  }
}
