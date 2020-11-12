function isPoint(a) {
  return a !== null
    && typeof a === 'object'
    && typeof a.x === 'number'
    && typeof a.y === 'number';
}

function isPointEqul(a, b) {
  if (!isPoint(a) || !isPoint(b)) {
    throw new Error('a, or b is not a point');
  } else {
    return a.x === b.y && a.y === b.y;
  }
}

function makePoint(x, y) {
  if (isPoint(x)) {
    return ({ x: x.x, y: x.y });
  } else if (typeof x !== 'number' || typeof y !== 'number') {
    throw new Error('x, or y is not a number');
  } else {
    return ({ x, y })
  }
}

function pointAdd(a, b, ignore) {
  if (!isPoint(a) || !isPoint(b)) {
    throw new Error('a, or b is not a point');
  } else {
    return ({
      x: ignore === 'X' ? a.x : a.x + b.x,
      y: ignore === 'Y' ? a.y : a.y + b.y
    });
  }
}

function pointSub(a, b, ignore) {
  if (!isPoint(a) || !isPoint(b)) {
    throw new Error('a, or b is not a point');
  } else {
    return ({
      x: ignore === 'X' ? a.x : a.x - b.x,
      y: ignore === 'Y' ? a.y : a.y - b.y
    });
  }
}

function pointToString(p) {
  if (isPoint(p)) {
    console.log(`x: ${p.x}, y: ${p.y}`);
  }
}

let isMoving = false;
let holdPoint = makePoint(0, 0);
let touchOrigin = makePoint(0, 0);
const direction = 'all' // 有效值 'horizontal' || 'vertical' || 'all'

const movableView = document.querySelector('.movable-view');
const movableArea = document.querySelector('.movable-area');

function moveTo(p) {
  if (isPoint(p)) {
    movableView.style.transform = `translate(${p.x}px, ${p.y}px)`;
  } else {
    return null;
  }
}

function isOutOfBound(containerElem, innerElem) {
  const containerElemRect = containerElem.getBoundingClientRect();
  const innerElemRect = innerElem.getBoundingClientRect();
  return containerElemRect.top > innerElemRect.top
    || containerElemRect.right < innerElemRect.right
    || containerElemRect.bottom < innerElemRect.bottom
    || containerElemRect.left > innerElemRect.left
}

function handleTouchstart(e) {
  e.preventDefault();
  const touchPoint = e.touches[0];
  touchOrigin = makePoint(touchPoint.pageX, touchPoint.pageY);
  isMoving = true;
}

function handleTouchmove(e) {
  e.preventDefault();
  
  const ignoreMap = {
    horizontal: 'X',
    vertical: 'Y',
    all: '',
  }

  const ignore = ignoreMap[direction];
  const touchPoint = makePoint(e.touches[0].pageX, e.touches[0].pageY);
  const nextHoldPoint = pointAdd(holdPoint, pointSub(touchPoint, touchOrigin, ignore), ignore);
  const nextTouchOrigin = makePoint(touchPoint);

  holdPoint = nextHoldPoint;
  touchOrigin = nextTouchOrigin;

  // if (isOutOfBound(movableArea, movableView)) {
  //   return null;
  // }else {
  // }
  moveTo(holdPoint);
  pointToString(holdPoint);
}

function handleTouchend(e) {
  e.preventDefault();
  isMoving = true;
}

movableView.addEventListener("touchstart", handleTouchstart, false);
movableView.addEventListener("touchmove", handleTouchmove, false);
movableView.addEventListener("touchend", handleTouchend, false);

// 超出可移动区域处理