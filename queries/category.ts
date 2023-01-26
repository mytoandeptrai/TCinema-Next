import { useInfiniteQuery } from '@tanstack/react-query';
import { STALE_TIME } from 'constants/global';
import { getMovieByCategoryHandler } from 'services/category';
import { ICategoryPayload } from 'types';

export const useFetchingExploreMoviesInfinity = (payload: ICategoryPayload) =>
  useInfiniteQuery(
    ['explore', payload],
    ({ pageParam = '' }) => getMovieByCategoryHandler(payload, pageParam),
    {
      staleTime: STALE_TIME.ONE_HOUR,
      getNextPageParam: (lastPage: any) => {
        const nextMovieId = lastPage?.nextMovieId;
        return nextMovieId ?? undefined;
      },
      retry: false
    }
  );
