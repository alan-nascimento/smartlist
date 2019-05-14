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
            <li class="task">
                <p class="description">
                  <i class="far fa-check-circle ${task.priority}-priority"></i>${task.description}
                </p>
                <p class="date">${task.date}</p>
            </li>
            `)}
        `;
  }
}
