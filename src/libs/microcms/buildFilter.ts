export type FilterType = "categoryId";

export default function (type: FilterType, ids: string[]) {
  // Ex)category[contains]python[or]category[contains]react
  if (type === "categoryId") {
    return ids
      .map((categoryId) => `category[contains]${categoryId}`)
      .join("[or]"); // MEMO: equalsだと、記事に紐づくcategoryが配列なので一致しないのでcontainsにしている
  }
  return ids
    .map((categoryId) => `category[contains]${categoryId}`)
    .join("[or]"); // MEMO: equalsだと、記事に紐づくcategoryが配列なので一致しないのでcontainsにしている
}
