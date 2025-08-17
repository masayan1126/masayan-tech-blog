/**
 * microCMS画像URLをローカルホスト経由でアクセスできるように変換する
 * @param url 元のmicroCMS画像URL
 * @returns ローカルホスト経由のURL
 */
export function convertToLocalhostUrl(url: string): string {
  if (!url || !url.includes('microcms-assets.io')) {
    return url;
  }
  
  // 既にlocalhostの場合はそのまま返す
  if (url.includes('localhost')) {
    return url;
  }
  
  // %22で囲まれている場合は除去
  let cleanUrl = url.replace(/^["']|["']$/g, '').replace(/%22/g, '');
  
  // 既にlocalhostの場合はそのまま返す（%22除去後）
  if (cleanUrl.includes('localhost')) {
    return cleanUrl;
  }
  
  // microCMSの画像URLをlocalhost経由に変換
  if (cleanUrl.startsWith('https://images.microcms-assets.io/')) {
    return `http://localhost:53000/images.microcms-assets.io${cleanUrl.replace('https://images.microcms-assets.io', '')}`;
  }
  
  return cleanUrl;
}

/**
 * URL全体を一度に処理する包括的な関数
 * @param url 元のURL
 * @returns 正しく処理されたURL
 */
function processUrlComprehensive(url: string): string {
  if (!url) return url;
  
  // 既にlocalhostの場合はそのまま返す
  if (url.includes('localhost')) {
    return url;
  }
  
  // %22で囲まれたmicroCMSのURLの処理
  if (url.includes('%22') && url.includes('microcms-assets.io')) {
    // %22で囲まれたmicroCMSのURLを抽出
    const match = url.match(/https:\/\/images\.microcms-assets\.io\/[^%]*/);
    if (match) {
      return convertToLocalhostUrl(match[0]);
    }
  }
  
  return url;
}

/**
 * microCMSの画像URLを正しく処理する
 * @param url 元の画像URL
 * @returns 正しく処理された画像URL
 */
export function processMicroCMSImageUrl(url: string): string {
  if (!url) return url;
  
  // 既にlocalhostの場合はそのまま返す
  if (url.includes('localhost')) {
    return url;
  }
  
  // 包括的なURL処理を最初に実行
  url = processUrlComprehensive(url);
  
  // 引用符を除去
  let processedUrl = url.replace(/^["']|["']$/g, '');
  
  // URLデコードを実行
  try {
    processedUrl = decodeURIComponent(processedUrl);
  } catch (e) {
    // デコードに失敗した場合は元のURLを使用
  }
  
  // 既にlocalhostの場合はそのまま返す（処理後）
  if (processedUrl.includes('localhost')) {
    return processedUrl;
  }
  
  // %22（URLエンコードされたダブルクォート）で囲まれたURLの修正
  if (processedUrl.includes('%22') && processedUrl.includes('microcms-assets.io')) {
    // %22で囲まれたmicroCMSのURLを抽出
    const match = processedUrl.match(/https:\/\/images\.microcms-assets\.io\/[^%]*/);
    if (match) {
      return convertToLocalhostUrl(match[0]);
    }
    
    // より広範囲のパターンに対応
    const fullMatch = processedUrl.match(/https:\/\/images\.microcms-assets\.io\/[^%]*%22/);
    if (fullMatch) {
      return convertToLocalhostUrl(fullMatch[0].replace(/%22$/, ''));
    }
  }
  
  // microCMSの画像URLの場合
  if (processedUrl.includes('microcms-assets.io')) {
    // 既に完全なURLの場合はlocalhost経由に変換
    if (processedUrl.startsWith('http')) {
      return convertToLocalhostUrl(processedUrl);
    }
    
    // 相対URLの場合は完全なURLに変換してからlocalhost経由に変換
    if (processedUrl.startsWith('/')) {
      return convertToLocalhostUrl(`https://images.microcms-assets.io${processedUrl}`);
    }
    
    // その他の場合は完全なURLに変換してからlocalhost経由に変換
    return convertToLocalhostUrl(`https://images.microcms-assets.io/${processedUrl}`);
  }
  
  return processedUrl;
}

/**
 * HTMLコンテンツ内のmicroCMS画像URLを処理する
 * @param content HTMLコンテンツ
 * @returns 処理されたHTMLコンテンツ
 */
export function processMicroCMSImagesInContent(content: string): string {
  // 包括的なURL処理を最初に実行（localhostでない場合のみ）
  content = content.replace(
    /<img[^>]+src=["']([^"']*)["'][^>]*>/gi,
    (match, src) => {
      // 既にlocalhostの場合は処理しない
      if (src.includes('localhost')) {
        return match;
      }
      const processedSrc = processUrlComprehensive(src);
      return match.replace(src, processedSrc);
    }
  );
  
  // %22で囲まれたmicroCMS画像URLを処理（最優先）
  content = content.replace(
    /<img[^>]+src=["']([^"']*%22https:\/\/images\.microcms-assets\.io\/[^%]*%22[^"']*)["'][^>]*>/gi,
    (match, src) => {
      const processedSrc = processMicroCMSImageUrl(src);
      return match.replace(src, processedSrc);
    }
  );
  
  // %22で囲まれたmicroCMS画像URLを処理（より広範囲のパターン）
  content = content.replace(
    /<img[^>]+src=["']([^"']*%22[^%]*microcms-assets\.io[^%]*%22[^"']*)["'][^>]*>/gi,
    (match, src) => {
      const processedSrc = processMicroCMSImageUrl(src);
      return match.replace(src, processedSrc);
    }
  );
  
  // 二重エンコードされたURLを処理
  content = content.replace(
    /<img[^>]+src=["']([^"']*%22[^"']*microcms-assets\.io[^"']*)["'][^>]*>/gi,
    (match, src) => {
      const processedSrc = processMicroCMSImageUrl(src);
      return match.replace(src, processedSrc);
    }
  );
  
  // 通常のmicroCMS画像URLを処理
  content = content.replace(
    /<img[^>]+src=["']([^"']*microcms-assets\.io[^"']*)["'][^>]*>/gi,
    (match, src) => {
      const processedSrc = processMicroCMSImageUrl(src);
      return match.replace(src, processedSrc);
    }
  );
  
  return content;
}
