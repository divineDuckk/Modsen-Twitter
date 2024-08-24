import { FC, FormEvent, useState } from 'react';

import { updateUserInfo } from '@/api/updateUserInfo';
import { DataInput } from '@/components/DataInput';
import { ACCEPT_FILES, ERRORS, LOADING } from '@/constants';
import { useImageState } from '@/hooks/useImageState';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';
import { checkEditsCorrectness } from '@/utils/functions/checkEditsCorrectness';
import { convertDateToDotFormat } from '@/utils/functions/converDateToDotFormat';

import { ImageInput } from '../ImageInput';
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    updateUserInfo(uid, newUserInfo);
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

      <ImageInput
        acceptFiles={ACCEPT_PROFILE_PHOTO_FILES}
        imageStatus={photoStatus}
        setPhoto={setPhoto}
        setPhotoStatus={setPhotoStatus}
        id="profile photo"
        title="Choose new profile photo"
      />
      <ImageInput
        acceptFiles={ACCEPT_FILES}
        imageStatus={backgroundStatus}
        setPhoto={setBackground}
        setPhotoStatus={setBackgroundStatus}
        id="background photo"
        title="Choose new background photo"
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
