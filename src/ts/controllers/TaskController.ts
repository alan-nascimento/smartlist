import { Task, TaskList } from '../models/index';
import { TaskView, MessageView } from '../views/index';
import { TaskService } from '../services/index';
import { domInject, throttle } from '../helpers/decorators/index';

export class TaskController {

  @domInject('#input-description')
  private inputDescrition: JQuery;

  @domInject('#input-priority')
  private inputPriority: JQuery;

  @domInject('#input-date')
  private inputDate : JQuery;

  private taskList = new TaskList();
  private taskView = new TaskView('#list');
  private messageView = new MessageView('#message-view');

  private taskService = new TaskService();

  constructor() {

    this.taskView.update(this.taskList);
  }

  @throttle()
  addTask(): void {

    const date = new Date(this.inputDate.val().toString().replace(/-/g, ','));

    const task = new Task(
      this.inputDescrition.val().toString(),
      this.inputPriority.val().toString(),
      date,
    );

    this.taskList.add(task);

    this.taskView.update(this.taskList);
    this.messageView.update('Task added with success!');

    fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    .then(res => res.json())
    .then(task => console.log(JSON.stringify(task)))
    .catch(err => console.error(err));
  }

  @throttle()
  async importTasks() {

    try {

      const tasksToImport = await this.taskService
        .getTasks((res) => {

          if (res.ok) return res;
          Promise.reject(res.statusText);
        });

      tasksToImport
        .forEach(task => 
          this.taskList.add(task));

      this.taskView.update(this.taskList);
      this.messageView.update('Task imported with success!');

    } catch(err) {
      this.messageView.update(err);
    }
  }
}
