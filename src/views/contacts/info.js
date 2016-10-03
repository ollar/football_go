import { h } from 'virtual-dom';

function infoComponent() {
  return (
    h('div', [
      h('div', [
        h('b', 'Адрес: '),
        h('span', 'г. Санкт-Петербург, Уткин проспект, д. 15, м. Ладожская'),
      ]),
      h('div', [
        h('b', 'Телефон: '),
        h('tel', '(812) 992-91-05'),
      ]),
      h('div', [
        h('span', 'Наша группа Вконтакте '),
        h('a', { href: 'http://vk.com/nevafootball' }, 'http://vk.com/nevafootball'),
      ]),
    ])
  );
}

export default infoComponent;
