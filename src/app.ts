import { TaskController } from './ts/controllers/index';

const controller = new TaskController();
document.getElementById('task-form').onsubmit = controller.add.bind(controller);
