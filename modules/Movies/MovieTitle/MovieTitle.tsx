import classNames from 'classnames/bind';
import Link from 'next/link';
import React from 'react';
import styles from './MovieTitle.module.scss';

const cx = classNames.bind(styles);

type Props = {
  href: string;
  className: string;
  children: React.ReactNode;
};

const MovieTitle = ({ href, className = '', children, ...props }: Props) => {
  const classes = cx('movieTitle', {
    [className]: className
  });

  const renderTitle = () => {
    if (href) {
      return (
        <Link href={href}>
          <span className={classes} {...props}>
            {children}
          </span>
        </Link>
      );
    }

    return (
      <span className={classes} {...props}>
        {children}
      </span>
    );
  };

  return <>{renderTitle()}</>;
};

export default MovieTitle;
