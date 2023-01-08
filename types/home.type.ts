export interface IBanner {
  id: number;
  title: string;
  imageUrl: string;
  jumpType: number;
}

export interface IRecommendVO {
  contentType: string;
  id: number;
  imageUrl: string;
  jumpAddress: string;
  jumpType: string;
  needLogin: boolean;
  resourceNum: number;
  resourceStatus: number;
  showMark: boolean;
  title: string;
  category?: number;
}

export interface IHomeSection {
  bannerProportion?: number | null;
  coverType?: any;
  homeSectionId: number;
  homeSectionName: string;
  homeSectionType: string;
  recommendContentVOList: IRecommendVO[];
  refId?: any;
  refRedirectUrl: string;
  blockGroupNum?: any;
}

export interface IResponseHome {
  page: number;
  recommendItems: IHomeSection[];
  searchKeyWord: string;
}
