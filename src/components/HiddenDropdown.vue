<script setup lang="ts">
import { ref } from 'vue';

const isHidden = ref(false);

const props = defineProps<{
  color: "sapphire" | "red";
  header: string
}>();

function setButtonColor() {
  switch (props.color) {
    case "sapphire":
      return 'bg-ctp-sapphire hover:bg-ctp-sapphire-200';
    case "red":
      return 'bg-ctp-red hover-bg-ctp-red-200';
  } 
}

function setDropDownColor() {
  switch (props.color) {
    case "sapphire":
      return 'border-ctp-sapphire';
    case "red":
      return 'border-ctp-red';
  } 
}

const buttonColor = setButtonColor();
const dropDownColor = setDropDownColor();

</script>
<template>
  <div class="flex flex-col">
    <button @click="() => { isHidden = !isHidden }" class="flex flex-row cursor-pointer justify-between
     p-2 text-ctp-mantle dark:text-ctp-mantle font-bold rounded"
     :class="[ {'rounded-bl-none': isHidden, 'rounded-br-none': isHidden}, buttonColor ]"
    >
      {{  header }}
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="h-4 w-4 self-center justify-self-end size-6"
        fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
    <Transition
      enter-active-class="transition-transform duration-300 ease-in-out origin-top"
      enter-from-class="transform-[scaleY(0)]"
      enter-to-class="transform-[scaleY(1)]"
      leave-active-class="transition-transform duration-300 ease-in-out origin-top"
      leave-from-class="transform-[scaleY(1)]"
      leave-to-class="transform-[scaleY(0)]"
    >
      <div v-if="isHidden" class="bg-ctp-surface0 p-2 border-1 rounded-bl-md rounded-br-md scale-y-100"
        :class="dropDownColor"
      >
        <slot></slot>
      </div>
    </Transition>

  </div>
</template>