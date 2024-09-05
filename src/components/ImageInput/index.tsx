import { ChangeEvent, FC } from 'react';

import { ERRORS, LOADED, LOADING, NOT_LOADED, SMALL_SIZE } from '@/constants';
import { Loader } from '@/components/Loader';
import { checkFileFormat } from '@/utils/functions/checkFileFormat';
import { addImageToStorage } from '@/api/addImageToStorage';
import close from '@/assets/close.svg';
import image from '@/assets/getImage.svg';

import styles from './imageInput.module.scss';
import { ImageInputProps } from './types';

export const ImageInput: FC<ImageInputProps> = ({
  acceptFiles,
  imageStatus,
  setPhoto,
  setPhotoStatus,
  id,
  title,
  setIsValidFile,
  isValidFile,
  photoUrl,
}) => {
  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const isValid = await checkFileFormat(file!, acceptFiles);
    setIsValidFile(true);

    if (file && isValid) {
      setPhotoStatus(LOADING);
      const downloadUrl = await addImageToStorage(file);
      setPhoto(downloadUrl);
      setPhotoStatus(LOADED);
      setIsValidFile(true);
      return;
    }
    setIsValidFile(false);
  };

  const handleCancelFile = () => {
    setPhoto('');
    setPhotoStatus(NOT_LOADED);
    setIsValidFile(true);
  };

  return (
    <div className={styles.imageInput}>
      <label htmlFor={id}>
        {title}
        <img src={image} alt="choose image" />
        {imageStatus === LOADING && <Loader size={SMALL_SIZE} />}

        {!isValidFile && <p>{ERRORS.unCorrectFileFormat}</p>}
      </label>
      {imageStatus === LOADED && isValidFile && (
        <div className={styles.miniImage}>
          <button onClick={handleCancelFile}>
            <img src={close} alt="close" />
          </button>
          <img src={photoUrl} alt="success" />
        </div>
      )}
      <input
        onChange={handlePhotoChange}
        id={id}
        type="file"
        accept={acceptFiles}
      />
    </div>
  );
};
