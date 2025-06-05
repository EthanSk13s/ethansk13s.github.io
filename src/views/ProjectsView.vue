<script setup lang="ts">
import { useRouter } from 'vue-router';

import ArticleLink from '@/components/ArticleLink.vue';
import { ArticleData } from '@/stores/article-data';

import type { ArticleCategory } from '@/article_parser';

const articles: ArticleCategory[] = ArticleData().articles;
const router = useRouter();

let projects: ArticleCategory | undefined = articles.find((element) => element.category === 'projects');

if (projects === undefined) {
  router.push({ 'name': 'notFound', replace: true });
}

</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="text-4xl font-bold">
      Projects
    </div>
    <ArticleLink
      v-for="article in projects!.articles"
      :article-name="article.title"
      :article-description="article.desc"
      :article-link=" `article/projects/${article.fileName.replace('.md', '')}`"
    />
  </div>
</template>