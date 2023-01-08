import classNames from 'classnames/bind';
import { Image } from 'components/Image';
import { WrapperLink } from 'components/WrapperLink';
import { IMAGE_SIZE, resizeImageLokLok } from 'constants/global';
import { PATH } from 'constants/path';
import React from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IBanner } from 'types';
import styles from './HomeBanner.module.scss';

const cx = classNames.bind(styles);

type Props = {
  banners: IBanner[] | [];
};

const stylesSwiper = {
  borderRadius: '8px',
  overflow: 'hidden'
};

const HomeBanner = ({ banners }: Props) => {
  return (
    <section>
      <Swiper loop navigation={true} modules={[Navigation]} style={stylesSwiper} autoplay={true}>
        {banners?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <WrapperLink href={`${PATH.watch}/${banner.jumpType}/${banner.id}`}>
              <Image
                alt={banner.title}
                className={cx('banner-image')}
                src={resizeImageLokLok(
                  banner.imageUrl,
                  IMAGE_SIZE.banner.width,
                  IMAGE_SIZE.banner.height
                )}
              />
            </WrapperLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeBanner;
