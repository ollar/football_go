/* eslint-disable */
import Backbone from 'backbone';

function checkStatus(response) {
  console.log(response.status);

  if (response.ok) {
    return response;
  } else {
    let error = new Error(response.statusText);
    try {
      error.response = response.json();
    } catch (e) {
      error.response = response.text();
    }

    throw error;
  }
}

function parseJSON(response) {
  var _res;

  if (response.body) {
    try {
      _res = response.json();
    } catch (e) {
      _res = response.text();
    }
  } else {
    // if server just responds with status (like on DELETE action)
    return true;
  }

  return _res;
}

var paddedLt = /^\s*</;
Backbone.VERSION = '1.3.3.1';

Backbone.ajax = function(options) {
  return fetch(options.url, {
    method: options.type,
    body: options.data,
  }).then(checkStatus).then(parseJSON).then(options.success, options.error);
}

// Overrides
Backbone.View.prototype.$ = function(selector) {
  return this.el.querySelector(selector);
};

Backbone.View.prototype._removeElement = function() {
  this.undelegateEvents();
  if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
};

// Make a event delegation handler for the given `eventName` and `selector`
// and attach it to `this.el`.
// If selector is empty, the listener will be bound to `this.el`. If not, a
// new handler that will recursively traverse up the event target's DOM
// hierarchy looking for a node that matches the selector. If one is found,
// the event's `delegateTarget` property is set to it and the return the
// result of calling bound `listener` with the parameters given to the
// handler.
Backbone.View.prototype.delegate = function(eventName, selector, listener) {
  if (_.isFunction(selector)) {
    listener = selector;
    selector = null;
  }

  var root = this.el, handler;
  if (!selector) handler = listener;
  else handler = function (e) {
    var node = e.target || e.srcElement;
    for (; node && node != root; node = node.parentNode) {
      if (matchesSelector.call(node, selector)) {
        e.delegateTarget = node;
        return listener.apply(this, arguments);
      }
    }
  };

  elementAddEventListener.call(root, eventName, handler, false);
  this._domEvents.push({eventName: eventName, handler: handler, listener: listener, selector: selector});
  return handler;
};

// Remove all events created with `delegate` from `el`
Backbone.View.prototype.undelegateEvents = function() {
  if (this.el) {
    _.each(this._domEvents, function(item) {
      elementRemoveEventListener.call(this.el, item.eventName, item.handler, false);
    }, this);
    this._domEvents = [];
  }
  return this;
};

// Remove a single delegated event. Either `eventName` or `selector` must
// be included, `selector` and `listener` are optional.
Backbone.View.prototype.undelegate = function(eventName, selector, listener) {
  if (_.isFunction(selector)) {
    listener = selector;
    selector = null;
  }

  var handlers = this._domEvents;

  if (this.el) {
    _(handlers).chain()
      .filter(function(item) {
        return item.eventName === eventName &&
          (listener ? item.listener === listener : true) &&
          (selector ? item.selector === selector : true);
      })
      .forEach(function(item) {
        elementRemoveEventListener.call(this.el, item.eventName, item.handler, false);
        handlers.splice(_.indexOf(handlers, item), 1);
      }, this);
  }
  return this;
};

Backbone.View.prototype._setAttributes = function(attrs) {
  for (var attr in attrs) {
    attr in this.el ? this.el[attr] = attrs[attr] : this.el.setAttribute(attr, attrs[attr]);
  }
};

Backbone.View.prototype._setElement = function(element) {
  if (typeof element == 'string') {
    if (paddedLt.test(element)) {
      var el = document.createElement('div');
      el.innerHTML = element;
      this.el = el.firstChild;
    } else {
      this.el = document.querySelector(element);
    }
  } else {
    this.el = element;
  }
};

export default Backbone;
