import { useEffect, useMemo, useState } from 'react';

const useElementOnScreen = (options: any, targetRef: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const callbackFunction = (entries: any) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  const optionsMemo = useMemo(() => options, [options]);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, optionsMemo);
    const currentTarget = targetRef?.current;
    if (currentTarget) observer.observe(currentTarget);
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [targetRef, optionsMemo]);

  return isVisible;
};
export default useElementOnScreen;
