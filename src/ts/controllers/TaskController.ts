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
  async addTask() {

    const { TaskService } = await import('../services/TaskService');
    const service = new TaskService();

    const date = new Date(this.inputDate.val().toString().replace(/-/g, ','));

    const task = new Task(
      this._id,
      this.inputDescrition.val().toString(),
      this.inputPriority.val().toString(),
      date,
    );

    await service.postTask(task);
    await this.importTasks();

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

  async delete(id: string) {

    const { TaskService } = await import('../services/TaskService');
    const service = new TaskService();

    service.deleteTask(id);

    this.taskView.update(this.taskList);
    this.messageView.update('Task deleted with success!');
  }

  edit(id: string) {
    alert('Test');
  }
}
