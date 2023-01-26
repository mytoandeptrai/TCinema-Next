import axiosClient from 'configs/axiosClient';
import { PATH_API } from 'configs/path.client';
import { WatchHome } from 'modules/Watch';
import { GetServerSideProps } from 'next';
import { IEpisode } from 'types';

interface IWatchTVPageProps {
  data: IEpisode;
}

const WatchTVPage = ({ data }: IWatchTVPageProps) => {
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

export default WatchTVPage;
