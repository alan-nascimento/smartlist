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
      new Date(this.inputDate.value.replace(/-/g, '/')),
    );

    this.taskList.add(task);

    this.taskView.update(this.taskList);

    fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    .then(res => res.json())
    .then(task => console.log(JSON.stringify(task)))
    .catch(err => console.error(err));
  }

  import() {

    fetch('http://localhost:3000/api/tasks')
      .then(res => res.json())
      .then(tasks => console.log(tasks))
      .catch(err => console.log(err));
  }

}
