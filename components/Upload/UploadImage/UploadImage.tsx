import classNames from 'classnames/bind';
import { IconTrash, IconUploadImage } from 'components/Icons';
import React, { ChangeEvent } from 'react';
import styles from './UploadImage.module.scss';

const cx = classNames.bind(styles);

type Props = {
  name: string;
  className?: string;
  image: string;
  handleDeleteImage: () => void;
  // eslint-disable-next-line no-unused-vars
  handleUploadImage: (e: ChangeEvent<HTMLInputElement>) => void;
};

const UploadImage = ({
  name,
  className = '',
  image = '',
  handleDeleteImage = () => {},
  handleUploadImage = () => {},
  ...props
}: Props) => {
  const classes = cx('uploadImage-container', {
    [className]: className
  });

  const renderImagePreview = () => {
    if (!image) {
      return (
        <div className={cx('uploadImage-action')}>
          <IconUploadImage />
          <span>Choose photo</span>
        </div>
      );
    }

    return (
      <div className={cx('uploadImage-preview')}>
        <picture>
          <img
            src={image}
            alt="preview"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                'https://images.unsplash.com/photo-1659321196549-448fba0143fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';
            }}
          />
        </picture>

        {image ? (
          <button className={cx('uploadImage-btn')} onClick={handleDeleteImage}>
            <IconTrash />
          </button>
        ) : null}
      </div>
    );
  };

  return (
    <label className={classes}>
      <input
        type="file"
        className={cx('uploadImage-inputFileHidden')}
        name={name}
        onChange={(e) => handleUploadImage(e)}
        {...props}
      />
      {renderImagePreview()}
    </label>
  );
};

export default UploadImage;
