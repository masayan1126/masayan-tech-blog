/**
 *
 * @param total 総記事数
 * @param size 1ぺージあたりの記事数
 * @param currentPage 現在のページ
 * @returns ページネーションのアイテムの配列
 */
export default function (
  total: number,
  size: number,
  currentPage: number
): string[] {
  const numListOfPagination = [...Array(Math.ceil(total / size))].map(
    (_, i) => i + 1
  );

  const lastPage = numListOfPagination[numListOfPagination.length - 1];
  return numListOfPagination.map((num) => {
    // 最初と最後のページは必ず表示する
    if (num === 1 || num === lastPage) {
      return String(num);
    }

    const diff = Math.abs(currentPage - num);
    if (diff > 1) return "";

    // 現在のページから前後3ページ以内は表示する
    return String(num);
  });
}
