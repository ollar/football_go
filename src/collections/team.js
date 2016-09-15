import PlayerModel from '../models/player';

class TeamCollection extends Backbone.Collection {
  get url() {
    return 'https://footballgo-fcfc3.firebaseio.com/players.json';
  }

  get model() {
    return PlayerModel;
  }

  parse(data) {
    return Object.keys(data).map((key) => {
      // console.log(data[key]);
      return Object.assign({}, { id: key }, data[key]);
    });
  }
}

export default TeamCollection;
