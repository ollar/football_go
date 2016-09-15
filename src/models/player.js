class PlayerModel extends Backbone.Model {
  get defaults() {
    return {
      name: 'Ronaldo',
      flag: 'ru',
    };
  }
}

export default PlayerModel;
