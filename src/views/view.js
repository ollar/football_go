import { h, diff, patch } from 'virtual-dom';

import App from '../app';

class View {
  get template() {
    return h('div');
  }

  constructor(...options) {
    if (this.initialize) this.initialize.call(this, options);
    this.rootNode = App.getRootNode();
  }

  update() {
    const tree = this.template;
    const patches = diff(this.tree, tree);
    patch(this.rootNode, patches);
    this.tree = tree;
    return this;
  }

  attach() {
    this.tree = this.template;
    const patches = diff(this.rootNode, this.tree);
    patch(this.rootNode, patches);
    return this;
  }

  render() {
    if (this.tree) {
      return this.update();
    }
    return this.attach();
  }
}

_.extend(View.prototype, Backbone.Events);

export default View;
