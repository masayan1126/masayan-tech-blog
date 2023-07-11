import Badge from "@/components/Badge/Badge";
import type { BadgeItemProp } from "@/types/Badge/badgeProps";

type Props = {
  items: BadgeItemProp[];
};

export default function BadgeGroup({ items }: Props) {
  return items.map((item) => <Badge item={item} key={item.id} />);
}
