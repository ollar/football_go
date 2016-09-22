import App from './views/app';
import PlayersTable from './views/table/index';

App.initialize();
App.attach(document.getElementById('app'), PlayersTable);
