import { View } from './index';

export class MessageView extends View<string> {

  render(model: string): string {

    return `<p class="alert-info">${model}<span class="close-message"><i class="fas fa-times"></i></span></p>`;
  }
}
