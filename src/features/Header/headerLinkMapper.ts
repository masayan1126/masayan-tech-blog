const headerLinkMapper = new Map<
  string,
  { href: string; text: string; iconName: string }[]
>();

headerLinkMapper
  .set("home", [
    { href: "/blogs", text: "Blog", iconName: "jam:blogger-square" },
    { href: "/about", text: "About", iconName: "carbon:user-profile-alt" },
  ])
  .set("blogs", [
    { href: "/", text: "Home", iconName: "carbon:home" },
    { href: "/about", text: "About", iconName: "carbon:user-profile-alt" },
  ])
  .set("blog", [
    { href: "/", text: "Home", iconName: "carbon:home" },
    { href: "/about", text: "About", iconName: "carbon:user-profile-alt" },
  ])
  .set("about", [
    { href: "/", text: "Home", iconName: "carbon:home" },
    { href: "/blogs", text: "Blog", iconName: "jam:blogger-square" },
  ]);

export const headerLinkOf = (currentUrl: string) => {
  const headerLink = headerLinkMapper.get(currentUrl);
  if (!headerLink) {
    throw new Error(`Invalid url: ${currentUrl}`);
  }

  return headerLink;
};
