import { h } from 'virtual-dom';
import i18n from '../../translate';

function titleComponent(props) {
  return (
    h('h1', [
      h('span', i18n.t('Football match process')),
      h('span', props.collection.matchDate),
    ])
  );
}

export default titleComponent;
