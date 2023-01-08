import { IObjIdName } from './common.type';
import { IDefinitionLokLok, ISubtitlingLokLok } from './episode.type';

export interface IDiscoveryRef {
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  drameTypeVo: any;
  id: string;
  name: string;
  score: number;
  tagList: IObjIdName[];
  year: number;
}

export interface IUpInfo {
  enable: boolean;
  upId: number;
  upImgUrl: string;
  upName: string;
  userId: any;
}

export interface IMediaPreview {
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  duration: number;
  id: string;
  introduction: string;
  like: false;
  likeCount: number;
  mediaInfo: {
    definitionList: IDefinitionLokLok[];
    id: number;
    resourceType: number;
    subtitlingList: ISubtitlingLokLok[];
  };
  name: string;
  refList: IDiscoveryRef[];
  upInfo: IUpInfo;
}

export interface IDiscovery extends IMediaPreview {
  mediaInfoUrl: {
    businessType: number;
    currentDefinition: string;
    episodeId: string;
    mediaUrl: string;
    totalDuration: number;
  };
}

export interface IDefinitionDataNewDetails {
  content: string;
  createTime: string;
  id: string | null;
  keyword: any;
  title: string;
}

export interface INewDetails {
  code: string;
  msg: string;
  data: IDefinitionDataNewDetails;
}
