import { h } from 'virtual-dom';

import View from './view';

import TeamCollection from '../collections/team';
import PlayerView from './player';

import { serializeObject } from '../utils';
import i18n from '../translate';

class PlayersTable extends View {
  get template() {
    return h('div.play-team', [
      h('h1', i18n.t('Football match process')),
      h('ol.players-list', this.collection.map(model => new PlayerView({ model }).render())),
      h('form', { onsubmit: this.addPlayer.bind(this) }, [
        h('input', { type: 'text', name: 'name', placeholder: i18n.t('Type your name') }),
        h('button.submit-go', i18n.t('submit go')),
      ]),
    ]);
  }

  addPlayer(e) {
    e.preventDefault();
    const data = serializeObject(e.target);
    e.target.reset();
    this.collection.create(data);
  }

  initialize() {
    this.collection = new TeamCollection();
    this.collection.fetch({success: (res) => console.log(res)});
    this.listenTo(this.collection, 'update', this.render);
  }
}

export default PlayersTable;
