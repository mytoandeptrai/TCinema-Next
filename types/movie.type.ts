import { IObjIdName } from './common.type';

export interface IStar {
  image: string;
  localName: string;
  role: string;
  roleName: string;
  starId: number;
}

export interface IRefItem {
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  drameTypeVo?: any;
  id: string;
  name: string;
  seriesNo: number;
}

export interface ILikeMovie {
  areaList: IObjIdName[];
  areaNameList: string[];
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  drameTypeVo?: any;
  id: string;
  name: string;
  seriesNo: number;
  score: number;
  tagList: IObjIdName[];
  tagNameList: string[];
  upImgUrl: string;
  upName: string;
  year: number;
}

export interface IMovieCard {
  id: string;
  title: string;
  domainType: number;
  poster: string;
}

export interface IMovieHomePayload {
  page: number;
}
