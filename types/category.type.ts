export interface IFilterOptionItem {
  name: string;
  params: string;
  screeningType: string;
}

export interface IFilterOptions {
  id: number;
  name: string;
  items: IFilterOptionItem[];
}

export interface IFilter {
  id: string;
  name: string;
  params: string;
  screeningItems: IFilterOptions[];
}

export interface ICategoryResult {
  coverVerticalUrl: string;
  domainType: number;
  id: string;
  name: string;
  score: string;
  sort: string;
}

export interface ICategoryPayload {
  page?: number;
  area: string;
  category: number;
  order: string;
  size: number;
  params: string;
  sort: string;
  title: string;
  year: string;
  nextMovieId?: any;
}
