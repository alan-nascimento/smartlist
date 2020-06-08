import { View } from './index';

export class AppView extends View<string> {

  render(model: string): string {

  return `
  <h1>${model}</h1>
  
  <form id="task-form" class="task-form" action="">
    <label>Description</label>
    <input type="text" name="" id="input-description">
    <label>Priority</label>
    <select name="" id="input-priority">
      <option value="none"></option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
    <label>Date</label>
    <input type="date" name="" id="input-date">
    <div class="btn-container">
      <button class="btn btn-submit" type="submit"><i class="fas fa-plus-circle"></i>Add</button>
    </div>
  </form>
  
  <div id="message-view"></div>
  `;
  }
}
