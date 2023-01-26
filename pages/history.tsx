import { LOCAL_STORAGE_KEY } from 'constants/localStorage';
import React, { useCallback, useEffect, useState } from 'react';
import { IHistoryView } from 'types';
import { removeItemFromStorage, getItemFromStorage } from 'utils/storage';
import styles from 'styles/History.module.scss';
import classNames from 'classnames/bind';
import { LayoutPrimary } from 'layouts';
import { Meta } from 'components/Meta';
import { MovieListSkeleton } from 'modules/Movies';
import { Button } from 'components/ButtonCustomize';
import { IconEmptyHistory, IconPlay, IconTrash } from 'components/Icons';
import { PATH } from 'constants/path';
import { WrapperLink } from 'components/WrapperLink';
import { Image } from 'components/Image';
import { formatTimeDuration } from 'utils/timeFormat';
import { MovieTitle } from 'modules/Movies/MovieTitle';

const cx = classNames.bind(styles);

const HistoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [historyMovies, setHistoryMovies] = useState<IHistoryView[]>([]);

  const handleClearHistory = useCallback(() => {
    removeItemFromStorage(LOCAL_STORAGE_KEY.history);
    setHistoryMovies([]);
  }, []);

  useEffect(() => {
    const historyFromStorage: IHistoryView[] = getItemFromStorage(
      `${LOCAL_STORAGE_KEY.history}`,
      '[]'
    );
    setHistoryMovies(historyFromStorage);
    setIsLoading(false);
  }, []);

  return (
    <LayoutPrimary>
      <Meta title="History - NetFilm" />
      <div className="container">
        {isLoading ? (
          <MovieListSkeleton count={6} />
        ) : (
          <>
            <div className={cx('history-header')}>
              <h2 className={cx('history-heading')}>Watch Your Histories</h2>
              <Button
                className={cx('history-btn')}
                leftIcon={<IconTrash width={15} height={15} />}
                onClick={handleClearHistory}
              >
                Clear history
              </Button>
            </div>
            {historyMovies.length === 0 ? (
              <div className="section-empty">
                <IconEmptyHistory />
                <span>No watch history found</span>
              </div>
            ) : (
              <div className={cx('history-list')}>
                {historyMovies.map((movie) => {
                  const href = `${PATH.watch}/${movie.category}/${movie.id}`;
                  return (
                    <div className={cx('history-movieCard')} key={movie.id}>
                      <WrapperLink href={href} className={cx('history-movieCardMedia')}>
                        <Image
                          src={movie.coverHorizontalUrl}
                          width={312}
                          height={175}
                          className={cx('history-movieCardPoster')}
                          alt={movie.name}
                        />
                        <span className={cx('history-totalDuration')}>
                          {formatTimeDuration(Number(movie.totalDuration.toFixed()))}
                        </span>
                        <div className={cx('history-progress')}>
                          <div
                            className={cx('history-currentTime')}
                            style={{ width: `${movie.progress.toFixed()}%` }}
                          ></div>
                        </div>
                        <IconPlay
                          fill="#fff"
                          className={cx('history-movieCardPlay')}
                          width={32}
                          height={32}
                        />
                        <MovieTitle href={href} className={cx('history-movieCardTitle')}>
                          {movie.name} {movie.currentEpName && `- ${movie.currentEpName}`}
                        </MovieTitle>
                      </WrapperLink>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </LayoutPrimary>
  );
};

export default HistoryPage;
