import { h } from 'virtual-dom';

import View from '../view';

class Test extends View {
  get template() {
    return h('div', 'TEST');
  }
}

export default Test;
