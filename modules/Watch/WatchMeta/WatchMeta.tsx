import classNames from 'classnames/bind';
import { IconStar } from 'components/Icons';
import { IObjIdName } from 'types';
import styles from './WatchMeta.module.scss';

const cx = classNames.bind(styles);

type Props = {
  areaList: IObjIdName[];
  currentEpisode: number;
  episodeCount: number;
  year: number;
  score: number;
};

const WatchMeta = ({ areaList, currentEpisode, episodeCount, score, year }: Props) => {
  return (
    <ul className={cx('watchMeta-list')}>
      <li className={cx('watchMeta-icon', 'watchMeta-item')}>
        <IconStar fill="#e8b647" width={16} height={16} />
        {score}
      </li>
      <li className={cx('watchMeta-areas', 'watchMeta-item')}>
        {areaList.map((area) => (
          <span key={area.id} className={cx('watchMeta-areaName')}>
            {area.name}
          </span>
        ))}
      </li>
      {currentEpisode ? (
        <li>
          Ep {currentEpisode} / {episodeCount}
        </li>
      ) : null}
      <li className={cx('watchMeta-year', 'watchMeta-item')}>{year}</li>
    </ul>
  );
};

export default WatchMeta;
