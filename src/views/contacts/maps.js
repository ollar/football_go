import { h } from 'virtual-dom';

function mapsComponent() {
  return (
    h('div.maps-wrapper', [
      h('div.map', [
        h('div', 'Схема проезда c пр.Энергетиков'),
        h('iframe.ym', {
          src: 'https://api-maps.yandex.ru/frame/v1/-/CZc2VR3z',
          height: 400,
          frameborder: 0,
        }),
      ]),
      h('div', [
        h('div', 'Схема проезда c Заневского пр.'),
        h('iframe.ym', {
          src: 'https://api-maps.yandex.ru/frame/v1/-/CZc2VDoM',
          height: 400,
          frameborder: 0,
        }),
      ]),
    ])
  );
}

export default mapsComponent;
