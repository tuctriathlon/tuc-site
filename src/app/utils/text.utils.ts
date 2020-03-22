import {LoremIpsum} from 'lorem-ipsum';

export class TextUtils {
  private static lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  public static randomParagraph() {
    return this.lorem.generateParagraphs(5);
  }

  public static randomTitle() {
    return this.lorem.generateWords(5);
  }
}


