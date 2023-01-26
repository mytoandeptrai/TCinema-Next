import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from 'constants/global';
import { getSearchedMoviesHandler } from 'services/movies';

export const useSearchMovies = (keyword: string, enabled: boolean) =>
  useQuery(['movie-searching', keyword], () => getSearchedMoviesHandler(keyword), {
    staleTime: STALE_TIME.ONE_HOUR,
    enabled
  });
