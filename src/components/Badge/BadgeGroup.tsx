import Badge from "@/components/Badge/Badge";
import { ARTICLES_PATH } from "@/features/Blog/List/constants/path";
import type { BadgeItemProp } from "@/types/Badge/badgeProps";

type Props = {
  items: BadgeItemProp[];
};

export const BadgeGroup = ({ items }: Props) => {
  return (
    <>
      {items.map((item, i) => (
        <a key={item.id + i} href={`/category/${item.id}${ARTICLES_PATH}`}>
          <Badge item={item} />
        </a>
      ))}
    </>
  );
};
