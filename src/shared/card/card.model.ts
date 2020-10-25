const SUMMARY_LENGTH = 400;

export class CardModel {
  title: string;
  icon?: string;
  content: string;
  subtitleLeft: string;
  subtitleRight: string;
  image: string;
  link: string;

  constructor(data: Partial<CardModel> = {}) {
    this.title = data.title;
    this.icon = data.icon;
    this.content = data.content || '';
    this.subtitleLeft = data.subtitleLeft;
    this.subtitleRight = data.subtitleRight;
    this.image = data.image;
    this.link = data.link;
  }

  get hasSubtitle(): boolean {
    return !!this.subtitleLeft && !!this.subtitleRight;
  }

  get summary(): string {
    return this.content.replace(/<img[^>]*>|<iframe>[^<\/iframe>]*<\/iframe>/, '')
      .substr(0, SUMMARY_LENGTH) + (this.content.length > SUMMARY_LENGTH ? '...' : '');
  }

  get isGpx(): boolean {
    return this.image?.endsWith('.gpx');
  }
}
