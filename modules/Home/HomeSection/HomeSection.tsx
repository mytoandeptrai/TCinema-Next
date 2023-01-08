import { MovieCard, MovieList } from 'modules/Movies';
import React from 'react';
import { IHomeSection } from 'types';

type Props = {
  homeSection: IHomeSection;
};

const HomeSection = ({ homeSection }: Props) => {
  const recommendVideoList = homeSection.recommendContentVOList;
  return (
    <MovieList heading={homeSection.homeSectionName}>
      <>
        {recommendVideoList?.slice(0, 12)?.map((section) => {
          const arrayIdAndCategory = section.jumpAddress?.split('?id=')[1];
          const category = Number(arrayIdAndCategory?.split('&type=')[1]);
          if (Number.isNaN(category)) return null;

          return (
            <MovieCard
              key={arrayIdAndCategory?.split('&type=')[0]}
              id={arrayIdAndCategory?.split('&type=')[0]}
              title={section.title}
              poster={section.imageUrl}
              domainType={category}
            />
          );
        })}
      </>
    </MovieList>
  );
};

export default HomeSection;
