// export type BaseLayoutProps = {
//   title: string;
//   description: string;
//   context: string;
//   heroImage?: string;
//   breadCrumbsList: {
//     name: string;
//     path: string;
//   }[];
// };

export interface LayoutProps {
  title: string;
  description: string;
}

export interface BaseLayoutProps extends LayoutProps {
  context: string;
  heroImage?: string;
  breadCrumbsList: {
    name: string;
    path: string;
  }[];
}
