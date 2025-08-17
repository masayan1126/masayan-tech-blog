import { BadgeGroup } from '@/components/Badge/BadgeGroup';
import type { BadgeItemProp } from '@/types/Badge/badgeProps';

interface BlogCategoryBadgeGroupProps {
  categories: {
    id: string;
    name: string;
  }[];
}

export const BlogCategoryBadgeGroup = ({ categories }: BlogCategoryBadgeGroupProps) => {
  const badgeItems: BadgeItemProp[] = categories.map(category => ({
    id: category.id,
    name: category.name,
  }));

  return <BadgeGroup items={badgeItems} />;
};
