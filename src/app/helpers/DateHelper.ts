export class DateHelper {

  constructor() {

    throw new Error('This class cannot be instantiated');
  }

  static dateToText(date: Date): string {

    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
  }
}
