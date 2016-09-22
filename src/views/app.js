import firebase from 'firebase';

import { create } from 'virtual-dom';

const App = (function App() {
  const userModel = new Backbone.Model();
  let rootNode;

  function attach(el, View) {
    const tree = new View().render();
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
  }

  return {
    initialize,
    userModel,
    attach,
    getRootNode: () => rootNode,
    getUserModel: () => userModel,
  };
}());

export default App;
