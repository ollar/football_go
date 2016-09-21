import { h } from 'virtual-dom';
import View from './view';

import PlayerModel from '../models/player';
import i18n from '../translate';

class PlayerView extends View {
  constructor(options) {
    super(options);

    this.model = new PlayerModel();
  }
  get template() {
    return (
      h('li.player', { key: this.model.get('name') }, [
        h('span', this.model.get('playersName')),
        h('div.remove', { onclick: this.onRemove.bind(this) }, i18n.t('wont go')),
      ])
    );
  }

  setModel(model) {
    this.model.set(model.toJSON());
    return this;
  }

  onRemove() {
    localStorage.removeItem('aggreeToGo');
    this.model.destroy();
  }
}

export default PlayerView;
