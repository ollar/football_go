class PlayerModel extends Backbone.Model {
  url() {
    return `${this.collection.urlBase}${this.get(this.idAttribute) ?
      (`/${this.get(this.idAttribute)}`) : ''}.json?auth=${this.token}`;
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

  get token() {
    return localStorage.getItem('token');
  }
}

export default PlayerModel;
