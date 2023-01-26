import React from 'react';
import { IEpisode } from 'types';
import { GetServerSideProps } from 'next';
import axiosClient from 'configs/axiosClient';
import { PATH_API } from 'configs/path.client';
import { WatchHome } from 'modules/Watch';

type Props = {
  data: IEpisode;
};

const WatchMoviePage = ({ data }: Props) => {
  return <WatchHome data={data} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { data } = await axiosClient.get(PATH_API.episode, { params: query });
    const dataMovie = data?.data;
    return {
      props: { data: dataMovie }
    };
  } catch (error) {
    return {
      props: {}
    };
  }
};

export default WatchMoviePage;
