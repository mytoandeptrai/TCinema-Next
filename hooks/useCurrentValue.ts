import { useEffect, useRef } from 'react';

export const useCurrentValue = (value: any) => {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;

    return () => {
      valueRef.current = null;
    };
  });

  return valueRef.current;
};
