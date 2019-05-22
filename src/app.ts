import { TaskController } from './ts/controllers/index';
import '@fortawesome/fontawesome-free/js/all';
import 'jquery/dist/jquery.js';
import './scss/smartlist.scss';

const controller = new TaskController();

$('#task-form').submit(controller.add.bind(controller));
$('#btn-import').click(controller.import.bind(controller));

$('#options').on('click', () => {
  $(this)
});
