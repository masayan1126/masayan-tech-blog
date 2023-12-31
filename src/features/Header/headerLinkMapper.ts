import { ARTICLES_PATH } from "@/features/Blog/List/constants/path";

const headerLinkMapper = new Map<
  string,
  { href: string; text: string; iconName: string }[]
>();

headerLinkMapper
  .set("home", [
    // { href: "/blogs", text: "Blog", iconName: "jam:blogger-square" },
    { href: "/about", text: "About", iconName: "carbon:user-profile-alt" },
  ])

  .set("blog", [
    { href: "/about", text: "About", iconName: "carbon:user-profile-alt" },
  ])
  .set("about", [
    { href: ARTICLES_PATH, text: "Home", iconName: "carbon:home" },
    // { href: "/blogs", text: "Blog", iconName: "jam:blogger-square" },
  ])
  .set("disclaimer", [
    { href: "/about", text: "About", iconName: "carbon:user-profile-alt" },
  ])
  .set("404", []);

export const headerLinkOf = (currentUrl: string) => {
  const headerLink = headerLinkMapper.get(currentUrl);
  if (!headerLink) {
    throw new Error(`Invalid url: ${currentUrl}`);
  }

  return headerLink;
};
