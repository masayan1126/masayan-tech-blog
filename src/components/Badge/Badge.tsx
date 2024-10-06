import { colorOf } from "@/functions/Badge/badgeColorClassMapper";
import type { BadgeItemProps } from "@/types/Badge/badgeProps";

export default function Badge({
  item,
  importance = "secondary",
}: BadgeItemProps) {
  return (
    <span
      className={`text-sm font-medium mr-2 px-2.5 py-0.5 rounded ${colorOf(
        importance
      )}`}
    >
      {item.name}
    </span>
  );
}
