class PlayerModel extends Backbone.Model {
  url() {
    return `${this.collection.urlBase}${this.get(this.idAttribute) ? '/' + this.get(this.idAttribute) : ''}.json`;
  }

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
