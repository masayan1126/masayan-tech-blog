// import rss from "@astrojs/rss";
// import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
// import { getBlogs } from "../libs/microcms/blog";

// export async function get(context) {
//   const postRes = await getBlogs();
//   const posts = postRes.contents;
//   return rss({
//     title: SITE_TITLE,
//     description: SITE_DESCRIPTION,
//     site: context.site,
//     items: posts.map((post) => ({
//       ...post.data,
//       link: `/blog/${post.slug}/`,
//     })),
//   });
// }
