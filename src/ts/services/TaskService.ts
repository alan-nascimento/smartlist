import { Task } from '../models/index';

export class TaskService {

  getTasks(handler: HandlerFunction): Promise<Task[]> {

    return fetch('http://localhost:3000/api/tasks')
      .then(res => handler(res))
      .then(res => res.json())
      .then(res =>
        res.docs.map((task: Task) => 
          new Task(task._id, task.description, task.priority, new Date(task.date)))
      )
      .catch(err => console.log(err));
  }

  postTask(task: Task) {

    fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    .then(res => res.json())
    .then(task => console.log(JSON.stringify(task)))
    .catch(err => console.error(err));
  }

  deleteTask(id: string) {

    return fetch(`http://localhost:3000/api/tasks/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(json => json);
  }

  putTask(id: string) {

  }

}

export interface HandlerFunction {

  (res: Response): Response;
}
