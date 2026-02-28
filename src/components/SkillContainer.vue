<script setup lang="ts">
import { ref } from "vue"

import { Skill, SkillType } from "@/views/tools/uma-parent-calc/calc"
import MinMaxRangeSlider from "./sliders/MinMaxRangeSlider.vue"

const props = defineProps<{
  skill: Skill
}>();

const skillLeftH = ref(1);
const skillRightH = ref(3);

function updateSkillSparks() {
  props.skill.minSkillSpark = Math.min(skillLeftH.value, skillRightH.value) - 1;
  props.skill.maxSkillSpark = Math.max(skillLeftH.value, skillRightH.value) - 1;
}

function updateSkillType(ev: Event) {
  let selectElement = ev.target as HTMLSelectElement;
  props.skill.skillType = Number(selectElement.value);
}

</script>
<template>
<div class="flex flex-col w-[200px] bg-ctp-base p-3 border-ctp-sky-300 rounded-md border-1 gap-5">
  <div class="grid">
    <select @change="updateSkillType"
      class="col-start-1 row-start-1 appearance-none bg-ctp-surface0 rounded-md
      border-1 border-ctp-rosewater-900 p-0.5 pl-1.5 hover:bg-ctp-surface1"
    >
      <option :value="SkillType.NORMAL">Basic Skill</option>
      <option :value="SkillType.UPGRADED">Upgraded Skill</option>
      <option :value="SkillType.GOLD">Gold Skill</option>
    </select>    
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="pointer-events-none relative right-1 z-10 col-start-1 row-start-1 h-4 w-4 self-center justify-self-end"
    >
      <path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 
               -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-
               .118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077
               -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z"
      />
    </svg>
  </div>
  <MinMaxRangeSlider :color="3" @on-update="updateSkillSparks" 
    v-model:left-handle="skillLeftH" v-model:right-handle="skillRightH"
    :min="1" :max="3" :track-width="200"
  />
</div>
</template>