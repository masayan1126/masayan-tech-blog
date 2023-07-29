import Badge from "@/components/Badge/Badge";
import type { BadgeItemProp } from "@/types/Badge/badgeProps";

type Props = {
  items: BadgeItemProp[];
  clickable?: boolean;
};

export const BadgeGroup = ({ items, clickable }: Props) => {
  return (
    <>
      {!clickable
        ? items.map((item, i) => <Badge item={item} key={item.id + i} />)
        : items.map((item, i) => (
            <a key={item.id + i} href={`/category/${item.id}/page/1`}>
              <Badge item={item} />
            </a>
          ))}
    </>
  );
};
