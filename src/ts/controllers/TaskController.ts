import { Task, TaskList } from '../models/index';
import { TaskView } from '../views/index';
import { TaskService } from '../services/index';

export class TaskController {

  private inputDescrition: JQuery;
  private inputPriority: JQuery;
  private inputDate : JQuery;
  private taskList = new TaskList();
  private taskView = new TaskView('list');
  private taskService = new TaskService();

  constructor() {

    this.inputDescrition = $('#input-description');
    this.inputPriority = $('#input-priority');
    this.inputDate = $('#input-date');

    this.taskView.update(this.taskList);
  }

  addTask(event: Event): void {

    event.preventDefault();

    const task = new Task(
      this.inputDescrition.val.toString(),
      this.inputPriority.val.toString(),
      new Date(this.inputDate.val.toString().replace(/-/g, '/')),
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
      if (res.ok) return res;
      Promise.reject(res.statusText);
    }

    this.taskService
      .getTasks(isOk)
      .then((tasks :Task[]) => {
        tasks.forEach(task => this.taskList.add(task));
        this.taskView.update(this.taskList);
      });
  }
}
