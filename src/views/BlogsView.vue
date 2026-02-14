<script setup lang="ts">
import { ref, type Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ArticleLink from '@/components/ArticleLink.vue';
import { ArticleData } from '@/stores/article-data';

import type { ArticleCategory } from '@/article_parser';

const router = useRouter();
const route = useRoute();
const blogs: Ref<ArticleCategory | undefined> = ref();

async function getProjectArticles() {
  const articleStore = ArticleData();
  if (articleStore.articles.length == 0) {
      await articleStore.init();
  }
  let articles: ArticleCategory[] = articleStore.articles;

  blogs.value = articles.find((element) => element.category === 'blogs');

  if (blogs.value === undefined) {
    router.push({ 'name': 'notFound', replace: true });
  }
}

watch(() => route.name, getProjectArticles, { immediate: true });
</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="text-4xl font-bold">
      Random Thoughts
    </div>
    <ArticleLink
      v-for="article in blogs?.articles"
      :article-name="article.title"
      :article-description="article.desc"
      :article-link=" `article/blogs/${article.fileName.replace('.md', '')}`"
    />
  </div>
</template>