import type { BadgeItemImportanceProps } from "@/types/Badge/badgeProps";

const badgeColorMapper = new Map<string, string>();

badgeColorMapper.set("primary", "bg-purple-100 text-purple-900");
badgeColorMapper.set("secondary", "bg-emerald-100 text-emerald-900");

export const colorOf = (importance: BadgeItemImportanceProps) => {
  const colorClass = badgeColorMapper.get(importance);
  if (!colorClass) {
    throw new Error(`Invalid importance: ${importance}`);
  }

  return colorClass;
};
