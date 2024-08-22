import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { ACCEPT_FILES, ERRORS, LOADED, LOADING, SMALL_SIZE } from '@/constants';
import { DataInput } from '@/components/DataInput';
import { useImageState } from '@/hooks/useImageState';
import { addImageToStorage } from '@/api/addImageToStorage';
import { checkEditsCorrectness } from '@/utils/functions/checkEditsCorrectness';
import { updateUserInfo } from '@/api/updateUserInfo';
import { convertDateToDotFormat } from '@/utils/functions/converDateToDotFormat';
import { setUser } from '@/store/slices/userSlice';
import { Loader } from '@/components/Loader';
import { useAppDispatch } from '@/store/hooks';
import { checkFileFormat } from '@/utils/functions/checkFileFormat';
import imgage from '@/assets/getImage.svg';
import successLoad from '@/assets/success.png';

import { ACCEPT_PROFILE_PHOTO_FILES } from './constants';
import styles from './menu.module.scss';
import { ProfileMenuProps } from './types';

export const ProfileMenu: FC<ProfileMenuProps> = ({
  aboutMe,
  backgroundUrl,
  birthDate,
  name,
  phone,
  photoUrl,
  uid,
  handleClose,
}) => {
  const [newName, setName] = useState(name);
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [newBirthDate, setBirthDate] = useState(birthDate);
  const [description, setDescription] = useState(aboutMe);
  const {
    imageUrl: photo,
    setImageUrl: setPhoto,
    setStatus: setPhotoStatus,
    status: photoStatus,
  } = useImageState(photoUrl);
  const {
    imageUrl: background,
    setImageUrl: setBackground,
    setStatus: setBackgroundStatus,
    status: backgroundStatus,
  } = useImageState(backgroundUrl);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const dataInputs = [
    {
      inputValue: newName,
      placeholder: 'Name',
      setInputValue: setName,
      type: 'text',
    },
    {
      inputValue: phoneNumber,
      placeholder: 'Phone number',
      type: 'tel',
      setInputValue: setPhoneNumber,
    },
    {
      inputValue: description,
      placeholder: 'About me',
      setInputValue: setDescription,
      type: 'text',
    },
    {
      inputValue: newBirthDate,
      placeholder: 'Birth date',
      setInputValue: setBirthDate,
      type: 'date',
    },
  ];

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && checkFileFormat(file.name, ACCEPT_PROFILE_PHOTO_FILES)) {
      setPhotoStatus(LOADING);
      const downloadUrl = await addImageToStorage(file);
      setPhoto(downloadUrl);
      setPhotoStatus(LOADED);
    }
  };

  const handleBackgroundChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file && checkFileFormat(file.name, ACCEPT_FILES)) {
      setBackgroundStatus(LOADING);
      const downloadUrl = await addImageToStorage(file);
      setBackground(downloadUrl);
      setBackgroundStatus(LOADED);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isInputsValid = checkEditsCorrectness(
      newName,
      phoneNumber,
      newBirthDate,
    );
    if (isInputsValid !== ERRORS.noProblems) {
      setError(isInputsValid);
      return;
    }

    setError(null);

    const newUserInfo = {
      displayName: newName,
      photoURL: photo,
      backgroundUrl: background,
      birthDate: convertDateToDotFormat(newBirthDate) ?? birthDate,
      description,
      phone: phoneNumber,
    };
    dispatch(setUser(newUserInfo));
    await updateUserInfo(uid, newUserInfo);
    handleClose();
  };

  return (
    <form className={styles.menu} onSubmit={handleSubmit}>
      {dataInputs.map(({ inputValue, placeholder, setInputValue, type }) => (
        <DataInput
          inputValue={inputValue!}
          placeholder={placeholder}
          setInputValue={setInputValue}
          type={type}
          key={placeholder}
        />
      ))}
      <label htmlFor="new-photo">
        Choose new photo
        <img src={imgage} alt="choose image" />
        {photoStatus === LOADING && <Loader size={SMALL_SIZE} />}
        {photoStatus === LOADED && <img src={successLoad} alt="success" />}
      </label>
      <input
        onChange={handlePhotoChange}
        id="new-photo"
        type="file"
        accept={ACCEPT_PROFILE_PHOTO_FILES}
      />
      <label htmlFor="new-bg">
        Choose new background
        <img src={imgage} alt="choose image" />
        {backgroundStatus === LOADING && <Loader size={SMALL_SIZE} />}
        {backgroundStatus === LOADED && <img src={successLoad} alt="success" />}
      </label>
      <input
        onChange={handleBackgroundChange}
        id="new-bg"
        type="file"
        accept={ACCEPT_FILES}
      />
      {error && <p className={styles.error}>{error}</p>}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={photoStatus === LOADING || backgroundStatus === LOADING}
      >
        Save
      </button>
    </form>
  );
};
