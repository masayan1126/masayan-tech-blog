import { load } from "cheerio";

/**
 * テキストからIDを生成（URLセーフな形式）
 * @param text - 見出しテキスト
 * @param index - 見出しのインデックス（重複回避用）
 * @returns 生成されたID
 */
const generateId = (text: string, index: number): string => {
  // 英数字とハイフンのみを許可し、その他は削除
  let id = text
    .toLowerCase()
    .replace(/\s+/g, '-')  // スペースをハイフンに変換
    .replace(/[^\w\-\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '') // 記号を削除（日本語は残す）
    .replace(/\-+/g, '-')  // 連続するハイフンを1つに
    .replace(/^\-|\-$/g, ''); // 先頭と末尾のハイフンを削除
  
  // IDが空の場合や日本語のみの場合は、インデックスベースのIDを使用
  if (!id || id.length === 0) {
    id = `heading-${index}`;
  }
  
  // 日本語を含む場合はハッシュ化せずそのまま使用（長すぎる場合は短縮）
  if (id.length > 100) {
    id = `h${index}-${id.substring(0, 50)}`;
  } else if (!/^[a-z]/.test(id)) {
    // 英字で始まらない場合は先頭にhを追加
    id = `h${index}-${id}`;
  }
  
  return id;
};

/**
 * HTMLコンテンツ内のH2・H3タグにIDを自動付与する
 * @param content - HTML形式のコンテンツ
 * @returns IDが付与されたHTMLコンテンツ
 */
export const attachHeadingIds = (content: string): string => {
  if (!content || typeof content !== 'string') {
    return content || '';
  }
  
  const $ = load(content);
  
  // H2・H3タグを対象にIDを付与
  $('h2, h3').each((index, element) => {
    const $element = $(element);
    let id = $element.attr('id');
    const text = $element.text().trim();

    // IDが無い場合は自動生成
    if (!id && text) {
      id = generateId(text, index);
      $element.attr('id', id);
    }
  });
  
  return $.html();
};

