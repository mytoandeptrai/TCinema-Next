import axiosClient from 'configs/axiosClient';
import { PATH_API } from 'configs/path.client';

export const getNewsHandler = async (currentPage: number) => {
  const API_ENDPOINT = `${PATH_API.news}?page=${currentPage}`;
  const response = await axiosClient.get(API_ENDPOINT);
  return { data: response.data, nextPage: currentPage + 1 };
};
