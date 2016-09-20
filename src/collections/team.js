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
    return TeamCollection.formatDate(TeamCollection.nextWednesday);
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

  static get nextWednesday() {
    const todayDay = new Date().getDay();
    const today = new Date();

    const dayDelta = () => {
      if (todayDay < 4) return 3 - todayDay;
      return 10 - todayDay;
    };

    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayDelta());
  }

  static formatDate(date) {
    const dateArr = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

    return `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`;
  }

  parse(data) {
    return Object.keys(data).map(key => Object.assign({}, { name: key }, data[key]));
  }
}

export default TeamCollection;
