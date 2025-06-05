<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps(['articleName', 'articleDescription', 'articleLink']);

</script>
<template>
  <RouterLink :to="articleLink" class="bg-ctp-surface0 rounded p-4 object-fit shrink hover:bg-ctp-base">
    <div class="font-bold text-2xl">
      {{  articleName }}
    </div>
    <div class="text-ctp-subtext0 pt-2">
      {{ articleDescription }}
    </div>
  </RouterLink>
</template>