
export class TextUtils {

  public static isUrl(text: string): boolean {
    return /^(https?|ftp|ssh|mailto):\/\/[a-z0-9\/:%_+.,#?!@&=-]+$/.test(text);
  }
}


