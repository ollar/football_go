export function serializeObject(el) {
  const o = {};

  [...el.elements].forEach((item) => {
    if (item.name) {
      if (typeof o[item.name] !== 'undefined') {
        if (!o[item.name].push) {
          o[item.name] = [o[item.name]];
        }
        o[item.name].push(item.value || '');
      } else {
        o[item.name] = item.value || '';
      }
    }
  });

  return o;
}
