import { Task, TaskList } from '../models/index';
import { TaskView } from '../views/index';

export class TaskController {

  private inputDescrition: HTMLInputElement;
  private inputPriority: HTMLInputElement;
  private inputDate : HTMLInputElement;
  private taskList = new TaskList();
  private taskView = new TaskView('list');

  constructor() {

    this.inputDescrition = <HTMLInputElement>document.getElementById('input-description');
    this.inputPriority = <HTMLInputElement>document.getElementById('input-priority');
    this.inputDate = <HTMLInputElement>document.getElementById('input-date');

    this.taskView.update(this.taskList);
  }

  add(event: Event): void {

    event.preventDefault();

    const task = new Task(
      this.inputDescrition.value,
      this.inputPriority.value,
      new Date(this.inputDate.value.replace(/-/g, '/')));

    this.taskList.add(task);
    console.log(this.taskList);

    this.taskView.update(this.taskList);
  }
}
