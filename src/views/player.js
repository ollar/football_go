import { h } from 'virtual-dom';
import View from './view';

class PlayerView extends View {
  get template() {
    return h('li.player', [
      h('span', this.model.get('name')),
      h('div.remove', { onclick: this.onRemove.bind(this) }, 'remove'),
    ]);
  }

  onRemove() {
    this.model.destroy();
  }
}

export default PlayerView;
