import { TaskController } from './ts/controllers/index';
import '@fortawesome/fontawesome-free/js/all';
import 'jquery/dist/jquery.js';
import './scss/smartlist.scss';

const controller = new TaskController();

document.getElementById('task-form').onsubmit = controller.add.bind(controller);

$('#options').on('click', () => {
  $(this)
});
