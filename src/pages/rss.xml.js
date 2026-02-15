import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../constants/meta";
import { getArticlesMeta } from "../libs/microcms/blog";

export async function GET(context) {
  const postRes = await getArticlesMeta();
  const posts = postRes.contents;
  const sanitizeForXml = (value) => {
    if (!value) return "";
    return String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  };
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    stylesheet: '/rss/styles.xsl',
    items: posts.map((post) => ({
      title: sanitizeForXml(post.title),
      pubDate: new Date(post.publishedAt),
      description: sanitizeForXml(post.description),
      link: `/blog/${post.id}/`,
    })),
  });
}
