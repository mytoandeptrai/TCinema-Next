import { useInfiniteQuery } from '@tanstack/react-query';
import { STALE_TIME } from 'constants/global';
import { getHomeMoviesHandler } from 'services/movies';
import { IMovieHomePayload } from 'types';

export const useFetchingHomeMoviesInfinity = (payload: IMovieHomePayload) =>
  useInfiniteQuery(
    ['home', payload],
    ({ pageParam = payload.page || 0 }) => getHomeMoviesHandler(pageParam),
    {
      staleTime: STALE_TIME.ONE_HOUR,
      getNextPageParam: (lastPage: any) => {
        return lastPage.nextPage ?? undefined;
      },
      retry: false
    }
  );
