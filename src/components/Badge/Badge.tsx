import { colorOf } from "@/functions/Badge/badgeColorClassMapper";
import type { BadgeItemProps } from "@/types/Badge/badgeProps";
import { PRIMARY_COLOR } from "@/constants/colors";

export default function Badge({
  item,
  importance = "secondary",
}: BadgeItemProps) {
  return (
    <span
      className={`modern-badge text-sm font-medium mr-2 px-2.5 py-0.5 rounded ${colorOf(
        importance
      )}`}
      style={{
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        transformOrigin: "center",
        cursor: "pointer",
        position: "relative",
        display: "inline-block",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
        e.currentTarget.style.boxShadow = `0 4px 8px ${PRIMARY_COLOR.rgba(0.25)}`;
        e.currentTarget.style.borderColor = PRIMARY_COLOR.rgba(0.4);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      {item.name}
    </span>
  );
}
