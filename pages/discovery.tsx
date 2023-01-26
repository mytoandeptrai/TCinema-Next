import classNames from 'classnames/bind';
import { Meta } from 'components/Meta';
import axiosClient from 'configs/axiosClient';
import { PATH_API } from 'configs/path.client';
import { LayoutPrimary } from 'layouts';
import { CheckInView } from 'modules/CheckInView';
import { DiscoveryCard } from 'modules/Discovery';
import { GetServerSideProps } from 'next';
import { useFetchingDiscoveryInfinity } from 'queries/discovery';
import { useCallback, useMemo } from 'react';
import styles from 'styles/Discovery.module.scss';
import { IDiscovery } from 'types';

const cx = classNames.bind(styles);

interface IDiscoveryPageProps {
  initialVideos: IDiscovery[] | [];
}

const DiscoveryPage = ({ initialVideos }: IDiscoveryPageProps) => {
  const { data, fetchNextPage, error } = useFetchingDiscoveryInfinity({
    page: 1
  });

  const discoveryMovies: any = useMemo(() => {
    return data?.pages?.reduce((prev, curr) => {
      const movieList = curr?.data;
      const dataMovies = prev.concat(movieList as any);

      return dataMovies;
    }, []);
  }, [data]);

  const isReachingEnd = data?.pages[data?.pages?.length - 1]?.data?.length === 0;
  const hasNextPage = discoveryMovies && !error && !isReachingEnd;

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const renderDiscoveryMovies = (movieList: IDiscovery[] | []) => {
    if (movieList?.length === 0) {
      return null;
    }

    return (
      <>
        {movieList?.map((movie: IDiscovery) => (
          <DiscoveryCard key={movie.id} info={movie} />
        ))}
      </>
    );
  };

  return (
    <LayoutPrimary>
      <Meta title="Discovery - TCinema" />
      <div className={cx('discovery-wrapper', 'container')}>
        <div className={cx('discovery-content', 'wrapper')}>
          {renderDiscoveryMovies(initialVideos)}
          {renderDiscoveryMovies(discoveryMovies)}
        </div>
        {hasNextPage ? <CheckInView onInView={handleLoadMore}>LOading</CheckInView> : null}
      </div>
    </LayoutPrimary>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { data } = await axiosClient.get(`${PATH_API.discovery}`, { params: query });
    return {
      props: { initialVideos: data }
    };
  } catch (error: any) {
    return {
      props: { initialVideos: [] }
    };
  }
};

export default DiscoveryPage;
