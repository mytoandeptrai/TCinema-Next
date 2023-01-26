import classNames from 'classnames/bind';
import { IconHeart, IconShare } from 'components/Icons';
import { Image } from 'components/Image';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { WrapperLink } from 'components/WrapperLink';
import { PATH } from 'constants/path';
import useElementOnScreen from 'hooks/useElementOnScreen';
import dynamic from 'next/dynamic';
import { SyntheticEvent, useCallback, useMemo, useRef, useState } from 'react';
import { IDiscovery } from 'types';
import styles from './DiscoveryCard.module.scss';

const ReactHlsPlayer = dynamic(() => import('react-hls-player'), {
  ssr: false
});

const cx = classNames.bind(styles);

type Props = {
  info: IDiscovery;
};

const DiscoveryCard = ({ info }: Props) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const playerOption = {
    root: null,
    rootMargin: '0px',
    threshold: 1
  };

  const isVisibleElement = useElementOnScreen(playerOption, playerRef);

  const firstMovie = info.refList?.[0];

  const [isLoved, setIsLoved] = useState(false);
  const [playerStyles, setPlayerStyles] = useState({
    maxWidth: '0px',
    aspectRatio: 1
  });

  const isLoading = playerStyles.maxWidth === '0px';

  const poster = useMemo(() => {
    const url = firstMovie
      ? playerStyles.aspectRatio < 1
        ? firstMovie.coverVerticalUrl
        : firstMovie.coverHorizontalUrl
      : info.coverHorizontalUrl;
    return url;
  }, [firstMovie, info, playerStyles]);

  const handleLoadedMetadata = useCallback(
    (e: SyntheticEvent<HTMLVideoElement>) => {
      const node = e.target as HTMLVideoElement;
      const aspectRatioOfVideoElement = node.videoWidth / node.videoHeight;

      if (aspectRatioOfVideoElement === 1) {
        setPlayerStyles((prev) => ({
          ...prev,
          maxWidth: '473px',
          aspectRatio: aspectRatioOfVideoElement
        }));
        return;
      }

      if (aspectRatioOfVideoElement > 1) {
        setPlayerStyles((prev) => ({
          ...prev,
          maxWidth: '522px',
          aspectRatio: aspectRatioOfVideoElement
        }));
        return;
      }

      if (aspectRatioOfVideoElement < 1) {
        setPlayerStyles((prev) => ({
          ...prev,
          maxWidth: '280px',
          aspectRatio: aspectRatioOfVideoElement
        }));
        return;
      }
    },
    [setPlayerStyles]
  );

  return (
    <div className={cx('discoveryCard-container')}>
      <div className={cx('discoveryCard-movieInfo')}>
        <div className={cx('discoveryCard-movieAvatar')}>
          <Image width={56} height={56} alt={info.upInfo.upName} src={info.upInfo.upImgUrl} />
        </div>
        <div className={cx('discoveryCard-movieDesc')}>
          <h4 className={cx('discoveryCard-movieName')}>{info.upInfo.upName}</h4>
          <p className={cx('discoveryCard-movieIntro')}>{info.introduction}</p>
          {firstMovie ? (
            <WrapperLink
              className={cx('discoveryCard-movieLink')}
              href={`${PATH.watch}/${firstMovie?.category}/${firstMovie?.id}`}
            >
              {firstMovie?.name}
            </WrapperLink>
          ) : null}
        </div>
      </div>
      {isLoading ? (
        <div className={cx('discoveryCard-loading')}>
          <LoadingSpinner />
          <span>Loading video....</span>
        </div>
      ) : null}
      <div className={cx('discoveryCard-playerContent')}>
        <ReactHlsPlayer
          controls
          poster={poster}
          src={info.mediaInfoUrl.mediaUrl}
          style={playerStyles}
          playsInline={true}
          playerRef={playerRef}
          onLoadedMetadata={handleLoadedMetadata}
          muted
          className={cx('discoveryCard-player')}
          autoPlay={isVisibleElement}
        />

        {!isLoading ? (
          <div className={cx('discoveryCard-actions')}>
            <button className={cx('discoveryCard-icon')} onClick={() => setIsLoved(!isLoved)}>
              <IconHeart fill={isLoved ? '#ff0000' : '#fff'} />
            </button>
            <span className={cx('discoveryCard-likeCount')}>{info.likeCount}</span>
            <button className={cx('discoveryCard-icon')}>
              <IconShare fill="#fff" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DiscoveryCard;
