import { onMounted, onUnmounted } from "vue";

export function useRangeClass(color: number) {
  let className;

  switch (color) {
    case 1:
      className = "slider slider-thumb slider-thumb:border-3 slider-thumb:border-ctp-blue slider-thumb:bg-ctp-blue";
      break;
    case 2:
      className = "slider slider-thumb slider-thumb:border-3 slider-thumb:border-ctp-red slider-thumb:bg-ctp-red";
      break;
    case 3:
      className = "slider slider-thumb slider-thumb:border-3 slider-thumb:border-ctp-green slider-thumb:bg-ctp-green";
      break;
    default:
      className = "slider slider-thumb slider-thumb:border-3 slider-thumb:border-ctp-rosewater slider-thumb:bg-ctp-rosewater";
      break;
  }

  return className;
}

export function useTrackClass(color: number): string {
  let className;


  switch (color) {
  case 1:
    className = "absolute h-2 bg-ctp-blue rounded-md";
    break;
  case 2:
    className = "absolute h-2 bg-ctp-red rounded-md";
    break;
  case 3:
    className = "absolute h-2 bg-ctp-green rounded-md";
    break;
  default:
    className = "absolute h-2 bg-ctp-rosewater rounded-md";
    break;
  }

  return className;
}

export function updateTrack(track: HTMLElement, leftH: number, rightH: number, max: number, min: number) {
  let minH = Math.min(leftH, rightH);
  let maxH = Math.max(leftH, rightH);

  let ratio = (max) - min;
  let minPercent = ((minH - min) / ratio) * 100;
  let maxPercent = ((maxH - min) / ratio) * 100;

  track.style.left = `${minPercent}%`;
  track.style.right = `${100 - maxPercent}%`;
}