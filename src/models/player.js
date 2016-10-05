class PlayerModel extends Backbone.Model {
  get defaults() {
    return {
      playersName: 'Ronaldo',
      flag: 'ru',
    };
  }

  get idAttribute() {
    return 'name';
  }
}

export default PlayerModel;
