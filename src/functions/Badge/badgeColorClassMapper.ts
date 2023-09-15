import type { BadgeItemImportanceProps } from "@/types/Badge/badgeProps";

const badgeColorMapper = new Map<string, string>();

badgeColorMapper.set("primary", "bg-blue-100 text-blue-900");

export const colorOf = (importance: BadgeItemImportanceProps) => {
  const colorClass = badgeColorMapper.get(importance);
  if (!colorClass) {
    throw new Error(`Invalid importance: ${importance}`);
  }

  return colorClass;
};
