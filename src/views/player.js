import { h } from 'virtual-dom';
import View from './view';

import i18n from '../translate';

class PlayerView extends View {
  get template() {
    return (
      h('li.player', { key: this.model.get('name') }, [
        h('span', this.model.get('playersName')),
        h('div.remove', { onclick: this.onRemove.bind(this) }, i18n.t('wont go')),
      ])
    );
  }

  onRemove() {
    localStorage.removeItem('aggreeToGo');
    this.model.destroy();
  }
}

export default PlayerView;
