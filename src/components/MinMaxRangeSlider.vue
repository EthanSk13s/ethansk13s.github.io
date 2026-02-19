<script setup lang="ts">
import { onMounted, useId } from 'vue';

const inputId = useId();
const minRangeId = `min-range-${inputId}`;
const maxRangeId = `max-range-${inputId}`;
const rangeTrackId = `track-${inputId}`;

const leftHandle = defineModel<number>('leftHandle');
const rightHandle = defineModel<number>('rightHandle');

const { min, max, trackWidth, color = 0 } = defineProps<{
  min: number
  max: number
  trackWidth: number
  color?: number
}>()

const trackStyle = `max-width: ${trackWidth}px;`

function createRangeClass(color: number) {
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

function createTrackClass(color: number) {
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

function updateTrack(track: HTMLElement, leftH: number, rightH: number) {
  let minH = Math.min(leftH, rightH);
  let maxH = Math.max(leftH, rightH);

  let ratio = (max) - min;
  let minPercent = ((minH - min) / ratio) * 100;
  let maxPercent = ((maxH - min) / ratio) * 100;

  track.style.left = `${minPercent}%`;
  track.style.right = `${100 - maxPercent}%`;
}

onMounted(() => {
  const minRange = document.getElementById(minRangeId) as HTMLInputElement;
  const maxRange = document.getElementById(maxRangeId) as HTMLInputElement;
  const rangeTrack = document.getElementById(rangeTrackId);

  if (minRange === null || maxRange === null || rangeTrack === null) {
    console.error("Error: Range sliders are null.");
    return;
  }

  function updateRange() {
    updateTrack(rangeTrack!, minRange.valueAsNumber, maxRange.valueAsNumber);
  }

  minRange!.addEventListener("input", updateRange);
  maxRange!.addEventListener("input", updateRange);

  updateTrack(rangeTrack!, leftHandle.value!, rightHandle.value!);
})

</script>
<template>
<div class="p-4" :style="trackStyle">
  <div class="relative flex pb-5 mt-4">
    <div>
      <input type="range" :class="createRangeClass(color)" :id="minRangeId" v-model.number="leftHandle" :min="min" :max="max"/>
      <input type="range" :class="createRangeClass(color)":id="maxRangeId" v-model.number="rightHandle" :min="min" :max="max"/>
    </div>
    <div class="relative w-full h-2 bg-ctp-surface0 rounded-md">
      <div :id="rangeTrackId" :class="createTrackClass(color)"></div>
    </div>
  </div>
  <ul class="flex justify-between w-full px-[5px]">
    <li v-for="n in max" class="flex justify-center relative">
      <span class="text-sm text-ctp-surface2">{{ n }}</span>
    </li>
  </ul>
</div>
</template>