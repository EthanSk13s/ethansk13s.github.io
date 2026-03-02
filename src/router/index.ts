import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "@/views/HomeView.vue"
import ArticleView from '@/views/ArticleView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ProjectsView from '@/views/ProjectsView.vue';
import BlogsView from '@/views/BlogsView.vue';
import ToolsView from '@/views/tools/ToolsView.vue';
import UmaParentCalcView from '@/views/tools/uma-parent-calc/UmaParentCalcView.vue';

const router = createRouter({
  history: createWebHistory(),
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
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogsView
    },
    {
      path: '/tools',
      name: 'tools',
      component: ToolsView
    },
    {
      path: '/tools/uma-parent-calc',
      name: 'uma-parent-calc',
      component: UmaParentCalcView
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
  } else if (to.name === 'uma-parent-calc') {
    to.meta.title = "Umamusume Parent Calculator"
  } else if (to.name === 'tools') {
    to.meta.title = "Tools"
  }

  document.title = "EthanSk13s - " + to.meta.title;
});