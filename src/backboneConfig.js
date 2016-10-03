/* eslint */
import Backbone from 'backbone';

function checkStatus(response) {
  console.log(response.status);

  if (response.ok) {
    return response;
  }

  const error = new Error(response.statusText);
  try {
    error.response = response.json();
  } catch (e) {
    error.response = response.text();
  }

  throw error;
}

function parseJSON(response) {
  let res;

  try {
    res = response.json();
  } catch (e) {
    res = response.text();
  }

  return res;
}

Backbone.ajax = function backboneAjax(options) {
  return fetch(options.url, {
    method: options.type,
    body: options.data,
  }).then(checkStatus).then(parseJSON).then(options.success, options.error);
};

export default Backbone;
