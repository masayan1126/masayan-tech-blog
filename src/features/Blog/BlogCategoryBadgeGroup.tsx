import { BadgeGroup } from "@/components/Badge/BadgeGroup";
import type { BadgeItemProp } from "@/types/Badge/badgeProps";

type Props = {
  categories: BadgeItemProp[];
};

export default function BlogCategoryBadgeGroup({ categories }: Props) {
  return (
    <div>
      <BadgeGroup items={categories} />
    </div>
  );
}
