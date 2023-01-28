import { IObjIdName } from './common.type';
import { IEpisodeRoom, IEpisodeVo } from './episode.type';

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

export interface ILikeMovieLokLok {
  areaList: IObjIdName[];
  areaNameList: string[];
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  drameTypeVo?: any;
  id: string;
  name: string;
  seriesNo?: number;
  resourceNum?: number;
  resourceStatus?: number;
  score?: number;
  tagList: IObjIdName[];
  tagNameList: string[];
  upImgUrl: string;
  upName: string;
  year: number;
}

export interface IMovieDetail {
  aliasName: string;
  areaNameList: string[];
  areaList: IObjIdName[];
  category: number;
  collect: boolean;
  contentTagResourceList: any[];
  coverHorizontalUrl: string;
  coverHorizontalUrlJson: string;
  coverVerticalUrl: string;
  drameTypeVo: { drameName: string; drameType: string };
  episodeCount?: number;
  episodeRoomListVo: IEpisodeRoom;
  episodeVo: IEpisodeVo[];
  id: string;
  introduction: string;
  likeList: ILikeMovieLokLok[];
  name: string;
  nameJson: string;
  refList: IRefItem[];
  reserved: boolean;
  score: number;
  seriesNo?: number | string | null;
  showSetName: boolean;
  starList: IStar[];
  tagList: IObjIdName[];
  tagNameList: string[];
  length: number;
  translateType: number;
  upInfo: { upId: number; upImgUrl: string; upName: string };
  updateInfo: {
    updatePeriod: string;
    updateStatus: number;
  } | null;
  year: number;
}

export interface IMovieSearch {
  areas: IObjIdName[];
  categoryTag: IObjIdName[];
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  domainType: number;
  dramaType: {
    code: string;
    name: string;
  };
  duration: string;
  id: string;
  name: string;
  releaseTime: string;
  sort: string;
  upInfo: {
    enable: boolean;
    upId: number;
    upImgUrl: string;
    upName: string;
    userId: string | null;
  };
}
