import type { Article } from "../types/article";
import { getCollection } from "astro:content";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export async function getArticles(): Promise<Article[]> {
    return _getArticles("articles");
}

export async function getStackOverflow(): Promise<Article[]> {
    return _getArticles("stackoverflow");
}

export async function _getArticles(
    collection: "article" | "stackoverflow"
): Promise<Article[]> {
    const articles = await getCollection(collection);

    return articles
        .map((blogEntry) => {
            const {
                title,
                date,
                description,
                image,
                modified,
                category,
                project_url,
            } = blogEntry.data;
            return {
                title,
                date: date,
                description,
                url: `/${collection}/` + blogEntry.slug,
                image: image,
                modified: modified,
                category: category,
                project_url: project_url,
            };
        })
        .sort((a, b) => {
            return (
                dayjs(b.date, "DD-MM-YYYY").unix() -
                dayjs(a.date, "DD-MM-YYYY").unix()
            );
        });
}
