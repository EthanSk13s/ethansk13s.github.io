<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import markdownit from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs';
import { defineComponent } from 'vue';
import '@catppuccin/highlightjs/css/catppuccin-mocha.css';

export default defineComponent({
  data() {
    return {markdown: ''};
  },
  mounted() {
    const md = markdownit({typographer: true });
    md.use(highlightjs);
    const route = useRoute();
    const router = useRouter();

    let articleName: string = '';
    let category: string = '';

    if (route.params.article_name) {
      articleName = String(route.params.article_name);
    }

    if (route.params.category) {
      category = String(route.params.category);
    } else {
      router.push({ 'name': 'notFound', replace: true  })
    }

    fetch(`/articles/${category}/${articleName}.md`)
      .then(x => {
        if (x.headers.get("content-type") != "text/markdown") {
          router.push({ 'name': 'notFound', replace: true  })
        }

        x.text().then(y => {
          this.markdown = md.render(y);
        })
      })
  },
  beforeRouteEnter(to, from, next) {
    to.meta.title = to.params.article_name;
    next();
  },
  beforeRouteUpdate(to, from, next) {
    to.meta.title = to.params.article_name;
    next();
  }
})

</script>

<template>
  <div class="prose prose-headings:text-ctp-text prose-p:text-ctp-text
     prose-a:text-ctp-blue prose-strong:text-ctp-text prose-strong:font-bold
     prose-li:text-ctp-text marker:text-ctp-text marker:font-bold
     prose-img:rounded
     prose-pre:bg-mocha
     prose-code:text-ctp-maroon prose-code:before:content-[''] prose-code:after:content-[''] max-w-none">
    <div v-html="markdown" />
  </div>
</template>