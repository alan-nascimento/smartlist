import { Task } from './index';
import { Equal } from '../helpers/index';

export class TaskList implements Equal<TaskList> {

  private taskList: Task[] = [];

  add(task: Task): void {

    this.taskList.push(task);
  }

  list() {
    return [].concat(this.taskList);
  }

  isEqual(taskList: TaskList): boolean {
    return JSON.stringify(this.taskList) === JSON.stringify(taskList.list);
  }
}
