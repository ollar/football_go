import { h } from 'virtual-dom';

import View from '../view';
import App from '../../app';

import TeamCollection from '../../collections/team';

import playersListComponent from './playersList';
import newPlayerFormComponent from './newPlayerForm';
import titleComponent from './title';
import footerComponent from './footer';

import { serializeObject } from '../../utils';

let teamCollection;

class PlayersTable extends View {
  get template() {
    return h('div.play-team.center-wrapper', [
      titleComponent({
        collection: this.collection,
      }),
      playersListComponent({
        collection: this.collection,
        userModel: this.userModel,
      }),
      newPlayerFormComponent({
        userModel: this.userModel,
        collection: this.collection,
        addPlayer: this.addPlayer.bind(this),
        editName: this.editName.bind(this),
      }),
      footerComponent(),
    ]);
  }

  constructor(options) {
    super(options);
    this.userModel = App.getUserModel();

    if (!teamCollection) {
      teamCollection = new TeamCollection();
    }
    this.collection = teamCollection;

    this.listenTo(this.collection, 'update', this.render);
    this.listenTo(this.userModel, 'change', this.render);
  }

  addPlayer(e) {
    e.preventDefault();
    const data = serializeObject(e.target);
    data.uid = this.userModel.get('uid');
    if (!data.playersName) return;
    localStorage.setItem('myName', data.playersName);
    e.target.reset();
    this.collection.create(data, { wait: true });
  }

  editName() {
    localStorage.removeItem('myName');
    this.render();
  }
}

export default PlayersTable;
