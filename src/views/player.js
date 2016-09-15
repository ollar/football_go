import { h } from 'virtual-dom';

class PlayerView extends Backbone.View {
  get template() {
    return h('li', [
      h('span', this.model.get('name')),
      h('div.remove', { onclick: this.onRemove.bind(this) }, 'remove'),
    ]);
  }

  onRemove() {
    this.model.destroy();
  }

  render() {
    return this.template;
  }
}

export default PlayerView;
