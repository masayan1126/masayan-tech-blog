import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export const attachCodeHighlight = (content: string) => {
  if (!content || typeof content !== 'string') {
    return content || '';
  }
  const $ = load(content);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
    // Add copy button to the parent <pre>
    const pre = $(elm).parent();
    pre.prepend('<button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.innerText).then(()=>{this.innerText=\'copied!\';setTimeout(()=>{this.innerText=\'copy\';},1200);})">copy</button>');
  });
  content = $.html();
  return content;
};
