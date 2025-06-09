<script setup lang="ts">
import { ref, type Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ArticleLink from '@/components/ArticleLink.vue';
import { ArticleData } from '@/stores/article-data';

import type { ArticleCategory } from '@/article_parser';

const router = useRouter();
const route = useRoute();
const projects: Ref<ArticleCategory | undefined> = ref();

async function getProjectArticles() {
  const articleStore = ArticleData();
  if (articleStore.articles.length == 0) {
      await articleStore.init();
  }
  let articles: ArticleCategory[] = articleStore.articles;

  projects.value = articles.find((element) => element.category === 'projects');

  if (projects.value === undefined) {
    router.push({ 'name': 'notFound', replace: true });
  }
}

watch(() => route.name, getProjectArticles, { immediate: true });
</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="text-4xl font-bold">
      Projects
    </div>
    <ArticleLink
      v-for="article in projects?.articles"
      :article-name="article.title"
      :article-description="article.desc"
      :article-link=" `article/projects/${article.fileName.replace('.md', '')}`"
    />
  </div>
</template>