import { test, expect } from "@playwright/test";

test("記事一覧から記事詳細を遷移し、表示できる", async ({ page }) => {
  await page.goto("");

  await expect(page).toHaveTitle(/ブログ記事一覧/);

  const heading =
    (await page.locator(".card-title").first().textContent()) ?? "";

  const a = page.locator(".mt-3 > div > .blueLink").first();
  await a.click();

  const h1 = (await page.locator("h1").first().textContent()) ?? "";

  expect(h1).toBe(heading);
});
