import Badge from "@/components/Badge/Badge";
import type { BadgeItemProp } from "@/types/Badge/badgeProps";

type Props = {
  items: BadgeItemProp[];
  clickable?: boolean;
};

export default function BadgeGroup({ items, clickable }: Props) {
  if (!clickable)
    return items.map((item) => <Badge item={item} key={item.id} />);

  return items.map((item) => (
    <a href={`/category/${item.id}/1`}>
      <Badge item={item} key={item.id} />
    </a>
  ));
}
