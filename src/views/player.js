import { h } from 'virtual-dom';

import i18n from '../translate';

function playerView(model) {
  function onRemove() {
    localStorage.removeItem('aggreeToGo');
    model.destroy();
  }

  return (
    h('li.player', { key: model.get('name') }, [
      h('span', model.get('playersName')),
      h('div.remove', { onclick: onRemove }, i18n.t('wont go')),
    ])
  );
}

export default playerView;
