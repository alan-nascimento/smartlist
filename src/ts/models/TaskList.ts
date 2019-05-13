import { Task } from './index';

export class TaskList {

  private taskList: Task[] = [];

  add(task: Task): void {

    this.taskList.push(task);
  }

  list() {

    return [].concat(this.taskList);
  }
}
