import classNames from 'classnames/bind';
import { IconLoading, IconSearch } from 'components/Icons';
import { WrapperLink } from 'components/WrapperLink';
import { PATH } from 'constants/path';
import useClickOutSide from 'hooks/useClickOutSide';
import { useDebounce } from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import { useSearchMovies } from 'queries/search';
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './SearchBox.module.scss';

const cx = classNames.bind(styles);
type Props = {
  className?: string;
};

const SearchBox = ({ className = '' }: Props) => {
  const classes = cx('searchBox-container', {
    [className]: className
  });
  const router = useRouter();
  const [keywordSearching, setKeywordSearching] = useState<string>('');
  const [suggests, setSuggests] = useState<string[]>([]);
  const debouncedKeyword = useDebounce(keywordSearching, 500);
  const searchResultsRef = useRef(null);
  const isActiveQuery = useMemo(() => !!keywordSearching, [keywordSearching]);

  useClickOutSide(searchResultsRef, () => setSuggests([]));

  const { data, isFetching } = useSearchMovies(debouncedKeyword.trim(), isActiveQuery);

  useEffect(() => {
    if (data) {
      setSuggests(data?.results);
    }
  }, [data]);

  const handleOnBlur = useCallback(() => {
    setTimeout(() => {
      setSuggests([]);
    }, 200);
  }, [setSuggests]);

  const handleOnFocus = useCallback(() => {
    if (data?.results?.length > 0) {
      setSuggests(data?.results);
    }
  }, [data, setSuggests]);

  const handleChangeKeyword = useCallback(
    (event: any) => {
      const { type, keyCode } = event;
      const searchValue = event.target.value;

      // 13 is enter key pressing
      if (type === 'keydown' && keyCode === 13) {
        setKeywordSearching(event.target.value);
      }

      setKeywordSearching(searchValue);
      searchValue === '' && setSuggests([]);
    },
    [setKeywordSearching]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      keywordSearching !== '' && router.push(`${PATH.search}?keyword=${keywordSearching}`);
      setKeywordSearching('');
    },
    [keywordSearching, router]
  );

  return (
    <div className={classes}>
      <form className={cx('searchBox-form')} onSubmit={handleSubmit}>
        <input
          type="text"
          value={keywordSearching}
          className={cx('searchBox-input')}
          placeholder="Searching movie ...."
          onChange={handleChangeKeyword}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
        />
        {isFetching ? (
          <div className={cx('searchBox-loading')}>
            <IconLoading fill="#fff" width="25px" height="25px" />
          </div>
        ) : (
          <button type="submit" className={cx('searchBox-btn')}>
            <IconSearch />
          </button>
        )}
      </form>
      <ul className={cx('searchBox-searchResults', 'scrollbar')} ref={searchResultsRef}>
        {suggests?.map((suggest: any, index: number) => {
          const removeTags = suggest?.replaceAll('<em>', '')?.replaceAll('</em>', '');
          const name = encodeURIComponent(removeTags);
          return (
            <li key={index}>
              <WrapperLink
                href={`${PATH.search}?keyword=${name}`}
                dangerouslySetInnerHTML={{ __html: suggest }}
                className={cx('searchBox-searchItems')}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchBox;
