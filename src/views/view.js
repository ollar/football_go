import { h, diff, patch } from 'virtual-dom';

import App from '../app';

class View {
  get template() {
    return h('div');
  }

  constructor(...options) {
    this.rootNode = App.getRootNode();
    this.initialize.call(this, ...options);
  }

  initialize() {}

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
    this.rootNode = patch(this.rootNode, patches);
    App.setRootNode(this.rootNode);
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
