import App from './views/app';
import PlayersTable from './views/table';

App.initialize();
App.attach(document.getElementById('app'), PlayersTable);
