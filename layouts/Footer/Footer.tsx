import classNames from 'classnames/bind';
import { IconGithub } from 'components/Icons';
import { PATH } from 'constants/path';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer>
      <div className={cx('container', 'container-footer')}>
        <span>My Toan Dep Trai &copy; 2023</span>
        <div className={cx('container-contact')}>
          <span>Source code: </span>
          <a target="_blank" rel="noopener noreferrer" href={PATH.projectGithub}>
            <IconGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
