import { TaskController } from './ts/controllers/index';
import '@fortawesome/fontawesome-free/js/all';
import 'jquery/dist/jquery.js';
import './scss/smartlist.scss';

const controller = new TaskController();

$('#task-form').submit(controller.addTask.bind(controller));
$('#btn-import').click(controller.importTasks.bind(controller));
$('#remove').click(controller.delete.bind(controller));
$('#edit').click(controller.edit.bind(controller));

$('#close-message').on('click', () => alert('daf'));
