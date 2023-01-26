import classNames from 'classnames/bind';
import { MediaPlayer } from 'components/MediaPlayer';
import { Meta } from 'components/Meta';
import { resizeImageLokLok } from 'constants/global';
import { LOCAL_STORAGE_KEY } from 'constants/localStorage';
import { LayoutPrimary } from 'layouts';
import { CommentList } from 'modules/Comments';
import { MovieCard, MovieList } from 'modules/Movies';
import { useRouter } from 'next/router';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { IEpisode, IHistoryView } from 'types';
import { getItemFromStorage, setKeyIntoStorage } from 'utils/storage';
import { v4 as uuidv4 } from 'uuid';
import { WatchActions } from '../WatchActions';
import { WatchAnthology } from '../WatchAnthology';
import { WatchCategory } from '../WatchCategory';
import { WatchMeta } from '../WatchMeta';
import { WatchRelatedSeries } from '../WatchRelatedSeries';
import { WatchStars } from '../WatchStars';
import { WatchSummary } from '../WatchSummary';
import styles from './WatchHome.module.scss';

const cx = classNames.bind(styles);

type Props = {
  data: IEpisode;
};

const WatchHome = ({ data }: Props) => {
  const router = useRouter();
  const { id, category, episode } = router.query;
  const [isMounted, setIsMounted] = useState(false);

  const handleSaveProgressHistory = useCallback(
    (e: SyntheticEvent<HTMLVideoElement>) => {
      const node = e.target as HTMLVideoElement;
      if (isNaN(node.duration)) return;

      let cloneHistoryLS: IHistoryView[] = getItemFromStorage(`${LOCAL_STORAGE_KEY.history}`, '[]');
      const foundWatchedMovieIndex = cloneHistoryLS.findIndex((history) => {
        return history.id === id && history.episode === data.episode;
      });
      if (foundWatchedMovieIndex === -1) return;

      const percentProgress = (node.currentTime / node.duration) * 100;
      cloneHistoryLS[foundWatchedMovieIndex].currentTime = node.currentTime;
      cloneHistoryLS[foundWatchedMovieIndex].totalDuration = node.duration;
      cloneHistoryLS[foundWatchedMovieIndex].progress = percentProgress;
      setKeyIntoStorage(LOCAL_STORAGE_KEY.history, cloneHistoryLS);
    },
    [data, id]
  );

  useEffect(() => {
    if (!data) return;
    let historyLS: IHistoryView[] = getItemFromStorage(`${LOCAL_STORAGE_KEY.history}`, '[]');
    /** Get maximum 30 if over 30 movies in localStorage */
    if (historyLS.length >= 30) {
      historyLS = historyLS.slice(0, 30);
    }

    const foundMovieIndex = historyLS?.findIndex(
      (el) => el.id === id && el.episode === data.episode
    );

    if (foundMovieIndex !== -1) {
      const cloneFoundMovie = historyLS[foundMovieIndex];
      cloneFoundMovie.progress = 0;
      cloneFoundMovie.currentTime = 0;

      /** reset historyLS to push cloneFoundMovie to first seat */
      historyLS.splice(foundMovieIndex, 1);
      historyLS.unshift(cloneFoundMovie);
      setKeyIntoStorage(LOCAL_STORAGE_KEY.history, historyLS);
      return;
    }

    const history = {
      key: uuidv4(),
      id: data?.id,
      category: category as string,
      name: data?.name,
      coverVerticalUrl: data?.coverVerticalUrl,
      coverHorizontalUrl: data?.coverHorizontalUrl,
      episode: data?.episode,
      episodeName: data?.currentEpName,
      currentEpName: data?.currentEpName,
      totalDuration: data?.totalDuration,
      progress: 0,
      currentTime: 0
    };

    setKeyIntoStorage(LOCAL_STORAGE_KEY.history, [history, ...historyLS]);
  }, [data, id, category, episode]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Meta
        title={`${data.name} - NetFilm`}
        description={data.introduction}
        image={resizeImageLokLok(data.coverHorizontalUrl, 800, 418)}
      />
    );
  }

  return (
    <LayoutPrimary>
      <div className={cx('container')}>
        <Meta
          title={`${data.name} - NetFilm`}
          description={data.introduction}
          image={resizeImageLokLok(data.coverHorizontalUrl, 800, 418)}
        />

        <div className={cx('watchHome-container')}>
          <div className={cx('watchHome-content')}>
            <MediaPlayer
              subtitles={data.subtitles}
              qualities={data.qualities}
              poster={data.coverHorizontalUrl}
              onProgress={handleSaveProgressHistory}
            />
            <h1 className={cx('watchHome-heading')}>
              {data.name} {data.currentEpName ? `- ${data.currentEpName}` : null}
            </h1>

            <div className={cx('watchHome-more')}>
              <WatchMeta
                areaList={data.areaList}
                currentEpisode={data.currentEpisode}
                episodeCount={data.episodeCount}
                score={data.score}
                year={data.year}
              />
              <WatchActions
                id={data.id}
                title={data.name}
                domainType={data.category}
                poster={data.coverVerticalUrl}
              />
            </div>
            <WatchCategory categories={data.tagList} />
            <WatchSummary introduction={data.introduction} />
            <WatchStars starsList={data.starList} />
          </div>
          <div className={cx('watchHome-sidebar', 'scrollbar')}>
            <WatchAnthology detailMovie={data} />
            <WatchRelatedSeries refList={data.refList} />
          </div>
        </div>
        <div className={cx('watchHome-content')}>
          <CommentList />
        </div>
        {data?.likeList.length > 0 ? (
          <MovieList heading="You may like">
            {data.likeList.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.name}
                poster={movie.coverVerticalUrl}
                domainType={movie.category}
              />
            ))}
          </MovieList>
        ) : null}
      </div>
    </LayoutPrimary>
  );
};

export default WatchHome;
