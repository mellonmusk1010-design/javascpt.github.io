// 한글 변수 써도 되나?????????
// 모르겠다 걍 쓰자 영어 너무 어렵다

// canvas를 가져온다.
let 캔버스 = document.querySelector("#graphCanvas");
let 붓 = 캔버스.getContext("2d");

// HTML 요소들을 가져온다.
let 폼 = document.querySelector("#functionForm");
let 초기화버튼 = document.querySelector("#resetButton");
let 함수식글자 = document.querySelector("#formulaText");
let 확대글자 = document.querySelector("#zoomText");

// 계수 입력칸을 가져온다.
let a입력 = document.querySelector("#aInput");
let b입력 = document.querySelector("#bInput");
let c입력 = document.querySelector("#cInput");
let d입력 = document.querySelector("#dInput");
let e입력 = document.querySelector("#eInput");

// 확대 정도를 저장하는 변수이다.
let 확대 = 1;

// 입력칸의 값을 숫자로 바꿔주는 함수이다.
function 숫자로바꾸기(입력칸) {
  let 숫자 = Number(입력칸.value);

  if (isNaN(숫자)) {
    숫자 = 0;
  }

  return 숫자;
}

// x값을 넣으면 y값을 계산하는 함수이다.
function y값구하기(x) {
  let a = 숫자로바꾸기(a입력);
  let b = 숫자로바꾸기(b입력);
  let c = 숫자로바꾸기(c입력);
  let d = 숫자로바꾸기(d입력);
  let e = 숫자로바꾸기(e입력);

  let y = a * x * x * x * x;
  y = y + b * x * x * x;
  y = y + c * x * x;
  y = y + d * x;
  y = y + e;

  return y;
}

// 현재 함수식을 화면에 보여준다.
function 함수식보여주기() {
  let a = 숫자로바꾸기(a입력);
  let b = 숫자로바꾸기(b입력);
  let c = 숫자로바꾸기(c입력);
  let d = 숫자로바꾸기(d입력);
  let e = 숫자로바꾸기(e입력);

  // 식을 어렵게 정리하지 않고 그대로 보여준다.
  함수식글자.textContent = "y = " + a + "x⁴ + " + b + "x³ + " + c + "x² + " + d + "x + " + e;
  확대글자.textContent = "확대: " + 확대.toFixed(1) + "배";
}

// canvas 크기를 화면 크기에 맞춘다.
function 캔버스크기맞추기() {
  캔버스.width = 캔버스.clientWidth;
  캔버스.height = 캔버스.clientHeight;
}

// 좌표평면을 그리는 함수이다.
function 좌표평면그리기(가운데X, 가운데Y, 간격) {
  let 가로 = 캔버스.width;
  let 세로 = 캔버스.height;

  // 화면을 지운다.
  붓.clearRect(0, 0, 가로, 세로);

  // 선을 그린다.
  붓.lineWidth = 1;
  붓.strokeStyle = "#e2e8f0";

  for (let x = 가운데X; x < 가로; x = x + 간격) {
    붓.beginPath();
    붓.moveTo(x, 0);
    붓.lineTo(x, 세로);
    붓.stroke();
  }

  for (let x = 가운데X; x > 0; x = x - 간격) {
    붓.beginPath();
    붓.moveTo(x, 0);
    붓.lineTo(x, 세로);
    붓.stroke();
  }

  for (let y = 가운데Y; y < 세로; y = y + 간격) {
    붓.beginPath();
    붓.moveTo(0, y);
    붓.lineTo(가로, y);
    붓.stroke();
  }

  for (let y = 가운데Y; y > 0; y = y - 간격) {
    붓.beginPath();
    붓.moveTo(0, y);
    붓.lineTo(가로, y);
    붓.stroke();
  }

  // x축과 y축을 그린다.
  붓.lineWidth = 2;
  붓.strokeStyle = "#222222";
  붓.beginPath();
  붓.moveTo(0, 가운데Y);
  붓.lineTo(가로, 가운데Y);
  붓.moveTo(가운데X, 0);
  붓.lineTo(가운데X, 세로);
  붓.stroke();
}

// 그래프를 그리는 함수이다.
function 그래프그리기() {
  캔버스크기맞추기();
  함수식보여주기();

  let 가로 = 캔버스.width;
  let 세로 = 캔버스.height;
  let 가운데X = 가로 / 2;
  let 가운데Y = 세로 / 2;
  let 간격 = 35 * 확대;

  좌표평면그리기(가운데X, 가운데Y, 간격);

  // 함수 그래프 선 색과 굵기를 정한다.
  붓.lineWidth = 3;
  붓.strokeStyle = "#dc2626";
  붓.beginPath();

  let 처음점 = true;

  // 왼쪽부터 오른쪽까지 1픽셀씩 이동하면서 그래프를 그린다.
  for (let 화면X = 0; 화면X <= 가로; 화면X = 화면X + 1) {
    let 수학X = (화면X - 가운데X) / 간격;
    let 수학Y = y값구하기(수학X);
    let 화면Y = 가운데Y - 수학Y * 간격;

    if (화면Y > -세로 && 화면Y < 세로 * 2) {
      if (처음점 === true) {
        붓.moveTo(화면X, 화면Y);
        처음점 = false;
      } else {
        붓.lineTo(화면X, 화면Y);
      }
    } else {
      처음점 = true;
    }
  }

  붓.stroke();
}

// 초기화 버튼을 눌렀을 때 실행되는 함수이다.
function 초기화하기() {
  a입력.value = 0;
  b입력.value = 0;
  c입력.value = 1;
  d입력.value = 0;
  e입력.value = 0;
  확대 = 1;

  그래프그리기();
}

// 그래프 그리기 버튼을 눌렀을 때 실행된다.
폼.addEventListener("submit", function(event) {
  event.preventDefault();
  그래프그리기();
});

// 입력값이 바뀌면 그래프를 다시 그린다.
a입력.addEventListener("input", 그래프그리기);
b입력.addEventListener("input", 그래프그리기);
c입력.addEventListener("input", 그래프그리기);
d입력.addEventListener("input", 그래프그리기);
e입력.addEventListener("input", 그래프그리기);

// 초기화 버튼 기능이다.
초기화버튼.addEventListener("click", 초기화하기);

// 마우스 휠로 확대와 축소를 한다.
캔버스.addEventListener("wheel", function(event) {
  event.preventDefault();

  if (event.deltaY < 0) {
    확대 = 확대 + 0.1;
  } else {
    확대 = 확대 - 0.1;
  }

  if (확대 < 0.4) {
    확대 = 0.4;
  }

  if (확대 > 5) {
    확대 = 5;
  }

  그래프그리기();
});

// 창 크기가 바뀌면 그래프도 다시 그린다.
window.addEventListener("resize", 그래프그리기);

// 페이지가 처음 열렸을 때 그래프를 그린다.
그래프그리기();
