import { Meta } from 'components/Meta';
import axiosClient from 'configs/axiosClient';
import { PATH_API } from 'configs/path.client';
import { REVALIDATE_TIME } from 'constants/global';
import { LayoutPrimary } from 'layouts';
import { CheckInView } from 'modules/CheckInView';
import { NewListSkeleton, NewsCard, NewsList } from 'modules/News';
import { GetStaticProps } from 'next';
import { useFetchingNewsInfinity } from 'queries/news';
import { useCallback, useMemo } from 'react';
import { INewsCard } from 'types';

interface NewsPageProps {
  initialNews: INewsCard[] | [];
}

const NewsPage = ({ initialNews }: NewsPageProps) => {
  const { data, fetchNextPage, error } = useFetchingNewsInfinity({
    page: 1
  });

  const newsList: INewsCard[] | undefined = useMemo(() => {
    return data?.pages?.reduce((prev, curr) => {
      const arrayList = curr?.data?.data?.list;
      const dataMovies = prev.concat(arrayList as any);

      return dataMovies;
    }, []);
  }, [data]);

  const isReachingEnd = data?.pages[data?.pages?.length - 1]?.data?.data?.list?.length === 0;
  const hasNextPage = newsList && !error && !isReachingEnd;

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const renderNewsMovie = (newsList: INewsCard[] | [] | undefined) => {
    if (!newsList || newsList.length === 0) return null;

    return (
      <>
        {newsList.map((item: INewsCard) => (
          <NewsCard
            key={item.id}
            id={String(item.id)}
            image={item.coverImg}
            title={item.title}
            introduction={item.introduction}
          />
        ))}
      </>
    );
  };

  return (
    <LayoutPrimary>
      <Meta title="News - TCinema" />
      <div className="container">
        <NewsList>
          {renderNewsMovie(initialNews)}
          {renderNewsMovie(newsList)}
        </NewsList>
        {hasNextPage ? (
          <CheckInView onInView={handleLoadMore}>
            <NewListSkeleton count={6} />
          </CheckInView>
        ) : null}
      </div>
    </LayoutPrimary>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await axiosClient.get(PATH_API.news);
    return {
      props: { initialNews: data?.data?.list },
      revalidate: REVALIDATE_TIME.success
    };
  } catch (error) {
    return {
      props: { initialNews: [] },
      revalidate: 60,
      notFound: REVALIDATE_TIME.fail
    };
  }
};

export default NewsPage;
