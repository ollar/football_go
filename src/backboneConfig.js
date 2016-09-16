import Backbone from 'backbone';

console.log(Backbone);

// Overrides
Backbone.View.prototype.$ = function(selector) {
  console.log('asd');
  return this.el.querySelector(selector);
};

export default Backbone;
