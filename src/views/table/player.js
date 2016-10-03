import { h } from 'virtual-dom';

import i18n from '../../translate';

function playerView(props) {
  function onRemove() {
    if (props.model.get('uid') === props.userModel.get('uid')) {
      props.model.destroy();
    }
  }

  return (
    h('li.player', {
      key: props.model.get('name'),
      className: (props.model.get('uid') === props.userModel.get('uid') ? 'me' : ''),
    }, [
      h('span', props.model.get('playersName')),
      h('div.remove', { onclick: onRemove }, i18n.t('wont go')),
    ])
  );
}

export default playerView;
