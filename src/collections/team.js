import PlayerModel from '../models/player';
import Api from '../api';

class TeamCollection extends Backbone.Collection {
  initialize(models, options) {
    Api.on(this.url, 'child_added', function(change) {
      const child = change.val();

      if (!this.get(change.key)) {
        this.add({
          name: change.key,
          flag: child.flag,
          playersName: child.playersName,
          uid: child.uid,
        });
      }
    }.bind(this));
    Api.on(this.url, 'child_changed', (a) => console.log(a.val()));
    Api.on(this.url, 'child_removed', function(change) {
      this.remove(change.key);
    }.bind(this));
    Api.on(this.url, 'child_moved', (a) => console.log(a.val()));
  }

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
