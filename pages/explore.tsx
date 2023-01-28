import { DropDownContainer } from 'components/Dropdown';
import { Meta } from 'components/Meta';
import axiosClient from 'configs/axiosClient';
import { LayoutPrimary } from 'layouts';
import { CheckInView } from 'modules/CheckInView';
import { MovieCard, MovieList, MovieListSkeleton } from 'modules/Movies';
import { GetServerSideProps } from 'next';
import { useFetchingExploreMoviesInfinity } from 'queries/category';
import { useCallback, useMemo, useState } from 'react';
import { ICategoryResult, IFilter, IFilterOptions } from 'types';

type Props = {
  filters: IFilter[];
};

const Explore = ({ filters }: Props) => {
  const [options, setOptions] = useState<IFilterOptions[]>(filters[0].screeningItems);
  const [params, setParams] = useState({
    area: '',
    category: 1,
    order: 'up',
    size: 12,
    params: filters[0]?.params,
    sort: '',
    title: '',
    year: ''
  });

  const { data, error, fetchNextPage } = useFetchingExploreMoviesInfinity({
    ...params
  });

  const movieListData: any = useMemo(() => {
    return data?.pages?.reduce((prev, curr) => {
      const movieList = curr?.data?.results;
      const dataMovies = prev.concat(movieList as any);

      return dataMovies;
    }, []);
  }, [data]);

  const isReachingEnd = data?.pages[data?.pages?.length - 1]?.data?.results?.length === 0;
  const hasNextPage = movieListData && !error && !isReachingEnd;

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  return (
    <LayoutPrimary>
      <Meta title="Explore - TCinema" />
      <div className="container">
        <MovieList>
          <DropDownContainer placeholder={`${filters[0]?.name}`}>
            <DropDownContainer.Select />
            <DropDownContainer.List>
              {filters?.length > 0
                ? filters?.map((filter: IFilter) => (
                    <DropDownContainer.Option
                      key={filter.id}
                      handleClickOption={(e, setTitle) => {
                        setTitle(filter.name);
                        setParams((prev) => ({ ...prev, params: filter.params }));
                        setOptions(filter.screeningItems);
                      }}
                    >
                      {filter.name}
                    </DropDownContainer.Option>
                  ))
                : null}
            </DropDownContainer.List>
          </DropDownContainer>

          {options?.map((option, index) => (
            <DropDownContainer
              key={index}
              placeholder={option.id ? option.name : option.items[0].name}
            >
              <DropDownContainer.Select />
              <DropDownContainer.List>
                {option.items.length > 0
                  ? option.items.map((item) => (
                      <DropDownContainer.Option
                        key={item.params}
                        handleClickOption={(e, setTitle) => {
                          setTitle(item.name);
                          setParams({ ...params, [item.screeningType]: item.params });
                        }}
                      >
                        {item.name}
                      </DropDownContainer.Option>
                    ))
                  : null}
              </DropDownContainer.List>
            </DropDownContainer>
          ))}
        </MovieList>

        {(movieListData?.length as number) > 0 ? (
          <MovieList>
            {movieListData.map((movieData: ICategoryResult) => (
              <MovieCard
                key={movieData.id}
                id={movieData.id}
                title={movieData.name}
                domainType={movieData.domainType}
                poster={movieData.coverVerticalUrl}
              />
            ))}
          </MovieList>
        ) : (
          <MovieListSkeleton count={12} />
        )}
        {hasNextPage ? (
          <CheckInView onInView={handleLoadMore}>
            <MovieListSkeleton />
          </CheckInView>
        ) : null}
      </div>
    </LayoutPrimary>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { query } = context;
    const { data } = await axiosClient.get('/api/category', { params: query });

    return {
      props: {
        filters: data?.filters
      }
    };
  } catch (error) {
    return {
      props: {
        filters: []
      }
    };
  }
};

export default Explore;
