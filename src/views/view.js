import { h, create, diff, patch } from 'virtual-dom';
import Backbone from 'backbone';

console.log(Backbone);

class View extends Backbone.View {
  get template() {
    return h('div');
  }

  update() {
    const tree = this.template;
    const patches = diff(this.tree, tree);
    patch(this.rootNode, patches);
    this.tree = tree;
  }

  attach() {
    this.tree = this.template;
    this.rootNode = create(this.tree);
    if (this.el.parentNode) {
      return this.el.appendChild(this.rootNode);
    }
    return this.tree;
  }

  render() {
    if (this.rootNode) {
      return this.update();
    }
    return this.attach();
  }
}

export default View;
