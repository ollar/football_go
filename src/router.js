import PlayersTable from './views/table';
import Test from './views/test';

class AppRouter extends Backbone.Router {
  get routes() {
    return {
      '': 'main',
      'test': 'test',
    };
  }

  main() {
    console.log('main');
    new PlayersTable().render();
  }

  test() {
    console.log('test');
    new Test().render();
  }
}

export default AppRouter;
