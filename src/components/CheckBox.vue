<script setup lang="ts">
import { useId } from 'vue';

const checkBoxId = `chckbox-${useId()}`
const checked = defineModel<boolean>('checked');

const emit = defineEmits<{
  (e: 'update', state: boolean): void
}>();

const props = defineProps<{
  label: string
}>()

function emitUpdate(ev: Event) {
  let target = ev.target as HTMLInputElement;

  emit('update', target.checked);
}

</script>

<template>
  <div class="flex flex-row gap-2">
    <label :for="checkBoxId" class="text-ctp-crust dark:text-ctp-mantle font-bold
      bg-ctp-yellow rounded p-1"
    >
      {{ label }}
    </label>
    <input @change="emitUpdate" :id="checkBoxId" type="checkbox">
  </div>
</template>