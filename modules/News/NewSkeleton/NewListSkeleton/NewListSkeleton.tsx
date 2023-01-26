import classNames from 'classnames/bind';
import { NewsList } from 'modules/News/NewsList';
import NewCardSkeleton from '../NewCardSkeleton/NewCardSkeleton';
import styles from '../NewSkeleton.module.scss';

const cx = classNames.bind(styles);

interface NewListSkeletonProps {
  count?: number;
}

const NewListSkeleton = ({ count = 6 }: NewListSkeletonProps) => {
  return (
    <div className={cx('newsList-skeletonList')}>
      <NewsList>
        {Array(count)
          .fill(0)
          .map((_item, index) => (
            <NewCardSkeleton key={index} />
          ))}
      </NewsList>
    </div>
  );
};

export default NewListSkeleton;
