import { useInfiniteQuery } from '@tanstack/react-query';
import { STALE_TIME } from 'constants/global';
import { getDiscoveryHandler } from 'services/discovery';
import { IMovieHomePayload } from 'types';

export const useFetchingDiscoveryInfinity = (payload: IMovieHomePayload) =>
  useInfiniteQuery(
    ['discovery', payload],
    ({ pageParam = payload.page || 0 }) => getDiscoveryHandler(pageParam),
    {
      staleTime: STALE_TIME.ONE_HOUR,
      getNextPageParam: (lastPage: any) => {
        return lastPage.nextPage ?? undefined;
      },
      retry: false
    }
  );
