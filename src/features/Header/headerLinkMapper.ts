import { ARTICLES_PATH } from "@/features/Blog/List/constants/path";

const headerLinkMapper = new Map<
  string,
  { href: string; text: string; iconName: string }[]
>();

headerLinkMapper
  .set("home", [
    { href: "/categories", text: "Categories", iconName: "mdi:tag-multiple-outline" },
    { href: "/about", text: "About", iconName: "mdi:account-circle-outline" },
  ])

  .set("blog", [
    { href: "/categories", text: "Categories", iconName: "mdi:tag-multiple-outline" },
    { href: "/about", text: "About", iconName: "mdi:account-circle-outline" },
  ])
  .set("about", [
    { href: ARTICLES_PATH, text: "Home", iconName: "mdi:home-variant-outline" },
    { href: "/categories", text: "Categories", iconName: "mdi:tag-multiple-outline" },
  ])
  .set("categories", [
    { href: ARTICLES_PATH, text: "Home", iconName: "mdi:home-variant-outline" },
    { href: "/about", text: "About", iconName: "mdi:account-circle-outline" },
  ])
  .set("disclaimer", [
    { href: "/categories", text: "Categories", iconName: "mdi:tag-multiple-outline" },
    { href: "/about", text: "About", iconName: "mdi:account-circle-outline" },
  ])
  .set("404", []);

export const headerLinkOf = (currentUrl: string) => {
  const headerLink = headerLinkMapper.get(currentUrl);
  if (!headerLink) {
    throw new Error(`Invalid url: ${currentUrl}`);
  }

  return headerLink;
};
