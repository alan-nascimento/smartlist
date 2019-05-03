import { TaskController } from './controllers/index';

const controller = new TaskController();

document.querySelector('#task-submit').addEventListener('click', () => {
  controller.addTask.bind(controller);
});
