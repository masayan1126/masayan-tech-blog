import buildPaginationItem from "@/features/Pagination/buildPaginationItem";

describe("ページネーションのアイテム生成関数", () => {
  describe("ページネーションのアイテムを配列として生成できる", () => {
    test("全104記事で1ページあたり10記事を表示、現在のページが3ページの場合は1から4ページまでと最後の11ページが表示", () => {
      const actual = buildPaginationItem(104, 10, 3);
      expect(actual).toStrictEqual([
        "1",
        "2",
        "3",
        "4",
        "",
        "",
        "",
        "",
        "",
        "",
        "11",
      ]);
    });
    test("全記事が1ページに収まる場合は1ページのみ表示", () => {
      const actual = buildPaginationItem(9, 10, 1);
      expect(actual).toStrictEqual(["1"]);
    });
  });
});
