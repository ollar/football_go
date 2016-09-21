import { h, diff, patch } from 'virtual-dom';

import View from './view';

import TeamCollection from '../collections/team';
import PlayerView from './player';

import { serializeObject } from '../utils';
import i18n from '../translate';

class PlayersTable extends View {
  get template() {
    return h('div.play-team', [
      h('h1', [
        h('span', i18n.t('Football match process')),
        (this.collection.matchDate ? (
          h('span', this.collection.matchDate)
        ) : (
          h('span', { onclick: this.initMatch.bind(this) }, '+')
        )),
      ]),
      h('ol.players-list', this.collection.map(model => new PlayerView({ model }).render())),
      (localStorage.getItem('aggreeToGo') ? null : (
        h('form', { onsubmit: this.addPlayer.bind(this) }, [
          h('input', {
            style: (localStorage.getItem('myName') ? (
              {
                visibility: 'hidden',
                height: 0,
                width: 0,
              }
            ) : {}),
            type: 'text',
            name: 'playersName',
            placeholder: i18n.t('Type your name'),
            value: localStorage.getItem('myName'),
          }),
          h('button.submit-go', i18n.t('submit go')),
        ])
      )),
    ]);
  }

  initialize(options) {
    this.app = options.app;
    this.collection = new TeamCollection();
    this.collection.fetch();
    this.listenTo(this.collection, 'update', this.render);
  }

  update() {
    const tree = this.template;
    const patches = diff(this.tree, tree);
    // patch(this.rootNode, patches);
    patch(this.app.rootNode, patches);
    this.tree = tree;
  }

  addPlayer(e) {
    e.preventDefault();
    const data = serializeObject(e.target);
    if (!data.playersName) return;
    localStorage.setItem('myName', data.playersName);
    localStorage.setItem('aggreeToGo', true);
    e.target.reset();
    this.collection.create(data);
  }
}

export default PlayersTable;
