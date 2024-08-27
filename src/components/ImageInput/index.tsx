import { ChangeEvent, FC } from 'react';

import { LOADED, LOADING, SMALL_SIZE } from '@/constants';
import { Loader } from '@/components/Loader';
import { checkFileFormat } from '@/utils/functions/checkFileFormat';
import { addImageToStorage } from '@/api/addImageToStorage';
import image from '@/assets/getImage.svg';
import successLoad from '@/assets/success.png';

import styles from './imageInput.module.scss';
import { ImageInputProps } from './types';

export const ImageInput: FC<ImageInputProps> = ({
  acceptFiles,
  imageStatus,
  setPhoto,
  setPhotoStatus,
  id,
  title,
}) => {
  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && checkFileFormat(file.name, acceptFiles)) {
      setPhotoStatus(LOADING);
      const downloadUrl = await addImageToStorage(file);
      setPhoto(downloadUrl);
      setPhotoStatus(LOADED);
    }
  };

  return (
    <div className={styles.imageInput}>
      <label htmlFor={id}>
        {title}
        <img src={image} alt="choose image" />
        {imageStatus === LOADING && <Loader size={SMALL_SIZE} />}
        {imageStatus === LOADED && <img src={successLoad} alt="success" />}
      </label>
      <input
        onChange={handlePhotoChange}
        id={id}
        type="file"
        accept={acceptFiles}
      />
    </div>
  );
};
