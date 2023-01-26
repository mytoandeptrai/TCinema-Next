import axiosClient from 'configs/axiosClient';
import { PATH_API } from 'configs/path.client';
import queryString from 'query-string';
import { ICategoryPayload } from 'types';

export const getMovieByCategoryHandler = async (
  payload: ICategoryPayload,
  pageParam: string | null | undefined
) => {
  /** pageParam is nextMovieId from getNextPageParam in category queries */
  const newPayload = {
    ...payload,
    sort: pageParam ?? ''
  };
  const queryUrl = queryString.stringify(newPayload);
  const API_ENDPOINT = `${PATH_API.category}?${queryUrl}`;
  const response = await axiosClient.get(API_ENDPOINT);
  const movieList = response?.data?.results;
  const nextMovieId = movieList[movieList.length - 1]?.sort;

  return { data: response.data, nextMovieId };
};
