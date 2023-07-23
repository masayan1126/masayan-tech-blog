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
        ? items.map((item) => <Badge item={item} key={item.id} />)
        : items.map((item) => (
            <a key={item.id} href={`/category/${item.id}/1`}>
              <Badge item={item} key={item.id} />
            </a>
          ))}
    </>
  );
};
