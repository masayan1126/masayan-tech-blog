import type { BadgeItemImportanceProps } from "@/types/Badge/badgeProps";

const badgeColorMapper = new Map<string, string>();

badgeColorMapper.set("primary", "bg-teal-100 text-teal-600");

export const colorOf = (importance: BadgeItemImportanceProps) => {
  const colorClass = badgeColorMapper.get(importance);
  if (!colorClass) {
    throw new Error(`Invalid importance: ${importance}`);
  }

  return colorClass;
};
