import { h } from 'virtual-dom';
import i18n from '../../translate';

function titleComponent(props) {
  function humanizeDate(date) {
    const monthsDict = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    };

    const dateArr = date.split('-');

    return `${dateArr[2]} ${i18n.t(monthsDict[dateArr[1]])}`;
  }

  return (
    h('h1', [
      h('span', i18n.t('Football match process')),
      h('span', humanizeDate(props.collection.matchDate)),
    ])
  );
}

export default titleComponent;
