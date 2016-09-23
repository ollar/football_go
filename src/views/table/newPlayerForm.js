import { h } from 'virtual-dom';
import i18n from '../../translate';

function newPlayerFormComponent(props) {
  function alreadyInTeam() {
    return props.collection.find(model =>
      model.get('uid') === props.userModel.get('uid'));
  }

  if (alreadyInTeam()) return null;
  return (
    h('form.join-match', { onsubmit: props.addPlayer }, [
      (localStorage.getItem('myName') ? h('div.edit-name', {
        onclick: props.editName,
      }, i18n.t('edit name')) : null),
      h('input', {
        disabled: !!localStorage.getItem('myName'),
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
