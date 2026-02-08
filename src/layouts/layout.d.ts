export interface BasicLayoutProps {
  title: string;
  description: string;
}

export interface BaseLayoutProps extends BasicLayoutProps {
  context: string;
  heroImage?: string;
  image?: string;
  noindex?: boolean;
  breadCrumbsList: {
    name: string;
    path: string;
  }[];
}
