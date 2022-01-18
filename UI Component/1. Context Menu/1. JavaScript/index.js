// Write Javascript code here!
const items = document.querySelectorAll('.item');

document.body.addEventListener('click', e => {
  if (e.target.classList.contains('context')) return;

  // item 클릭
  if (e.target.classList.contains('item')) {
    e.target.classList.toggle('open');

    // 또 다른 item 클릭 시 기존 context close
    items.forEach(elem => {
      if (elem !== e.target) elem.classList.remove('open');
    });
    return;
  }

  // 그 외의 부분 클릭
  items.forEach(elem => {
    elem.classList.remove('open');
  });
});
