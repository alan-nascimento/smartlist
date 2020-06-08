import { TaskController } from './app/controllers';
import { AppView } from './app/views/AppView';
import '@fortawesome/fontawesome-free/js/all';
import 'jquery/dist/jquery.js';
import './app/scss/smartlist.scss';

const controller = new TaskController();

$('#task-form').submit(controller.addTask.bind(controller));
$('#btn-import').click(controller.importTasks.bind(controller));
$('.edit-task').click(controller.edit.bind(controller));

$(document).on('click', '.btn-submit', () => {
  controller.addTask.bind(controller);
});

$(document).on('click', '.close-message', () => $('.alert-info').empty());

$(document).on('click', '.edit-task', function () {
  controller.edit($(this).attr('data-id'));
});

$(document).on('click', '.delete-task', function () {
  controller.delete($(this).attr('data-id'));
});
