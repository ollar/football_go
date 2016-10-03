import { h } from 'virtual-dom';

import App from '../../app';

import i18n from '../../translate';

function footerComponent() {
  return (
    h('div.footer', [
      h('.link', { onclick: () => App.navigate('') }, i18n.t('Players Table')),
      h('.link', { onclick: () => App.navigate('contacts') }, i18n.t('Contacts')),
    ])
  );
}

export default footerComponent;
