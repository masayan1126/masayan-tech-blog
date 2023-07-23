import { Link } from "@/components/Link/Link";

type Props = JSX.IntrinsicElements["a"] & {
  iconName?: string;
};

export const BlogListLink = ({ iconName, children, ...other }: Props) => {
  return (
    <div>
      {iconName ? (
        <Link icon={{ name: iconName, pos: "left" }} {...other} color="blue">
          {children}
        </Link>
      ) : (
        <Link {...other} color="blue">
          {children}
        </Link>
      )}
    </div>
  );
};
