import classNames from 'classnames/bind';
import { Image } from 'components/Image';
import { WrapperLink } from 'components/WrapperLink';
import { IMAGE_SIZE, resizeImageLokLok } from 'constants/global';
import { PATH } from 'constants/path';
import styles from './NewsCard.module.scss';

const cx = classNames.bind(styles);

type Props = {
  id: string;
  image: string;
  title: string;
  introduction: string;
};

const NewsCard = ({ image, id, introduction, title }: Props) => {
  return (
    <div className={cx('newsCard-wrapper')}>
      <div className={cx('newsCard-thumbnail')}>
        <WrapperLink href={`${PATH.news}/${id}`}>
          <Image
            src={resizeImageLokLok(image, IMAGE_SIZE.newCard.width, IMAGE_SIZE.newCard.height)}
            alt={title}
          />
        </WrapperLink>
      </div>
      <div className={cx('newsCard-desc')}>
        <WrapperLink href={`${PATH.news}/${id}`}>
          <h3 className={cx('newsCard-title')} dangerouslySetInnerHTML={{ __html: title }} />
        </WrapperLink>
        <p className={cx('newsCard-intro')}>{introduction}</p>
      </div>
    </div>
  );
};

export default NewsCard;
