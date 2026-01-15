<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import FooterQuote from './components/FooterQuote.vue';

</script>

<template>
  <header>
    <div class="bg-ctp-surface0 flex flex-col flex-wrap gap-2 justify-self-center md:flex-row md:justify-evenly
                 text-center md:gap-52 p-4 border border-ctp-mantle">
      <RouterLink to="/" class="text-lg font-bold hover:text-ctp-subtext0">EthanSk13s</RouterLink>
      <div class="md:flex gap-4 text-lg">
        <RouterLink to="/projects" class="hover:text-ctp-subtext0">Projects</RouterLink>
        <div>Random thoughts</div>
        <div class="h-[28px]">
          <a href="https://github.com/EthanSk13s">
            <img class="h-full w-full object-contain mx-auto dark:invert-90 light:invert-[.5]" src="/github-mark.svg">
          </a>
        </div>
      </div>
    </div>
  </header>

  <main class="bg-ctp-surface1 flex flex-col justify-center md:m-auto md:mt-5 md:w-7/12 mt-5 mr-2 ml-2 gap-2 p-4 rounded">
    <div>
      <RouterView />
    </div>
  </main>
  <FooterQuote/>
</template>
