import PlayerModel from '../models/player';

class TeamCollection extends Backbone.Collection {
  get matchDate() {
    return TeamCollection.formatDate(TeamCollection.nextWednesday);
  }

  get model() {
    return PlayerModel;
  }

  get url() {
    return `/players/${this.matchDate}/`;
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
