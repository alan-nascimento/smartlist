import { TaskController } from './ts/controllers/index';
import './scss/smartlist.scss';

const controller = new TaskController();
document.getElementById('task-form').onsubmit = controller.add.bind(controller);
