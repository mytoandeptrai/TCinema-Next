export interface IHistoryView {
  key: string;
  id: string;
  name: string;
  category: string;
  coverVerticalUrl: string;
  coverHorizontalUrl: string;
  episode: number;
  episodeName: number | string;
  currentEpName: string;
  progress: number;
  totalDuration: number;
  currentTime: number;
}
