import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "@/views/HomeView.vue"
import ArticleView from '@/views/ArticleView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ProjectsView from '@/views/ProjectsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/article/:category/:article_name',
      name: 'article',
      component: ArticleView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView
    },
    {
      path: '/projects',
      name: 'Projects',
      component: ProjectsView
    }
  ],
})

export default router;

router.afterEach((to, from) => {
  if (to.name === 'home') {
    to.meta.title = "Home";
  } else if (to.name === 'notFound') {
    to.meta.title = "Page not found"; 
  } else if (to.name === 'Projects') {
    to.meta.title = "Projects";
  }

  document.title = "EthanSk13s - " + to.meta.title;
});