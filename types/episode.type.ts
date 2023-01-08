export interface IDefinitionLokLok {
  code: string;
  description: string;
  fullDescription: string;
}

export interface ISubtitlingLokLok {
  language: string;
  languageAbbr: string;
  subtitlingUrl: string;
  translateType: string;
}

export interface IQuality {
  quality: number;
  url: string;
}

export interface ISubtitle {
  url: string;
  lang: string;
  language: string;
}

export interface IEpisodeVo {
  id: number;
  definitionList: IDefinitionLokLok[];
  name: string;
  nameJson: string;
  resourceType: string;
  seriesNo: number;
  subtitlingList: ISubtitlingLokLok[];
}

export interface IEpisodeRoom {
  category: number;
  episodeId: string;
  episodeName: string;
  number: number;
  roomId: string;
  seasonID: string;
  seasonName: string;
}
