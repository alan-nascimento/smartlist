import { TaskController } from './ts/controllers/index';

const controller = new TaskController();
document.getElementById('task-form').onsubmit = function () {
  controller.add.bind(controller);
};
