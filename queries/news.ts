import { useInfiniteQuery } from '@tanstack/react-query';
import { STALE_TIME } from 'constants/global';
import { getNewsHandler } from 'services/news';
import { IMovieHomePayload } from 'types';

export const useFetchingNewsInfinity = (payload: IMovieHomePayload) =>
  useInfiniteQuery(
    ['news', payload],
    ({ pageParam = payload.page || 0 }) => getNewsHandler(pageParam),
    {
      staleTime: STALE_TIME.ONE_HOUR,
      getNextPageParam: (lastPage: any) => {
        return lastPage.nextPage ?? undefined;
      },
      retry: false
    }
  );
