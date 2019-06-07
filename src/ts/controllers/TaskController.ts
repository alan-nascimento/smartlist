import { Task, TaskList } from '../models/index';
import { TaskView, MessageView } from '../views/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { DateHelper } from '../helpers/DateHelper';

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
    this.importTasks();
    this.taskView.update(this.taskList);
  }

  @throttle()
  async addTask() {

    const { TaskService } = await import('../services/TaskService');
    const service = new TaskService();

    const date = new Date(this.inputDate.val().toString().replace(/-/g, ','));

    if (date.getDate() < new Date().getDate()) {
      this.messageView.update('The date cannot be less than the current date');
      return;
    }

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

    $('.close-message').off();
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

      const tasksAlreadyImported = this.taskList.list();

      tasksToImport
        .filter(task => 
          !tasksAlreadyImported.some(alreadyImported =>
            task.isEqual(alreadyImported)))
        .forEach(task => 
          this.taskList.add(task));

      this.taskView.update(this.taskList);

    } catch(err) {
      this.messageView.update(err);
    }
  }

  async delete(id: string) {

    const { TaskService } = await import('../services/TaskService');
    const service = new TaskService();

    service.deleteTask(id);

    this.taskList.erase();

    await this.importTasks();

    this.taskView.update(this.taskList);
    this.messageView.update('Task deleted with success!');

    $('.delete-task').off();
  }

  edit(id: string) {

    $('.edit-task').off();
  }
}
