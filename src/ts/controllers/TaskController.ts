import { Task, TaskList } from '../models/index';
import { TaskView, MessageView } from '../views/index';
import { domInject, throttle } from '../helpers/decorators/index';

export class TaskController {

  @domInject('#input-description')
  private inputDescrition: JQuery;

  @domInject('#input-priority')
  private inputPriority: JQuery;

  @domInject('#input-date')
  private inputDate : JQuery;

// tslint:disable-next-line: variable-name
  private _id: string;

  private taskList = new TaskList();
  private taskView = new TaskView('#list');
  private messageView = new MessageView('#message-view');

  constructor() {
    this.taskView.update(this.taskList);
  }

  @throttle()
  addTask(): void {

    const date = new Date(this.inputDate.val().toString().replace(/-/g, ','));

    const task = new Task(
      this._id,
      this.inputDescrition.val().toString(),
      this.inputPriority.val().toString(),
      date,
    );

    fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    .then(res => res.json())
    .then(task => console.log(JSON.stringify(task)))
    .then()
    .catch(err => console.error(err));

    this.taskList.add(task);

    this.taskView.update(this.taskList);
    this.messageView.update('Task added with success!');
  }

  @throttle()
  async importTasks() {

    try {

      const { TaskService } = await import('../services/TaskService');
      const service = new TaskService();

      const tasksToImport = await service
        .getTasks((res) => {

          if (res.ok) return res;
          Promise.reject(res.statusText);
        });

      tasksToImport
        .forEach(task => 
          this.taskList.add(task));

      this.taskView.update(this.taskList);
      this.messageView.update('Tasks imported with success!');
      console.log(this.taskList);

    } catch(err) {
      this.messageView.update(err);
    }
  }

  delete(id: string) {

    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: '5cdf9b80e5b7b14d0048ff31'})
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));

    this.taskView.update(this.taskList);
    this.messageView.update('Task deleted with success!');
  }

  edit(id: string) {
    alert('Test');
  }
}
