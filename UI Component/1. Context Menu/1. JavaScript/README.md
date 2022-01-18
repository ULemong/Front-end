1. 모든 item에 이벤트 핸들러 등록

```javascript
const items = document.querySelectorAll('.item');

items.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('open');
    items.forEach(elem => {
      if (elem !== item) elem.classList.remove('open');
    });
  });
});
```

- 단점
  - 이벤트 감지 대상이 너무 많음 (모든 item에 이벤트가 등록되어 있음) -> **성능 저하 발생**
  - 목록이 변경될 수 있음 -> 새로운 item 추가할 때마다 이벤트 등록해야 함

<br> 
 
2. wrapper, body 이벤트 핸들러 2개 등록
```javascript
const wrapper = document.querySelector('.wrapper');
const items = document.querySelectorAll('.item');

wrapper.addEventListener('click', e => {
const targetElem = e.target;
e.stopPropagation(); // 버블링 막기
/_ wrapper에서 버블링이 발생하기 때문에 context open 후 바로 close 되어 눈에 보이지 X
-> e.stopPropagation() 작성 _/

if (!targetElem.classList.contains('item')) return;
targetElem.classList.toggle('open');

items.forEach(elem => {
if (elem !== targetElem) elem.classList.remove('open');
});
});

document.body.addEventListener('click', e => {
if (e.target.classList.contains('context')) return;
items.forEach(elem => {
elem.classList.remove('open');
});
});

````

- **`e.stopPropagation()`** VS **`e.preventDefault()`**
- 이벤트 전파
  - 캡쳐링: 이벤트가 상위 요소 -> 하위 요소 방향으로 전파
  - 버블링: 이벤트가 하위 요소 -> 상위 요소 방향으로 전파

<br>

3. 이벤트 핸들러 1개만 등록
```javascript
const items = document.querySelectorAll('.item');

document.body.addEventListener('click', e => {
  if (e.target.classList.contains('context')) return;

  // item 클릭
  if (e.target.classList.contains('item')) {
    e.target.classList.toggle('open');

    // 또 다른 item 클릭 시 기존 context 닫기
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

````

- 장점
  - 이벤트 등록을 줄일 수 있음
- 단점
  - 조건문이 많아짐
  - item 개별 관리가 힘듬
