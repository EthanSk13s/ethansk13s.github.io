<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update', option: any): void
}>();

const props = defineProps<{
  options: Record<string, any>
}>()

function updateSelection(ev: Event) {
  let selectElement = ev.target as HTMLSelectElement;

  emit("update", selectElement.value);
}
</script>

<template>
  <div class="grid">
    <select @change="updateSelection"
      class="col-start-1 row-start-1 appearance-none bg-ctp-surface0 rounded-md
      border-1 border-ctp-rosewater-900 p-0.5 ml-2 pl-1.5 hover:bg-ctp-surface1 pr-8"
    >
      <option v-for="(opt, optStr) in options" :value="opt">{{ optStr }}</option>
    </select>
    <svg xmlns="http://www.w3.org/2000/svg" 
      class="pointer-events-none relative right-1 z-10 col-start-1 
      row-start-1 h-4 w-4 self-center justify-self-end size-6"
      fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  </div>
</template>