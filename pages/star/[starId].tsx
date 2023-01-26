import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { REVALIDATE_TIME } from 'constants/global';
import axiosClient from 'configs/axiosClient';
import { PATH_API } from 'configs/path.client';
import { IStarInfo, IStarMovies } from 'types';
import { LayoutPrimary } from 'layouts';
import styles from 'styles/Star.module.scss';
import classNames from 'classnames/bind';
import { Meta } from 'components/Meta';
import { Image } from 'components/Image';
import { TextToggleMore } from 'components/TextCustomize';
import { MovieCard, MovieList } from 'modules/Movies';

const cx = classNames.bind(styles);

type Props = {
  data: IStarInfo;
};

const StarInfoPage = ({ data }: Props) => {
  const renderMovieCard = (data: IStarMovies[]) => {
    if (data.length === 0) return null;

    return (
      <>
        {data.map((movie) => (
          <MovieCard
            key={movie.contentId}
            id={movie.contentId}
            domainType={movie.category}
            poster={movie.coverVerticalUrl}
            title={movie.name}
          />
        ))}
      </>
    );
  };

  return (
    <LayoutPrimary>
      <Meta title={`${data.localName} - TCinema`} />
      <div className="container">
        <div className={cx('star-header')}>
          <div className={cx('star-avatar')}>
            <Image src={data.bgPhotos} width={150} height={150} alt={data.localName} />
          </div>
          <div className={cx('star-info')}>
            <h1 className={cx('star-heading')}>{data.localName}</h1>
            <TextToggleMore countLetter={500}>{data.introduction}</TextToggleMore>
          </div>
        </div>

        <MovieList>
          {renderMovieCard(data.dramaList)}
          {renderMovieCard(data.movieList)}
        </MovieList>
      </div>
    </LayoutPrimary>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data } = await axiosClient.get(PATH_API.star, { params });
    return {
      props: { data: data?.data },
      revalidate: REVALIDATE_TIME.success
    };
  } catch (error) {
    return {
      props: {},
      revalidate: REVALIDATE_TIME.fail,
      notFound: true
    };
  }
};

export default StarInfoPage;
