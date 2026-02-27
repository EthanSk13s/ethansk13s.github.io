<script setup lang="ts">
import { onMounted, useId } from 'vue';

import { useTrackClass, useRangeClass, updateTrack } from './slider';

const emit = defineEmits(['onUpdate'])

const inputId = useId();
const rangeId = `range-${inputId}`;
const rangeTrackId = `track-${inputId}`;

const handle = defineModel<number>('rightHandle');

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
  const range = document.getElementById(rangeId) as HTMLInputElement;
  const rangeTrack = document.getElementById(rangeTrackId);

  if (range === null || rangeTrack === null) {
    console.error("Error: Range sliders are null.");
    return;
  }

  function updateRange() {
    updateTrack(rangeTrack!, 1, range.valueAsNumber, max, min);
    emit("onUpdate");
  }

  range!.addEventListener("input", updateRange);

  updateTrack(rangeTrack!, 1, handle.value!, max, min);
})

</script>
<template>
<div :style="trackStyle">
  <div class="relative flex pb-5 mt-4">
    <div>
      <input type="range" :class="rangeClass":id="rangeId" v-model.number="handle" :min="min" :max="max"/>
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