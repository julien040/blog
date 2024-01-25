import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { parseDate } from "../../utils/date";

export async function GET(context: APIContext) {
  const articles = await getCollection("articles");

  return rss({
    // `<title>` field in output xml
    title: "JulienC Blog",
    // `<description>` field in output xml
    description: "A small blog where I share my thoughts and discoveries",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site ?? "https://julienc.me",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: articles.map((article) => ({
      link: `/articles/${article.slug}/`,
      title: article.data.title,
      description: article.data.description,
      pubDate: parseDate(article.data.date).toDate(),
      author: "Julien C",
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
