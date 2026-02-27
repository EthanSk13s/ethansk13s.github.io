<script setup lang="ts">
import { onMounted, useId } from 'vue';
import { useRangeClass, useTrackClass, updateTrack } from './slider';

const emit = defineEmits(['onUpdate'])

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

const trackClass = useTrackClass(color);
const rangeClass = useRangeClass(color);
const trackStyle = `max-width: ${trackWidth}px;`

onMounted(() => {
  const minRange = document.getElementById(minRangeId) as HTMLInputElement;
  const maxRange = document.getElementById(maxRangeId) as HTMLInputElement;
  const rangeTrack = document.getElementById(rangeTrackId);

  if (minRange === null || maxRange === null || rangeTrack === null) {
    console.error("Error: Range sliders are null.");
    return;
  }

  function updateRange() {
    updateTrack(rangeTrack!, minRange.valueAsNumber, maxRange.valueAsNumber, max, min);
    emit("onUpdate");
  }

  minRange!.addEventListener("input", updateRange);
  maxRange!.addEventListener("input", updateRange);

  updateTrack(rangeTrack!, leftHandle.value!, rightHandle.value!, max, min);
})

</script>
<template>
<div :style="trackStyle">
  <div class="relative flex pb-5 mt-4">
    <div>
      <input type="range" :class="rangeClass" :id="minRangeId" v-model.number="leftHandle" :min="min" :max="max"/>
      <input type="range" :class="rangeClass":id="maxRangeId" v-model.number="rightHandle" :min="min" :max="max"/>
    </div>
    <div class="relative w-full h-2 bg-ctp-surface0 rounded-md">
      <div :id="rangeTrackId" :class="trackClass"></div>
    </div>
  </div>
  <ul class="flex justify-between w-full px-[5px]">
    <li v-for="n in max" class="flex justify-center relative">
      <span class="text-sm text-ctp-subtext1 dark:text-ctp-surface2">{{ n }}</span>
    </li>
  </ul>
</div>
</template>