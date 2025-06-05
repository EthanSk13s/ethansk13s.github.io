import { defineStore } from "pinia";

export const ArticleData = defineStore('article-data', {
    state: () => {
        return { articles: [] }
    },
    actions: {
        init() {
            fetch(`/article-parsed.json`)
                .then(x => {
                    x.json()
                        .then(data => {
                            this.articles = data;
                        })
            })
        }
    }
})