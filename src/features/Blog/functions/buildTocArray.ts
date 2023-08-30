export const buildTocArray = (input: string, tagName: string = "h2") => {
  const regex = new RegExp(`<${tagName}[^>]*>(.*?)<\/${tagName}>`, "g");
  const matches = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    matches.push(match[1]);
  }

  return matches;
};
