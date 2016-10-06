

const Api = (function Api() {
  let firebase;

  function initialize(fb) {
    firebase = fb;
  }

  function get(url) {
    return firebase.database().ref(url).once('value');
  }

  function post(url, data) {
    return firebase.database().ref().child(url).push(JSON.parse(data));
  }

  function del(url) {
    return firebase.database().ref(url).remove();
  }

  function checkFirebaseDecorator(fn) {
    return function apiMethod(...args) {
      if (!firebase) throw new Error('Firebase SDK not inited');

      return fn.call(this, ...args);
    };
  }

  /**
   * Attach to FireBase events
   * @param  {String} url - url of FB entity
   */
  function listenFBEvents(url) {
    const ref = firebase.database().ref(url);
    ref.on('child_added', change =>
      this.trigger(`${url}:child_added`, change)
    );

    ref.on('child_changed', change =>
      this.trigger(`${url}:child_changed`, change)
    );

    ref.on('child_removed', change =>
      this.trigger(`${url}:child_removed`, change)
    );

    ref.on('child_moved', change =>
      this.trigger(`${url}:child_moved`, change)
    );
  }

  return {
    initialize,
    get: checkFirebaseDecorator(get),
    post: checkFirebaseDecorator(post),
    delete: checkFirebaseDecorator(del),

    listenFBEvents: checkFirebaseDecorator(listenFBEvents),
  };
}());

export default Api;
