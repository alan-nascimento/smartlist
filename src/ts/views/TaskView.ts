import { Task, TaskList } from '../models/index';

export class TaskView {

  private element: Element;

  constructor(selector: string) {
    this.element = document.getElementById(selector);
  }

  update(model: TaskList): void {
    this.element.innerHTML = this.render(model);
  }

  render(model: TaskList): string {
    return `
            ${model.list().map(task => `
                <li class="description">${task.description}</li>
                <li class="priority">${task.priority}</li>
                <li class="date">${task.date}</li>`,
            )}
        `;
  }
}
