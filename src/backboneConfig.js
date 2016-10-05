/* eslint */
import Backbone from 'backbone';
import Api from './api';

function parseVal(response) {
  return response.val();
}

Backbone.ajax = function backboneAjax(options) {
  return Api[options.type.toLowerCase()](options.url, options.data)
    .then(parseVal)
    .then(options.success, options.error);
};

export default Backbone;
