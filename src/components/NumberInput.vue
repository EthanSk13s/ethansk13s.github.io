<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update', value: number): void
}>();

function updateInput(ev: Event) {
  let element = ev.target as HTMLInputElement;
  let value = Number(element.value);
  let newValue: number | null = null;

  if (newValue) {
    value = newValue;
  }

  emit('update', value);
}

function handleDigitInput(ev: KeyboardEvent) {
  if (!ev.key.match(/^[0-9]+$/) && ev.key !== "Backspace"
      && ev.key !== "Enter"
      && ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") {
      ev.preventDefault()
  }
}


</script>

<template>
  <input @input="updateInput" @keydown="handleDigitInput"
    class="w-1/6 md:w-1/12 rounded bg-ctp-surface0 px-0.5 text-center text-ctp-text focus:outline-none focus:ring focus:ring-ctp-lavender"
    type="text" value="1"
  />
</template>