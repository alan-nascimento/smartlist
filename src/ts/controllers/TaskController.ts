import { Task, TaskList } from '../models/index';
import { TaskView } from '../views/index';
import { TaskService } from '../services/index';

export class TaskController {

  private inputDescrition: HTMLInputElement;
  private inputPriority: HTMLInputElement;
  private inputDate : HTMLInputElement;
  private taskList = new TaskList();
  private taskView = new TaskView('list');
  private taskService = new TaskService();

  constructor() {

    this.inputDescrition = <HTMLInputElement>document.getElementById('input-description');
    this.inputPriority = <HTMLInputElement>document.getElementById('input-priority');
    this.inputDate = <HTMLInputElement>document.getElementById('input-date');

    this.taskView.update(this.taskList);
  }

  addTask(event: Event): void {

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

  importTasks() {

    function isOk(res: Response) {
      if (res.ok) {
        return res;
      } else {
        throw new Error(res.statusText);
      }
    }

    this.taskService
      .getTasks(isOk)
      .then((tasks :Task[]) => {
        tasks.forEach(task => this.taskList.add(task));
        this.taskView.update(this.taskList);
      });
  }
}
