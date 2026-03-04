<script setup lang="ts">
import { ref } from 'vue';

import { UmaParent, SkillType, calcParentOdds } from './calc';
import MinMaxRangeSlider from '@/components/sliders/MinMaxRangeSlider.vue';
import RangeSlider from '@/components/sliders/RangeSlider.vue';
import SkillContainer from '@/components/SkillContainer.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import NumberInput from '@/components/NumberInput.vue';
import HiddenDropdown from '@/components/HiddenDropdown.vue';

const MAX_STARS = 3;

const umaParent = ref(new UmaParent())
umaParent.value.statChoices = 5;
umaParent.value.aptChoices = 1;

const blueLeftH = ref(1);
const blueRightH = ref(MAX_STARS);
const blueChoiceH = ref(5);

const redLeftH = ref(1);
const redRightH = ref(MAX_STARS);
const redLeftChoiceH = ref(1);
const redRightChoiceH = ref(12);

const greenLeftH = ref(1);
const greenRightH = ref(MAX_STARS);

const numOfRuns = ref(1);

const statThresholds = {
  "Less than 600": 0,
  "More than 600": 1,
  "More than 1100": 2
}

function updateRedSparks() {
  umaParent.value.minAptSpark = Math.min(redLeftH.value, redRightH.value);
  umaParent.value.maxAptSpark = Math.max(redLeftH.value, redRightH.value);
}

function updateBlueChoices() {
  umaParent.value.statChoices = blueChoiceH.value;
}

function updateBlueSparks() {
  umaParent.value.minStatSpark = Math.min(blueLeftH.value, blueRightH.value) - 1;
  umaParent.value.maxStatSpark = Math.max(blueLeftH.value, blueRightH.value) - 1;
}

function updateRedChoices() {
  umaParent.value.aptChoices = Math.min(redLeftChoiceH.value, redRightChoiceH.value);
  umaParent.value.maxAptChoices = Math.max(redLeftChoiceH.value, redRightChoiceH.value);
}

function updateGreenSparks() {
  umaParent.value.minGreenSpark = Math.min(greenLeftH.value, greenRightH.value);
  umaParent.value.maxGreenSpark = Math.max(greenLeftH.value, greenRightH.value);
}

function updateStatThresholds(option: any) {
  umaParent.value.statThreshold = Number(option);
}

function updateNumOfRuns(runs: number) {
  numOfRuns.value = runs;
}

function addSkill() {
  umaParent.value.addSkill(SkillType.NORMAL);
}

