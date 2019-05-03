import { Task, TaskList } from "../models/index";

export class TaskController {

  private inputDescrition: HTMLInputElement;
  private inputPriority: HTMLInputElement;
  private inputDate : HTMLInputElement;
  private taskList: TaskList;

  constructor() {

    this.taskList = new TaskList();
    this.inputDescrition = document.querySelector('#input-description');
    this.inputPriority = document.querySelector('#input-priority');
    this.inputDate = document.querySelector('#input-date');
  }

  addTask(event: Event) {

    event.preventDefault();

    const task = new Task(
      this.inputDescrition.value,
      this.inputPriority.value,
      new Date());

    this.taskList.add(task);
    console.log(this.taskList);
  }
}
