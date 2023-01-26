import classNames from 'classnames/bind';
import { IconPlay } from 'components/Icons';
import { WrapperLink } from 'components/WrapperLink';
import { PATH } from 'constants/path';
import { useRouter } from 'next/router';
import React from 'react';
import { IEpisode } from 'types';
import styles from './WatchAnthology.module.scss';

const cx = classNames.bind(styles);

type Props = {
  detailMovie: IEpisode;
};

const WatchAnthology = ({ detailMovie }: Props) => {
  const router = useRouter();
  const { episode = detailMovie.episodeVo[0].id } = router.query;

  if (detailMovie.episodeVo.length <= 1) return null;

  return (
    <div className={cx('watchAnthology-list')}>
      {detailMovie?.episodeVo?.map(({ seriesNo, id }) => {
        const href = `${PATH.watch}/${detailMovie.category}/${detailMovie.id}/${id}`;
        const active = id === Number(episode);
        return (
          <WrapperLink href={href} key={id}>
            <button>{active ? <IconPlay fill="#8a3cff" /> : seriesNo}</button>
          </WrapperLink>
        );
      })}
    </div>
  );
};

export default WatchAnthology;
