<script setup lang="ts">
import { onMounted, useId } from 'vue';

const inputId = useId();
const minRangeId = `min-range-${inputId}`;
const maxRangeId = `max-range-${inputId}`;
const rangeTrackId = `track-${inputId}`;

const min = defineModel<number>('rangeMin');
const max = defineModel<number>('rangeMax');

const props = defineProps<{
  min: number
  max: number
}>()
const emit = defineEmits(["updateMin", "updateMax"])

function updateTrack(track: HTMLElement, min: number, max: number) {
  let ratio = (props.max - 1) / props.min
  let minPercent = ((min - props.min) / ratio) * 100;
  let maxPercent = ((max - props.min) / ratio) * 100;

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

  function updateRange(this: HTMLElement, event: Event) {
    let min = minRange.valueAsNumber;
    let max = maxRange.valueAsNumber;

    if (max == min) {
        if (event.target === minRange) {
            this.parentNode?.insertBefore(maxRange, minRange);
        } else {
            this.parentNode?.insertBefore(minRange, maxRange);
        }
    }

    if (maxRange!.value < minRange!.value) {
      if (event.target === minRange) {
          let newMax = minRange!.value;
          minRange.value = maxRange!.value;
          maxRange.value = newMax;
      } else {
          let newMax = maxRange!.value;
          minRange.value = newMax;
          maxRange.value = minRange!.value;
      }

      //console.log("newMax: %d", newMax);

      emit("updateMin", minRange.valueAsNumber);
      emit("updateMax", maxRange.valueAsNumber);
    }

    updateTrack(rangeTrack!, minRange.valueAsNumber, maxRange.valueAsNumber);

  }

  minRange!.addEventListener("input", updateRange);
  maxRange!.addEventListener("input", updateRange);

  updateTrack(rangeTrack!, minRange.valueAsNumber, maxRange.valueAsNumber);
})

</script>
<template>
<div class="p-4" style="max-width:300px;">
  <div class="price-range p-4">

    <div class="relative flex pb-5 mt-4">
      <div>
        <input type="range" :id="minRangeId" v-model.number="min" :min="props.min" :max="props.max"/>
        <input type="range" :id="maxRangeId" v-model.number="max" :min="props.min" :max="props.max"/>
      </div>

      <div class="relative w-full h-2 bg-ctp-surface0 rounded-md">
        <div :id="rangeTrackId" class="absolute h-2 bg-ctp-blue rounded-md"></div>
      </div>
    </div>
    <ul class="flex justify-between w-full px-[5px]">
      <li v-for="n in props.max" class="flex justify-center relative">
        <span class="text-sm text-ctp-surface2">{{ n }}</span>
      </li>
    </ul>
  </div>
</div>
</template>