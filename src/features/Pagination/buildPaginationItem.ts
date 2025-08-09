/**
 *
 * @param total 総記事数
 * @param size 1ぺージあたりの記事数
 * @param currentPage 現在のページ
 * @param range 現在のページから前後何ページまで表示するか（デフォルト: 1）
 * @returns ページネーションのアイテムの配列
 */
export default function (
  total: number,
  size: number,
  currentPage: number,
  range: number = 1
): string[] {
  const numListOfPagination = [...Array(Math.ceil(total / size))].map(
    (_, i) => i + 1
  );

  const lastPage = numListOfPagination[numListOfPagination.length - 1];
  
  // ページ数が少ない場合は全て表示
  if (lastPage <= (range * 2 + 3)) {
    return numListOfPagination.map(num => String(num));
  }

  return numListOfPagination.map((num) => {
    // 最初と最後のページは必ず表示する
    if (num === 1 || num === lastPage) {
      return String(num);
    }

    const diff = Math.abs(currentPage - num);
    
    // 現在のページから前後rangeページ以内は表示する
    if (diff <= range) {
      return String(num);
    }

    // 省略記号の位置を判定
    // 最初のページと現在のページ範囲の間
    if (num === 2 && currentPage > range + 2) {
      return "...";
    }
    
    // 現在のページ範囲と最後のページの間
    if (num === lastPage - 1 && currentPage < lastPage - range - 1) {
      return "...";
    }

    return "";
  });
}
