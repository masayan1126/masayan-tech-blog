import Badge from "@/components/Badge/Badge";
import type { BadgeItemProp } from "@/types/Badge/badgeProps";

type Props = {
  items: BadgeItemProp[];
};

export const BadgeGroup = ({ items }: Props) => {
  return (
    <>
      {items.map((item, i) => (
        <a key={item.id + i} href={`/category/${item.id}/page/1`}>
          <Badge item={item} />
        </a>
      ))}
    </>
  );
};
