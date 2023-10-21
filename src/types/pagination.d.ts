export type Pagination = {
  page: {
    data: Blog[];
    currentPage: number;
    lastPage: number;
    size: number;
    total: number;
    url: { current: string; next?: string; prev?: string };
  };
};
