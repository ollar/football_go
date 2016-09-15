import PlayerModel from '../models/player';

class TeamCollection extends Backbone.Collection {
  get model() {
    return PlayerModel;
  }
}

export default TeamCollection;
