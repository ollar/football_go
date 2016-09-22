import { h } from 'virtual-dom';
import playerView from '../player';

export default function playersListComponent(collection) {
  return (
    h('ol.players-list', collection.map(model => playerView(model)))
  );
}
