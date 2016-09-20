import firebase from 'firebase';
import View from './view';
import PlayersTable from '../views/table';

class App extends View {
  initialize() {
    const config = {
      apiKey: 'AIzaSyAIbkLzp46HhDXBcMBmQiGXc6lbtWZ7l7s',
      authDomain: 'footballgo-fcfc3.firebaseapp.com',
      databaseURL: 'https://footballgo-fcfc3.firebaseio.com',
      storageBucket: 'footballgo-fcfc3.appspot.com',
      messagingSenderId: '421380806800',
    };

    this.user = new Backbone.Model();

    firebase.initializeApp(config);
    this.playersTable = new PlayersTable({
      userModel: this.user,
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user.set({
          isAnonymous: user.isAnonymous,
          uid: user.uid,
        });
      } else {
        this.user.set({});
        firebase.auth().signInAnonymously().catch((error) => {
          this.user.set({});
          console.log(`Sign in failure: ${error.code}: ${error.message}`);
        });
      }
    });
  }

  get template() {
    return this.playersTable.render();
  }
}

export default App;
