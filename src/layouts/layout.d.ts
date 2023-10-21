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

export interface BasicLayoutProps {
  title: string;
  description: string;
}

export interface BaseLayoutProps extends BasicLayoutProps {
  context: string;
  heroImage?: string;
  breadCrumbsList: {
    name: string;
    path: string;
  }[];
}
