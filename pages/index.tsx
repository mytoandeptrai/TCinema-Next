import { REVALIDATE_TIME } from 'constants/global';
import { LayoutPrimary } from 'layouts';
import { CheckInView } from 'modules/CheckInView';
import { HomeBanner, HomeSection } from 'modules/Home';
import { MovieListSkeleton } from 'modules/Movies';
import { GetStaticProps } from 'next';
import { useFetchingHomeMoviesInfinity } from 'queries/movies';
import { useCallback, useMemo } from 'react';
import { getHomeMoviesHandler } from 'services/movies';
import { IBanner, IHomeSection } from 'types';

interface HomePageProps {
  banners: IBanner[] | [];
  initialHomeSections: IHomeSection[] | [];
}

const HomePage = ({ banners, initialHomeSections }: HomePageProps) => {
  const { data, fetchNextPage, error } = useFetchingHomeMoviesInfinity({
    page: 1
  });

  const homeSections: any = useMemo(() => {
    return data?.pages?.reduce((prev, curr) => {
      const movieList = curr?.data?.homeSections;
      const dataMovies = prev.concat(movieList as any);

      return dataMovies;
    }, []);
  }, [data]);

  const isReachingEnd = data?.pages[data?.pages?.length - 1]?.data?.homeSections?.length === 0;
  const hasNextPage = homeSections && !error && !isReachingEnd;

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const renderHomeSections = (homeSections: IHomeSection[] | [] | undefined) => {
    if (!homeSections) {
      return null;
    }

    return (
      <>
        {homeSections?.map((homeSection: IHomeSection) => (
          <HomeSection homeSection={homeSection} key={homeSection.homeSectionId} />
        ))}
      </>
    );
  };

  return (
    <LayoutPrimary>
      <div className="container">
        <HomeBanner banners={banners} />
        {renderHomeSections(initialHomeSections)}
        {renderHomeSections(homeSections)}
        {hasNextPage ? (
          <CheckInView onInView={handleLoadMore}>
            <MovieListSkeleton hasHeading />
          </CheckInView>
        ) : null}
      </div>
    </LayoutPrimary>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await getHomeMoviesHandler(0);
  const { homeSections, banners } = data;

  return {
    props: {
      banners: banners,
      initialHomeSections: homeSections
    },
    revalidate: REVALIDATE_TIME.success
  };
};

export default HomePage;
