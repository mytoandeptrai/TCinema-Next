import classNames from 'classnames/bind';
import { Meta } from 'components/Meta';
import axiosClient from 'configs/axiosClient';
import { PATH_API } from 'configs/path.client';
import { REVALIDATE_TIME } from 'constants/global';
import { LayoutPrimary } from 'layouts';
import { GetStaticPaths, GetStaticProps } from 'next';
import styles from 'styles/NewsDetail.module.scss';
import { INewsDetails } from 'types';

const cx = classNames.bind(styles);

interface INewsDetailPageProps {
  news: INewsDetails;
}

const NewsDetailPage = ({ news }: INewsDetailPageProps) => {
  return (
    <LayoutPrimary>
      <Meta title={`${news.title} - NetFilm`} />
      <div className={cx('container')}>
        <article className={cx('newsDetail-article')}>
          <h1
            className={cx('newsDetail-heading')}
            dangerouslySetInnerHTML={{ __html: news.title }}
          />
          <span className={cx('newsDetail-createTime')}>
            Published At: {new Date(news.createTime).toLocaleDateString('vi-VI')}
          </span>
          <div
            className={cx('newsDetail-content')}
            dangerouslySetInnerHTML={{ __html: news.content }}
          ></div>
        </article>
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
  const id = params?.id as string;
  try {
    const urlEndPoint = `${PATH_API.news}/${id}`;
    const { data } = await axiosClient.get(urlEndPoint);
    return {
      props: { news: data },
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

export default NewsDetailPage;
