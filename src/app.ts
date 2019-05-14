import { TaskController } from './ts/controllers/index';
import '@fortawesome/fontawesome-free/js/all';
import './scss/smartlist.scss';

const controller = new TaskController();
document.getElementById('task-form').onsubmit = controller.add.bind(controller);

const form = document.querySelector('.task-form')

const add = document.querySelector('btn-add');
add.addEventListener('click', () => {
  form.classList.toggle('');
});
