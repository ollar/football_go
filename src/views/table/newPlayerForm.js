import { h } from 'virtual-dom';
import i18n from '../../translate';

function newPlayerFormComponent(props) {
  function alreadyInTeam() {
    return props.collection.find(model =>
      model.get('uid') === props.userModel.get('uid'));
  }

  if (alreadyInTeam()) return null;
  return (
    h('form', { onsubmit: props.addPlayer }, [
      h('input', {
        style: (localStorage.getItem('myName') ? (
          {
            visibility: 'hidden',
            height: 0,
            width: 0,
          }
        ) : {}),
        type: 'text',
        name: 'playersName',
        placeholder: i18n.t('Type your name'),
        value: localStorage.getItem('myName'),
      }),
      h('button.submit-go', i18n.t('submit go')),
    ])
  );
}

export default newPlayerFormComponent;
