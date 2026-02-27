<script setup lang="ts">
import { ref } from 'vue';
import MinMaxRangeSlider from '@/components/sliders/MinMaxRangeSlider.vue';
import RangeSlider from '@/components/sliders/RangeSlider.vue';
import { UmaParent } from './calc';

const MAX_STARS = 3;

const umaParent = ref(new UmaParent())

const blueLeftH = ref(1);
const blueRightH = ref(MAX_STARS);
const blueLeftChoiceH = ref(1);
const blueRightChoiceH = ref(6);

const redLeftH = ref(1);
const redRightH = ref(MAX_STARS);
const redLeftChoiceH = ref(1);
const redRightChoiceH = ref(12);

const greenLeftH = ref(1);
const greenRightH = ref(MAX_STARS);

function updateRedSparks() {
  umaParent.value.minAptSpark = Math.min(redLeftH.value, redRightH.value);
}

function updateBlueChoices() {
  umaParent.value.statChoices = Math.max(blueLeftChoiceH.value, blueRightChoiceH.value);
}

function updateBlueSparks() {
  umaParent.value.minStatSpark = Math.min(blueLeftH.value, blueRightH.value) - 1;
  umaParent.value.maxStatSpark = Math.max(blueLeftH.value, blueRightH.value) - 1;
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
    <div class="flex flex-col md:flex-row gap-10 justify-center">
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-semibold">
          <span class="bg-ctp-blue p-0.5 mr-1"></span> Blue Sparks
        </h2>
        <div class="dark:bg-ctp-mantle bg-ctp-crust w-[340px] p-6 rounded-2xl border-ctp-blue-900 border-1">
          <div class="flex flex-col gap-6">
            <div class="text-lg">Possible aptitude choices</div>
            <RangeSlider @on-update="updateBlueChoices"
              :color="1" v-model:handle="blueRightChoiceH"
              :min="1" :max="6" :track-width="340"
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
              <MinMaxRangeSlider
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
          <MinMaxRangeSlider :color="3" @on-update="updateRedSparks" 
            :left-handle="greenLeftH" :right-handle="greenRightH"
            :min="1" :max="3" :track-width="300"
          />
        </div>
      </div>
    </div>
    <!--
    <div>
      Parent Stats: (Blue Min: {{ umaParent.minStatSpark }} Blue Max: {{ umaParent.maxStatSpark }})
    </div>
    -->
  </div>
</template>