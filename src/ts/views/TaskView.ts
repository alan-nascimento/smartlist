import { TaskList } from '../models/index';
import { View } from './index';

export class TaskView extends View<TaskList> {

  render(model: TaskList): string {

    return `
      ${model.list().map(task =>
        `
        <li class="task">
            <p class="description">
              <i class="far fa-check-circle ${task.priority.toLowerCase()}-priority"></i>
              ${task.description}
            </p>
            <p class="date">
              ${task.date.getDate()} /
              ${task.date.getMonth()} /
              ${task.date.getFullYear()}
              <i id="edit" class="far fa-edit"></i>
              <i id="remove" class="far fa-trash-alt"></i>
            </p>
        </li>
      `,
      ).join('')}
    `;
  }
}
