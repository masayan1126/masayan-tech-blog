import { ARTICLES_PATH } from "@/features/Blog/List/constants/path";

const headerLinkMapper = new Map<
  string,
  { href: string; text: string; iconName: string }[]
>();

// Phosphor Iconsを使用したおしゃれなアイコン
headerLinkMapper
  .set("home", [
    { href: "/categories", text: "Categories", iconName: "ph:squares-four-bold" },
    { href: "/about", text: "About", iconName: "ph:user-circle-bold" },
  ])

  .set("blog", [
    { href: "/categories", text: "Categories", iconName: "ph:squares-four-bold" },
    { href: "/about", text: "About", iconName: "ph:user-circle-bold" },
  ])
  .set("about", [
    { href: ARTICLES_PATH, text: "Home", iconName: "ph:house-bold" },
    { href: "/categories", text: "Categories", iconName: "ph:squares-four-bold" },
  ])
  .set("categories", [
    { href: ARTICLES_PATH, text: "Home", iconName: "ph:house-bold" },
    { href: "/about", text: "About", iconName: "ph:user-circle-bold" },
  ])
  .set("disclaimer", [
    { href: "/categories", text: "Categories", iconName: "ph:squares-four-bold" },
    { href: "/about", text: "About", iconName: "ph:user-circle-bold" },
  ])
  .set("404", []);

export const headerLinkOf = (currentUrl: string) => {
  const headerLink = headerLinkMapper.get(currentUrl);
  if (!headerLink) {
    throw new Error(`Invalid url: ${currentUrl}`);
  }

  return headerLink;
};
