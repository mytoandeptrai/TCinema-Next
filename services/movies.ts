import axiosClient from 'configs/axiosClient';
import { PATH_API } from 'configs/path.client';

export const getHomeMoviesHandler = async (currentPage: number) => {
  const API_ENDPOINT = `${PATH_API.home}?page=${currentPage}`;
  const response = await axiosClient.get(API_ENDPOINT);
  return { data: response.data, nextPage: currentPage + 1 };
};

export const getSearchedMoviesHandler = async (keyword: string) => {
  if (keyword === '') return;
  const API_ENDPOINT = PATH_API.searching.replace('q', keyword);
  const response = await axiosClient.get(API_ENDPOINT);
  return response.data;
};
