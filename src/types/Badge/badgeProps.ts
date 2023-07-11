export type BadgeItemProp = {
  id: string;
  name: string;
};

export type BadgeItemImportanceProps = "primary" | "secondary";

export type BadgeItemProps = {
  item: BadgeItemProp;
  importance?: BadgeItemImportanceProps;
};
