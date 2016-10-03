import firebase from 'firebase';

import { h, create } from 'virtual-dom';

import AppRouter from './router';

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
    const config = {
      apiKey: 'AIzaSyAIbkLzp46HhDXBcMBmQiGXc6lbtWZ7l7s',
      authDomain: 'footballgo-fcfc3.firebaseapp.com',
      databaseURL: 'https://footballgo-fcfc3.firebaseio.com',
      storageBucket: 'footballgo-fcfc3.appspot.com',
      messagingSenderId: '421380806800',
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userModel.set({
          isAnonymous: user.isAnonymous,
          uid: user.uid,
        });
      } else {
        userModel.set({});
        firebase.auth().signInAnonymously().catch((error) => {
          userModel.set({});
          console.log(`Sign in failure: ${error.code}: ${error.message}`);
        });
      }
    });

    Backbone.history.start();
  }

  return {
    initialize,
    userModel,
    attach,
    getRootNode: () => rootNode,
    setRootNode: newRootNode => (rootNode = newRootNode),
    getUserModel: () => userModel,
    getRouter: () => appRouter,
    navigate: route => Backbone.history.navigate(route, true),
  };
}());

export default App;