function removeSkill(index: number) {
  umaParent.value.skills.splice(index, 1);
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="text-4xl font-bold">
      Umamusume Parent Calculator
    </div>
    <h1 class="text-xl">
      Use this tool to calculate the average likeliness that your desired parent can appear within
      a set amount of runs.
    </h1>
    <HiddenDropdown :color="'sapphire'" :header="'Instructions'">
      <div class="flex flex-col gap-4">
        <div>
          For the most part, this tool should be simple to use. The sliders with three values is the spark amount you want.
        </div>
        <div>
            For blue sparks, There are two things to keep in mind. First, your stat threshold is how much of those stats you have
            above that threshold. Second, the possible stat choices represent which of the five stats you want. If you want either stamina or
            power, then you set it to two. Which would make your possible choices 2 / 5.
        </div>
        <div>
            However, red sparks are a little different. Your possible aptitude choices can vary from Uma to Uma. So, you have varied amount
            of aptitudes you may get. You can get this amount by counting how many of your style, and distance aptitudes you have at A rank
            or above. You then set the right handle to this value, while the left handle is how much you want to be inherited.
        </div>
        <div>
          As an example let's take Oguri Cap. She has an A aptitude in Turf, Mile, Medium, Pace, and Late. Which would make the max choice be
          five. If we want to inherit Mile, then we set the left handle to one. Our possible choices would be 1 / 5.
        </div>
        <div>
            For skills, you add a skill, and set the type of skill you want inherited and adjust the spark amount you need.
        </div>
      </div>
    </HiddenDropdown>
    Estimated Odds: {{ ((calcParentOdds(umaParent, numOfRuns)) * 100).toFixed(2) }}%
    <div class="flex flex-row gap-2">
      <div class="self-center bg-ctp-flamingo text-ctp-crust dark:text-ctp-mantle font-bold rounded p-0.5 pl-1 pr-1">
        Numbers of Runs
      </div>
      <NumberInput @update="updateNumOfRuns"/>
    </div>
    <div class="flex flex-row gap-2">
      <div class="self-center bg-ctp-blue text-ctp-crust dark:text-ctp-mantle font-bold rounded p-0.5 pl-1 pr-1">
        Stat Threshold
      </div>
      <SelectComponent @update="updateStatThresholds" :options="statThresholds"/>
    </div>
    <div class="flex flex-col md:flex-row gap-10 justify-center">
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-semibold">
          <span class="bg-ctp-blue p-0.5 mr-1"></span> Blue Sparks
        </h2>
        <div class="dark:bg-ctp-mantle bg-ctp-crust w-[340px] p-6 rounded-2xl border-ctp-blue-900 border-1">
          <div class="flex flex-col gap-6">
            <div class="text-lg">Possible stat choices</div>
            <RangeSlider @on-update="updateBlueChoices"
              :color="1" v-model:handle="blueChoiceH"
              :min="1" :max="5" :track-width="340"
            />
            <div class="text-lg">Minimum and maximum sparks</div>
            <MinMaxRangeSlider @on-update="updateBlueSparks"
              :color="1" v-model:left-handle="blueLeftH" v-model:right-handle="blueRightH"
              :min="1" :max="3" :track-width="300"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-semibold">
          <span class="bg-ctp-red p-0.5 mr-1"></span> Red Sparks
        </h2>
        <div class="dark:bg-ctp-mantle bg-ctp-crust w-[340px] p-6 rounded-2xl border-ctp-red-900 border-1">
          <div class="flex flex-col gap-6">
            <div class="text-lg">Possible aptitude choices</div>
              <MinMaxRangeSlider @on-update="updateRedChoices"
                :color="2" v-model:left-handle="redLeftChoiceH" v-model:right-handle="redRightChoiceH"
                :min="1" :max="12" :track-width="340"
              />
            <div class="text-lg">Minimum and maximum sparks</div>
              <MinMaxRangeSlider @on-update="updateRedSparks" 
                :color="2" v-model:left-handle="redLeftH" v-model:right-handle="redRightH"
                :min="1" :max="3" :track-width="300"
              />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-semibold">
          <span class="bg-ctp-green p-0.5 mr-1"></span> Green Sparks
        </h2>
        <div class="dark:bg-ctp-mantle bg-ctp-crust w-[300px] p-6 rounded-2xl border-ctp-green-900 border-1">
          <MinMaxRangeSlider :color="3" @on-update="updateGreenSparks" 
            v-model:left-handle="greenLeftH" v-model:right-handle="greenRightH"
            :min="1" :max="3" :track-width="300"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-10 justify-center">
      <div class="flex flex-col gap-4">
        <div class="flex flex-row justify-between">
          <h2 class="text-2xl font-semibold">
            <span class="bg-ctp-sky p-0.5 mr-1"></span> Skills
          </h2>
          <button v-on:click="addSkill" 
            class="cursor-pointer bg-ctp-sky
            rounded-full p-2 text-ctp-base shadow-sm
            shadow-ctp-sky-900 hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
          </button>
        </div>
        <div class="flex flex-col md:flex-row gap-1.5 items-center md:flex-wrap dark:bg-ctp-mantle
          bg-ctp-crust p-6 rounded-2xl border-ctp-sky border-1 overflow-auto max-h-[400px]"
        >
          <h3 v-if="umaParent.skills.length == 0" class="text-ctp-subtext0">No Skills added.</h3>
          <SkillContainer v-else @on-close="removeSkill" 
            v-for="(skill, index) in umaParent.skills"
            :key="skill.id"
            :skill="skill" :index="index"
          />
        </div>
      </div>
    </div>
    <HiddenDropdown :color="'red'" :header="'Changelog'">
      <div class="flex flex-col gap-4 overflow-auto max-h-[600px]">
        <div>
          <h4 class="text-xl">Mar 3.</h4>
          <ul class="list-disc">
            <li>Added instructions.</li>
          </ul>
        </div>
        <h4 class="text-xl">Mar 1. (Initial Release)</h4>
      </div>
    </HiddenDropdown>
  </div>
</template>