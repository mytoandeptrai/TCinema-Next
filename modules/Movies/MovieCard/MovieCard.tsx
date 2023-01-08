import classNames from 'classnames/bind';
import { IconPlay } from 'components/Icons';
import { Image } from 'components/Image';
import { WrapperLink } from 'components/WrapperLink';
import { IMAGE_SIZE, resizeImageLokLok } from 'constants/global';
import { PATH } from 'constants/path';
import { IMovieCard } from 'types';
import { MovieTitle } from '../MovieTitle';
import styles from './MovieCard.module.scss';

const cx = classNames.bind(styles);

const MovieCard = ({ id, domainType, poster, title }: IMovieCard) => {
  const href = `${PATH.watch}/${domainType}/${id}`;
  return (
    <div className={cx('movieCard-container')}>
      <WrapperLink href={href} className={cx('movieCard-media')}>
        <Image
          alt={title}
          className={cx('movieCard-image')}
          src={resizeImageLokLok(poster, IMAGE_SIZE.movieCard.width, IMAGE_SIZE.movieCard.height)}
        />
        <div className={cx('movieCard-icon')}>
          <IconPlay fill="#fff" width="25px" height="25px" />
        </div>
      </WrapperLink>
      <MovieTitle href={href} className={cx('movieCard-title')}>
        {title}
      </MovieTitle>
    </div>
  );
};

export default MovieCard;
