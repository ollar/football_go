import { h } from 'virtual-dom';
import moment from 'moment';

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
          h('span', moment(new Date(this.collection.matchDate)).locale('ru').format('DD MMMM'))
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

  initMatch() {
    this.collection.initGame();
    console.log(this.collection.url);
    this.render();
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

  initialize() {
    this.nextWed = moment().day(10).format('YYYY-MM-DD');
    this.collection = new TeamCollection();
    this.collection.fetch();
    this.listenTo(this.collection, 'update', this.render);
  }
}

export default PlayersTable;
