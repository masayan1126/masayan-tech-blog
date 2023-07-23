import { BadgeGroup } from "@/components/Badge/BadgeGroup";
import type { BadgeItemProp } from "@/types/Badge/badgeProps";

type Props = {
  categories: BadgeItemProp[];
  clickable?: boolean;
};

export default function BlogCategoryBadgeGroup({
  categories,
  clickable,
}: Props) {
  return (
    <div>
      <BadgeGroup items={categories} clickable={clickable} />
    </div>
  );
}
