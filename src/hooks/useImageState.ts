import { useState } from 'react';

import { NOT_LOADED } from '@/constants';
import { statusType } from '@/types';

export const useImageState = (initialUrl?: string) => {
  const [imageUrl, setImageUrl] = useState(initialUrl ?? '');
  const [status, setStatus] = useState<statusType>(NOT_LOADED);
  return {
    imageUrl,
    setImageUrl,
    status,
    setStatus,
  };
};
