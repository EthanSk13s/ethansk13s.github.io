import './assets/main.css'

import * as Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { ArticleData } from './stores/article-data'


const pinia = createPinia()
const app = createApp(App)

app.use(router);
app.use(pinia);

ArticleData().init();

app.use(VueAxios, axios);

app.provide('axios', app.config.globalProperties.axios);

app.mount('#app')
