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
      if (!firebase) throw new Error('firebase not inited');

      return fn.call(this, ...args);
    };
  }

  function on(url, eventName, fn) {
    const ref = firebase.database().ref(url);
    ref.on(eventName, fn);
  }

  return {
    initialize,
    get: checkFirebaseDecorator(get),
    post: checkFirebaseDecorator(post),
    delete: checkFirebaseDecorator(del),

    on: checkFirebaseDecorator(on),
  };
}());

export default Api;
