import { load } from "cheerio";

/**
 * HTMLコンテンツ内のtableタグをスクロール可能なdivラッパーで囲む
 * テーブルが親コンテナより広い場合に横スクロールで対応するため
 * @param content - HTML形式のコンテンツ
 * @returns テーブルがラッパーで囲まれたHTMLコンテンツ
 */
export const attachTableWrapper = (content: string): string => {
  if (!content || typeof content !== "string") {
    return content || "";
  }

  const $ = load(content);

  $("table").each((_, element) => {
    const $table = $(element);
    // 既にラッパーで囲まれている場合はスキップ
    if ($table.parent().hasClass("table-scroll-wrapper")) {
      return;
    }
    $table.wrap('<div class="table-scroll-wrapper"></div>');
  });

  return $.html();
};
