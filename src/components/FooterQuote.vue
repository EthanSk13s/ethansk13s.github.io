<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';

import { QUOTES, type Quote } from '@/quotes';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';


const route = useRoute();

const origin: Ref<string> = ref('');
const text: Ref<string> = ref('');
const url: Ref<string> = ref('');

async function updateQuote() {
  let index = Math.random() * QUOTES.length | 0;
  let newQuote: Quote = QUOTES[index];

  console.log(index);

  origin.value = newQuote.origin;
  text.value = newQuote.text;
  url.value = newQuote.url;
}

watch(() => route.name, updateQuote, { immediate: true });

</script>

<template>
  <footer class="flex flex-col justify-center cotent-end m-auto md:w-7/12 mt-5 gap-1 p-1 text-center text-xs">
    <div>
      "{{ text }}"
    </div>
    <div class="italic">
      <a :href="url" class="text-ctp-blue">{{ origin }}</a>
    </div>
  </footer>
</template>