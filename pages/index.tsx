import axiosClient from 'configs/axiosClient';
import { LayoutPrimary } from 'layouts';
import { CheckInView } from 'modules/CheckInView';
import { HomeBanner, HomeSection } from 'modules/Home';
import { MovieListSkeleton } from 'modules/Movies';
import { GetServerSideProps } from 'next/types';
import { useFetchingHomeMoviesInfinity } from 'queries/movies';
import { useCallback, useMemo } from 'react';
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const homeAPIRequest = axiosClient.get(`/api/home`);
    const bannerAPIRequest = axiosClient.get(`/api/banner`);
    const [homeApiResponse, bannerApiResponse] = await Promise.all([
      homeAPIRequest,
      bannerAPIRequest
    ]);

    const banners = bannerApiResponse?.data;
    const homeSections = homeApiResponse?.data?.homeSections;

    return {
      props: {
        banners: banners,
        initialHomeSections: homeSections
      },
    };
  } catch (error) {
    return {
      props: { banners: [], initialHomeSections: [] },
    };
  }
};

export default HomePage;
