import moment from 'moment';
import PlayerModel from '../models/player';

class TeamCollection extends Backbone.Collection {
  get apiBase() {
    return 'https://footballgo-fcfc3.firebaseio.com';
  }
  get urlBase() {
    return `${this.apiBase}/players/${this.matchDate}`;
  }

  get url() {
    return `${this.urlBase}.json`;
  }

  get matchDate() {
    return moment().day(10).format('YYYY-MM-DD');
  }

  initMatch() {
    fetch(`${this.urlBase}.json`, {
      method: 'POST',
      body: {},
    });
  }

  get model() {
    return PlayerModel;
  }

  parse(data) {
    console.log(data);
    return Object.keys(data).map(key => Object.assign({}, { name: key }, data[key]));
  }
}

export default TeamCollection;
