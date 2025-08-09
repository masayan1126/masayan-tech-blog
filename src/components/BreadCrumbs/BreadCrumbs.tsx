type Props = {
  lists: {
    name: string;
    path: string;
  }[];
};

export const BreadCrumbs = ({ lists }: Props) => {
  if (!lists) {
    return "";
  }

  return (
    <ol
      className="flex font-bold overflow-x-auto whitespace-nowrap text-xs mb-3 mt-4 md:mt-6"
      aria-label="breadcrumb"
    >
      {lists.map(({ name, path }, index) => (
        <li className="flex gap-6 items-center" key={index}>
          {lists.length - 1 !== index ? (
            <>
              <a className="text-sm md:text-base underline" href={path}>
                {name}
              </a>
              <span className="mr-3">{">"}</span>
            </>
          ) : (
            // <span className="text-sm md:text-base" aria-current="page">
            //   {name}
            // </span>
            <a className="text-sm md:text-base underline" href={path}>
              {name}
            </a>
          )}
        </li>
      ))}
    </ol>
  );
};
