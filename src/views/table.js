import { h, create, diff, patch } from 'virtual-dom';

import TeamCollection from '../collections/team';
import PlayerView from './player';

import { serializeObject } from '../utils';
import i18n from '../translate';

class PlayersTable extends Backbone.View {
  get template() {
    return h('div.play-team', [
      h('span', i18n.t('Football match process')),
      h('ul.players-list', this.collection.map(model => new PlayerView({ model }).render())),
      h('form', { onsubmit: this.addPlayer.bind(this) }, [
        h('input', { type: 'text', name: 'name', placeholder: 'foo' }),
        h('button.submit-go', 'submit go'),
      ]),
    ]);
  }

  addPlayer(e) {
    e.preventDefault();
    const data = serializeObject(e.target);
    e.target.reset();
    this.collection.add(data);
  }

  initialize() {
    this.collection = new TeamCollection();
    this.listenTo(this.collection, 'update', this.update);
  }

  update() {
    const tree = this.template;
    const patches = diff(this.tree, tree);
    patch(this.rootNode, patches);
    this.tree = tree;
  }

  render() {
    this.tree = this.template;
    this.rootNode = create(this.tree);
    document.getElementById('app').appendChild(this.rootNode);
  }
}

export default PlayersTable;
