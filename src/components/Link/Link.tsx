import { Icon } from "@iconify/react";

type Props = JSX.IntrinsicElements["a"] & {
  color?: "white" | "blue";
  icon?: {
    name: string;
    pos: "left" | "right";
  };
  isBrank?: boolean;
};
export const Link = ({
  color = "blue",
  icon,
  className,
  children,
  isBrank = false,
  ...props
}: Props) => {
  const colorClass = color === "blue" ? "blueLink" : "whiteLink";

  return (
    <a
      target={isBrank ? "_blank" : "_self"}
      rel={isBrank ? "noopener noreferrer" : ""}
      className={`${colorClass} ${className} hover:opacity-75"`}
      {...props}
    >
      {icon && icon.pos === "left" && (
        <Icon icon={icon.name} className="w-6 inline-block align-middle" />
      )}

      <span className="align-middle">{children}</span>
      {icon && icon.pos === "right" && (
        <Icon icon={icon.name} className="w-6 inline-block align-middle" />
      )}
    </a>
  );
};

// <!-- <style>
//   .whiteLink {
//     color: var(--text-color);
//   }

//   .blueLink {
//     @apply text-blue-600;
//   }
// </style> -->
