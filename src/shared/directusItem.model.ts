export abstract class DirectusItemModel {
  id: number;

  updateFromData(data: any) {
    this.id = data.id;
  }
}
