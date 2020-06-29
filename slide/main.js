function renderOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('layer', 'overlay', 'flex-center');
  overlay.innerText = 'This is overlay';

  const threshold = 100;

  const openedOverlayHeight = window.innerHeight * 0.8;
  const closedOverlayHeight = 50;

  overlay.style.height = openedOverlayHeight;
  const initTranslateY = openedOverlayHeight - closedOverlayHeight;
  overlay.style.transform = `translateY(${initTranslateY}px)`;

  let startPositionY = 0;
  let endPositionY = 0;
  let isOverlayOpen = false;

  function handleTouchstart(e) {
    e.preventDefault();
    const classList = overlay.classList;
    classList.add("touch-start");
    startPositionY = e.touches[0].pageY;
  }

  function handleTouchmove(e) {
    e.preventDefault();
    const diff = e.touches[0].pageY - startPositionY
    if (diff === 0
      || (isOverlayOpen && diff < 0)
      || (!isOverlayOpen && diff > 0)
    ) {
      return;
    }

    const distance = Math.abs(diff);
    if (isOverlayOpen) {
      overlay.style.transform = `translateY(${Math.min(initTranslateY, distance)}px)`;
    } else {
      overlay.style.transform = `translateY(${Math.max(0, initTranslateY - distance)}px)`;
    }

    const classList = overlay.classList;
    if (classList.contains("touch-start")) {
      classList.remove("touch-start");
    }
    if (classList.contains("touch-end")) {
      classList.remove("touch-end");
    }
    if (!classList.contains("touch-move")) {
      classList.add("touch-move");
    }
  }

  function handleTouchend(e) {
    e.preventDefault();
    endPositionY = e.changedTouches[0].pageY;
    const diff = endPositionY - startPositionY;
    if (diff === 0
      || (isOverlayOpen && diff < 0)
      || (!isOverlayOpen && diff > 0)
    ) {
      return;
    }

    const classList = overlay.classList;
    if (classList.contains("touch-move")) {
      classList.remove("touch-move")
    };

    if (Math.abs(endPositionY - startPositionY) < threshold) {
      if (isOverlayOpen) {
        overlay.style.transform = `translateY(0)`;
      } else {
        overlay.style.transform = `translateY(${initTranslateY}px)`;
      }
      return;
    }

    if (isOverlayOpen) {
      overlay.style.transform = `translateY(${initTranslateY}px)`;
      isOverlayOpen = false;
    } else {
      overlay.style.transform = `translateY(0)`;
      isOverlayOpen = true;
    }

    classList.add("touch-end");
  }

  overlay.addEventListener("touchstart", handleTouchstart, false);
  overlay.addEventListener("touchmove", handleTouchmove, false);
  overlay.addEventListener("touchend", handleTouchend, false);

  const container = document.getElementById('layer-container');
  if (container) {
    container.append(overlay);
  }
}

renderOverlay();