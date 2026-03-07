import { onMounted, onUnmounted } from "vue";

export function useRangeClass(color: number): string[] {
  let classes = [
    "slider",
    "slider-thumb",
    "slider-thumb:border-3",
    "hover:slider-thumb:ring-10"
  ];

  switch (color) {
    case 1:
      classes.push("slider-thumb:border-ctp-blue", "slider-thumb:bg-ctp-blue");
      classes.push("hover:slider-thumb:ring-ctp-blue/10");
      break;
    case 2:
      classes.push("slider-thumb:border-ctp-red", "slider-thumb:bg-ctp-red");
      classes.push("hover:slider-thumb:ring-ctp-red/10");
      break;
    case 3:
      classes.push("slider-thumb:border-ctp-green", "slider-thumb:bg-ctp-green");
      classes.push("hover:slider-thumb:ring-ctp-green/10");
      break;
    default:
      classes.push("slider-thumb:border-ctp-rosewater", "slider-thumb:bg-ctp-rosewater");
      classes.push("hover:slider-thumb:ring-ctp-rosewater/10");
      break;
  }

  return classes;
}

export function useTrackClass(color: number): string[] {
  let classes = [
    "absolute",
    "h-2",
    "rounded-md"
  ];


  switch (color) {
  case 1:
    classes.push("bg-ctp-blue");
    break;
  case 2:
    classes.push("bg-ctp-red");
    break;
  case 3:
    classes.push("bg-ctp-green");
    break;
  default:
    classes.push("bg-ctp-rosewater");
    break;
  }

  return classes;
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