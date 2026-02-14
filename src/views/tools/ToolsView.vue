<script setup lang="ts">
import ArticleLink from '@/components/ArticleLink.vue';
</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="text-4xl font-bold">
      Tools
    </div>
      <div class="text-xl">
      A list of miscellaneous webtools made for convenience and various things.
    </div>
    <ArticleLink
      :article-name="'Umamusume Parent Calculator'"
      :article-description="'An Umamusume parent Calculator for probability calculations'"
      :article-link="'tools/uma-parent-calc'"
    />
  </div>
</template>