import PlayersTable from './views/table';
import Test from './views/test';
import ContactsPage from './views/contacts';

class AppRouter extends Backbone.Router {
  constructor(options) {
    super(options);

    this.activeRoute = {};
  }

  get routes() {
    return {
      '': 'main',
      test: 'test',
      contacts: 'contacts',
    };
  }

  main() {
    this.activeRoute = new PlayersTable().render();
  }

  test() {
    this.activeRoute = new Test().render();
  }

  contacts() {
    this.activeRoute = new ContactsPage().render();
  }
}

export default AppRouter;
