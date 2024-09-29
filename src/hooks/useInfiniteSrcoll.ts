import { useEffect } from 'react';

import { SCROLL_OFFSET } from '@/constants';

export const useInfiniteScroll = (fetchCallback: () => Promise<void>) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const clientHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight - SCROLL_OFFSET) {
        fetchCallback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchCallback]);
};
