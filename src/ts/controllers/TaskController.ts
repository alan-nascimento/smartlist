import { Task, TaskList } from '../models/index';

export class TaskController {

  private inputDescrition: HTMLInputElement;
  private inputPriority: HTMLInputElement;
  private inputDate : HTMLInputElement;
  private taskList: TaskList;

  constructor() {

    this.taskList = new TaskList();
    this.inputDescrition = <HTMLInputElement>document.getElementById('input-description');
    this.inputPriority = <HTMLInputElement>document.getElementById('input-priority');
    this.inputDate = <HTMLInputElement>document.getElementById('input-date');
  }

  add(event: Event): void {

    event.preventDefault();

    const task = new Task(
      this.inputDescrition.value,
      this.inputPriority.value,
      new Date());

    this.taskList.add(task);
    console.log(this.taskList);
  }
}
