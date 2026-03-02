<script setup lang="ts">
import { ref } from "vue"

import { Skill, SkillType } from "@/views/tools/uma-parent-calc/calc"
import SelectComponent from "./SelectComponent.vue";
import MinMaxRangeSlider from "./sliders/MinMaxRangeSlider.vue"

defineEmits(['onClose']);

const skillOptions = {
  "Basic Skill": SkillType.NORMAL,
  "Upgraded Skill": SkillType.UPGRADED,
  "Gold Skill": SkillType.GOLD
};

const props = defineProps<{
  skill: Skill
  index: number
}>();

const skillLeftH = ref(1);
const skillRightH = ref(3);

function updateSkillSparks() {
  props.skill.minSkillSpark = Math.min(skillLeftH.value, skillRightH.value) - 1;
  props.skill.maxSkillSpark = Math.max(skillLeftH.value, skillRightH.value) - 1;
}

function updateSkillType(option: any) {
  props.skill.skillType = Number(option);
}

</script>
<template>
<div class="flex flex-col w-[300px] md:w-[200px] bg-ctp-base p-3 border-ctp-sky-300 rounded-md border-1 gap-5">
  <div class="grid">
    <button @click="$emit('onClose', props.index)" 
      class="cursor-pointer col-start-1 row-start-2 place-self-center
      p-1 bg-ctp-red rounded-full shadow-sm shadow-ctp-red
      hover:shadow-md text-ctp-base"
    >
      <!-- License: PD. Made by Arthur Kazais: https://www.figma.com/@thearthurk -->
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929
          5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658
          18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166
          19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976
          5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237
          6.31658 4.90237 5.68342 5.29289 5.29289Z"/>
      </svg>
    </button>
    <div class="col-start-2 row-start-2">
      <SelectComponent @update="updateSkillType" :options="skillOptions"/>
    </div>
  </div>
  <MinMaxRangeSlider :color="3" @on-update="updateSkillSparks" 
    v-model:left-handle="skillLeftH" v-model:right-handle="skillRightH"
    :min="1" :max="3" :track-width="200"
  />
</div>
</template>