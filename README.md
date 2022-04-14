# simpl

## Goal

-   Vanilla JavaScript로 Virtual-DOM을 만들어보자.
-   간단한 카운터 앱을 만들어보자.

## 체크 리스트

-   [ ] React.createElement 함수를 통해 노드를 생성한다.
-   [ ] React.render 함수를 통해 Ream DOM을 변경한다.
-   [ ] 상태 변경이 일어난 노드 부터 diffing이 시작된다.
-   [ ] JSX를 코드를 자체 createElement 함수를 통해 객체로 변환한다.
-   [ ] V-DOM의 동작 원리를 이해한다.
-   [ ] V-DOM 비교를 통해 Real DOM을 변경한다.
-   [ ] Typescript로 마이그레이션을 완료했다.

## 🚴‍♀️ 삽질 log

### 0. Bottom up

아래의 3줄의 코드가 어떻게 JavaScript 코드로 변환 될지 고민해보자.

```js
const element = <h1 title="foo">Hello</h1>;
const container = document.getElementById('root');
ReactDOM.render(element, container);
```

### 1. JSX는 JavaScript 코드가 아니다.

```js
// JSX
<div> Hello World </div>;

// JavaScript (transformed by babel)
/*#__PURE__*/
React.createElement('div', null, ' Hello World ');
```

## Ref

-   [build-your-own-react](https://pomb.us/build-your-own-react/)
-   [build-your-own-react 번역 글](https://velog.io/@godori/build-your-own-react)
-   [gyeongseokseo 님의 virtual-dom slideshare](https://www.slideshare.net/gyeongseokseo/virtual-dom)
