export abstract class View<T> {

  protected element: JQuery;

  constructor(selector: string) {
    this.element = $(selector);
  }

  update(model: T): void {
    const template = this.render(model);
    this.element.html(template);
  }

  abstract render(model: T): string;
}
