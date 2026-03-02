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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
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