import { h } from 'virtual-dom';

import View from './view';
import App from './app';

import TeamCollection from '../collections/team';
import playerView from './player';

import { serializeObject } from '../utils';
import i18n from '../translate';

class PlayersTable extends View {
  get template() {
    return h('div.play-team', [
      h('h1', [
        h('span', i18n.t('Football match process')),
        h('span', this.collection.matchDate),
      ]),
      h('ol.players-list', this.collection.map(model => playerView(model))),
      // (localStorage.getItem('aggreeToGo') ? null : (
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
      ]),
      // )),
    ]);
  }

  initialize() {
    this.userModel = App.getUserModel();
    this.collection = new TeamCollection();
    this.collection.fetch();
    console.log(this.userModel);
    this.listenTo(this.collection, 'update', this.render);
  }

  addPlayer(e) {
    e.preventDefault();
    const data = serializeObject(e.target);
    data.uid = this.userModel.get('uid');
    if (!data.playersName) return;
    localStorage.setItem('myName', data.playersName);
    localStorage.setItem('aggreeToGo', true);
    e.target.reset();
    this.collection.create(data);
  }
}

export default PlayersTable;
