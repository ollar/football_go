import { h } from 'virtual-dom';
import playerView from '../player';

function playersListComponent(props) {
  return (
    h('ol.players-list', props.collection.map(model => playerView({
      model,
      userModel: props.userModel,
    })))
  );
}

export default playersListComponent;
