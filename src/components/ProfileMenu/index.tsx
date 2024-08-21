import {
  ERRORS,
  GOOGLE_DOMAIN_NAME,
  LOADED,
  LOADING,
  SMALL_SIZE,
} from '@/constants';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { auth } from '@/firebase';
import { DataInput } from '@/components/DataInput';
import { useImageState } from '@/hooks/useImageState';
import { addImageToStorage } from '@/api/addImageToStorage';
import { checkEditsCorrectness } from '@/utils/functions/checkEditsCorrectness';
import { updateUserPassword } from '@/api/updateUserPassword';
import { updateUserInfo } from '@/api/updateUserInfo';
import { convertDateToDotFormat } from '@/utils/functions/converDateToDotFormat';
import { setUser } from '@/store/slices/userSlice';
import { updateUserEmail } from '@/api/updateUserEmail';
import imgage from '@/assets/getImage.svg';
import successLoad from '@/assets/success.png';

import { Loader } from '../Loader';
import styles from './menu.module.scss';
import { ProfileMenuProps } from './types';

export const ProfileMenu: FC<ProfileMenuProps> = ({
  aboutMe,
  backgroundUrl,
  birthDate,
  email,
  name,
  phone,
  photoUrl,
  uid,
}) => {
  const [newName, setName] = useState(name);
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [newEmail, setEmail] = useState(email);
  const [password, setPassword] = useState('');
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
  const dispatch = useDispatch();
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

    {
      inputValue: password,
      placeholder: 'Password',
      setInputValue: setPassword,
      type: 'text',
    },
  ];

  const isGoogleAuth = auth.currentUser?.providerData.some(
    profile => profile.providerId === GOOGLE_DOMAIN_NAME,
  );

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhotoStatus(LOADING);
    if (file) {
      const downloadUrl = await addImageToStorage(file);
      setPhoto(downloadUrl);
      setPhotoStatus(LOADED);
    }
  };

  const handleBackgroundChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    setBackgroundStatus(LOADING);
    if (file) {
      const downloadUrl = await addImageToStorage(file);
      setBackground(downloadUrl);
      setBackgroundStatus(LOADED);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isInputsValid = checkEditsCorrectness(
      newName,
      newEmail,
      password,
      phoneNumber,
      newBirthDate,
    );
    if (isInputsValid !== ERRORS.noProblems) {
      setError(isInputsValid);
      return;
    }
    setError(null);
    if (password) await updateUserPassword(password);
    if (newEmail) await updateUserEmail(newEmail);

    const newUserInfo = {
      displayName: newName,
      photoURL: photo,
      backgroundUrl: background,
      birthDate: convertDateToDotFormat(newBirthDate) ?? birthDate,
      description,
      phone: phoneNumber,
      email: newEmail ?? email,
    };
    dispatch(setUser(newUserInfo));
    await updateUserInfo(uid, newUserInfo);
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
      {!isGoogleAuth && (
        <DataInput
          inputValue={newEmail}
          placeholder="Email"
          setInputValue={setEmail}
          type="email"
        />
      )}
      <label htmlFor="new-photo">
        Choose new photo
        <img src={imgage} alt="choose image" />
        {photoStatus === LOADING && <Loader size={SMALL_SIZE} />}
        {photoStatus === LOADED && <img src={successLoad} alt="success" />}
      </label>
      <input onChange={handlePhotoChange} id="new-photo" type="file" />
      <label htmlFor="new-bg">
        Choose new background
        <img src={imgage} alt="choose image" />
        {backgroundStatus === LOADING && <Loader size={SMALL_SIZE} />}
        {backgroundStatus === LOADED && <img src={successLoad} alt="success" />}
      </label>
      <input onChange={handleBackgroundChange} id="new-bg" type="file" />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" className={styles.submitButton}>
        Save
      </button>
    </form>
  );
};
