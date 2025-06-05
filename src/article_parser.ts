/* 
 * This script is just a simple file parser to generate an article listing.
 * based on markdown syntax usage.
 */
import * as fs from 'fs';

const PUBLIC_DIR: string = './public';
const ARTICLE_DIR: string = `${PUBLIC_DIR}/articles`;

export interface ArticleType {
    fileName: string,
    title: string,
    desc: string
}

export interface ArticleCategory {
    articles: ArticleType[],
    category: string
}

var articleListing: ArticleCategory[] = [];

async function articleMdParser(articleArray: ArticleType[], path: string, filename: string) {
    let currentArticle = await fs.promises.open(path);

    let article: ArticleType = {fileName: filename, title: '', desc: ''};
    for await (const line of currentArticle.readLines()) {
        let parsedLine: string;
        if (line.startsWith('#')) {
            parsedLine = line.replace('#', '').trimStart();
            article.title = parsedLine;
        }

        if (line.startsWith('>')) {
            parsedLine = line.replace('>', '').trimStart();
            article.desc = parsedLine;
            articleArray.push(article);
            break;
        }
    }
}

async function iterDirectory(currentDir: fs.Dir, articlesCategory: string) {
    let articleCat = articleListing.find((curCat) => { curCat.category == articlesCategory});

    if (articleCat == undefined) {
        let newCategory: ArticleCategory = { articles: [], category: articlesCategory};

        let index: number = articleListing.push(newCategory);
        articleCat = articleListing[index - 1];
    }

    for await (const dirent of currentDir) {
        if (dirent.isFile()) {
            if (dirent.name.endsWith(".md")) {
                let filePath: string = `${dirent.parentPath}/${dirent.name}`;

                articleMdParser(articleCat.articles, filePath, dirent.name);
            }
        }

        if (dirent.isDirectory()) {
            const dir = await fs.promises.opendir(`${dirent.parentPath}/${dirent.name}`);
            await iterDirectory(dir, dirent.name);
        }
    }
}

export async function parseArticles() {
    try {
        const dir = await fs.promises.opendir(ARTICLE_DIR);

        let category: string = 'general';
        await iterDirectory(dir, category);

        fs.writeFileSync(`${PUBLIC_DIR}/article-parsed.json`, JSON.stringify(articleListing));
        console.log(`✓ ${articleListing.length} files parsed.`);
    } catch (err) {
        console.error(err);
    } 
}