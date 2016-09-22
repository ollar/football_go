import { h, diff, patch } from 'virtual-dom';

import App from './app';

class View extends Backbone.View {
  get template() {
    return h('div');
  }

  update() {
    const rootNode = App.getRootNode();
    const tree = this.template;
    const patches = diff(this.tree, tree);
    patch(rootNode, patches);
    this.tree = tree;
  }

  attach() {
    this.tree = this.template;
    return this.tree;
  }

  render() {
    if (this.tree) {
      return this.update();
    }
    return this.attach();
  }
}

export default View;
