import Badge from "@/components/Badge/Badge";
import { ARTICLES_PATH } from "@/features/Blog/List/constants/path";
import type { BadgeItemProp } from "@/types/Badge/badgeProps";

type Props = {
  items: BadgeItemProp[];
};

export const BadgeGroup = ({ items }: Props) => {
  return (
    <div className="badge-group" style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
      {items.map((item, i) => (
        <a 
          key={item.id + i} 
          href={`/category/${item.id}${ARTICLES_PATH}`}
          className="badge-link"
          style={{
            textDecoration: "none",
            display: "inline-block",
            transition: "transform 0.15s ease-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(0.98)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <Badge item={item} />
        </a>
      ))}
    </div>
  );
};
