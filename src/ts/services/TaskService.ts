import { Task } from '../models/index';

export class TaskService {

  getTasks(handler: HandlerFunction): Promise<Task[]> {

    return fetch('http://localhost:3000/api/tasks')
      .then(res => handler(res))
      .then(res => res.json())
      .then(res =>
        res.docs.map((task: Task) => 
          new Task(task.description, task.priority, new Date(task.date)))
      )
      .catch(err => console.log(err));
  }
}

export interface HandlerFunction {

  (res: Response): Response;
}
