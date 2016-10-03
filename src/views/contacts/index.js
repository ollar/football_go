import { h } from 'virtual-dom';

import View from '../view';
import i18n from '../../translate';

import infoComponent from './info';
import mapsComponent from './maps';

import footerComponent from '../table/footer';

class ContactsPage extends View {
  get template() {
    return h('.center-wrapper', [
      h('h1.page-title', i18n.t('Contacts')),
      infoComponent(),
      mapsComponent(),
      footerComponent(),
    ]);
  }
}

export default ContactsPage;
