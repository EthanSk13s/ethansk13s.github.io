import { defineStore } from "pinia";
import axios from "axios";

async function getArticles() {
    const respone = await axios.get('/article-parsed.json');

    return await respone.data;
}

export const ArticleData = defineStore('article-data', {
    state: () => {
        return { articles: [] }
    },
    actions: {
        async init() {
            this.articles = await getArticles();
            console.log(this.articles);
        }
    }
})