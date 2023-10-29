export function useLongpress() {
  return function (callback: () => void) {
    let timeout: number;
    let preventClick = false;

    function start() {
      timeout = setTimeout(() => {
        preventClick = true;
        callback();
      }, 500);
    }

    function clear() {
      timeout && clearTimeout(timeout);
      preventClick = false;
    }

    function clickCaptureHandler(e: { stopPropagation: Event['stopPropagation'] }) {
      if (preventClick) {
        e.stopPropagation();
        preventClick = false;
      }
    }

    return {
      onMouseDown: start,
      onTouchStart: start,
      onMouseUp: clear,
      onMouseLeave: clear,
      onTouchMove: clear,
      onTouchEnd: clear,
      onClickCapture: clickCaptureHandler,
    };
  };
}
