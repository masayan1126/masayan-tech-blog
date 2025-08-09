import { load } from "cheerio";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * HTMLコンテンツからh2タグを抽出して見出し一覧を生成
 * @param htmlContent - microCMSから取得したHTML形式のコンテンツ
 * @returns 見出しの配列
 */
export const extractHeadings = (htmlContent: string): Heading[] => {
  const $ = load(htmlContent);
  const headings: Heading[] = [];

  // h2タグのみを対象に抽出
  $('h2').each((_, element) => {
    const $element = $(element);
    const id = $element.attr('id') || '';
    const text = $element.text().trim();
    
    if (text) {
      headings.push({
        id,
        text,
        level: 2
      });
    }
  });

  return headings;
};
