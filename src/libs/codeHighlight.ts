import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export const attachCodeHighlight = (content: string) => {
  const $ = load(content);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });
  content = $.html();
  return content;
};
