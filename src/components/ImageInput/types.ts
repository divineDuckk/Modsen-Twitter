import { Dispatch, SetStateAction } from 'react';

import { statusType } from '@/types';

export interface ImageInputProps {
  acceptFiles: string;
  imageStatus: statusType;
  setPhoto: Dispatch<SetStateAction<string>>;
  setPhotoStatus: Dispatch<SetStateAction<statusType>>;
  id: string;
  title: string;
}
