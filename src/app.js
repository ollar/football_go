import firebase from 'firebase';

import { h, create } from 'virtual-dom';

import AppRouter from './router';
import Api from './api';

const App = (function App() {
  const userModel = new Backbone.Model();
  let rootNode;

  const template = h('div', 'test');
  const appRouter = new AppRouter();

  function attach(el) {
    const tree = template;
    rootNode = create(tree);
    el.appendChild(rootNode);
  }

  function initialize() {
    firebase.initializeApp(firebaseConnect);
    Api.initialize(firebase);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userModel.set({
          isAnonymous: user.isAnonymous,
          uid: user.uid,
        });
      } else {
        userModel.set({});
        localStorage.removeItem('token');
        firebase.auth().signInAnonymously().catch((error) => {
          userModel.set({});
          localStorage.removeItem('token');
          console.log(`Sign in failure: ${error.code}: ${error.message}`);
        });
      }
    });

    Backbone.history.start();
  }

  /**
   * Connect collection to FireBase events.
   * @param  {Backbone.Collection} context - Collection context
   */
  function liveCollection(context) {
    const url = context.url;
    if (!url) throw new Error('Collection url required');
    Api.listenFBEvents.call(this, url);

    context.listenTo(this, `${url}:child_added`, (change) => {
      const child = change.val();

      if (!context.get(change.key)) {
        context.add({
          name: change.key,
          flag: child.flag,
          playersName: child.playersName,
          uid: child.uid,
        });
      }
    });

    context.listenTo(this, `${url}:child_changed`, (change) => {
      console.log(`${url}:child_changed`, change.val());
    });

    context.listenTo(this, `${url}:child_removed`, (change) => {
      context.remove(change.key);
    });

    context.listenTo(this, `${url}:child_moved`, (change) => {
      console.log(`${url}:child_moved`, change.val());
    });
  }

  return {
    initialize,
    userModel,
    attach,
    liveCollection,
    getRootNode: () => rootNode,
    setRootNode: newRootNode => (rootNode = newRootNode),
    getUserModel: () => userModel,
    getRouter: () => appRouter,
    navigate: route => Backbone.history.navigate(route, true),
  };
}());

Object.assign(App, Backbone.Events);

export default App;
