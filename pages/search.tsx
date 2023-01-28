import { Meta } from 'components/Meta';
import { SearchBox } from 'components/SearchBox';
import axiosClient from 'configs/axiosClient';
import { LayoutPrimary } from 'layouts';
import { MovieCard, MovieList } from 'modules/Movies';
import { GetServerSideProps } from 'next/types';
import React from 'react';
import { IMovieSearch } from 'types';
import styles from 'styles/Search.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ISearchPageProps {
  keyword: string;
  results: IMovieSearch[];
}

const SearchPage = ({ keyword, results }: ISearchPageProps) => {
  const renderMovieList = () => {
    if (results.length === 0) return null;

    return (
      <MovieList heading={keyword && `Keyword: ${keyword}`}>
        {results.map((result) => (
          <MovieCard
            id={result.id}
            key={result.id}
            title={result.name}
            domainType={result.domainType}
            poster={result.coverVerticalUrl}
          />
        ))}
      </MovieList>
    );
  };

  return (
    <LayoutPrimary>
      <Meta title={`${keyword || 'Search'} - TCinema`} />
      <div className="container">
        <SearchBox className={cx('searchPage-container')} />
        {renderMovieList()}
      </div>
    </LayoutPrimary>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { data } = await axiosClient.get('/api/search', { params: query });
    return {
      props: { results: data.results, keyword: data.keyword }
    };
  } catch (error) {
    return {
      props: {
        results: [],
        keyword: query?.keyword
      }
    };
  }
};

export default SearchPage;
