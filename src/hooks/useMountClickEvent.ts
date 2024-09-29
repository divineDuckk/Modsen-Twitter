/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

export const useMountClickEvent = (
  handleClick: (event: MouseEvent) => void,
) => {
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};
