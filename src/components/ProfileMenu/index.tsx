import {
  ACCEPT_FILES,
  ERRORS,
  GOOGLE_DOMAIN_NAME,
  LOADING,
  PASSWORD_MIN_LENGTH,
  PHONE_MIN_LENGTH,
  PHONE_REGEXP,
} from '@/constants';
import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { updateUserInfo } from '@/api/updateUserInfo';
import { DataInput } from '@/components/DataInput';
import { useImageState } from '@/hooks/useImageState';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';
import { convertDateToDotFormat } from '@/utils/functions/converDateToDotFormat';
import { updateUserPassword } from '@/api/updateUserPassword';
import { auth } from '@/firebase';

import { ImageInput } from '../ImageInput';
import { ACCEPT_PROFILE_PHOTO_FILES } from './constants';
import styles from './menu.module.scss';
import { ProfileFormInputs, ProfileMenuProps } from './types';

export const ProfileMenu: FC<ProfileMenuProps> = ({
  aboutMe,
  backgroundUrl,
  birthDate,
  name,
  phone,
  photoUrl,
  uid,
  password,
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    defaultValues: {
      newName: name,
      phoneNumber: phone,
      description: aboutMe,
      newBirthDate: birthDate,
      newPassword: password,
    },
  });

  const isGoogleVerifired =
    auth.currentUser?.providerData[0].providerId === GOOGLE_DOMAIN_NAME;
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

  const dispatch = useAppDispatch();
  const [isValidFile, setIsValidFile] = useState(true);

  const onSubmit: SubmitHandler<ProfileFormInputs> = ({
    description,
    newBirthDate,
    newName,
    phoneNumber,
    newPassword,
  }) => {
    const newUserInfo = {
      displayName: newName,
      photoURL: photo,
      backgroundUrl: background,
      birthDate: convertDateToDotFormat(newBirthDate) ?? birthDate,
      description: description,
      phone: phoneNumber,
    };
    if (newPassword !== password) updateUserPassword(password, newPassword);
    dispatch(setUser(newUserInfo));
    updateUserInfo(uid, newUserInfo);
    handleClose();
  };

  const dataInputs = [
    {
      name: 'newName',
      placeholder: 'Name',
      type: 'text',
      validation: { required: ERRORS.nameRequired },
    },
    {
      name: 'phoneNumber',
      placeholder: 'Phone number',
      type: 'tel',
      validation: {
        pattern: {
          value: PHONE_REGEXP,
          message: ERRORS.phoneError,
        },
        minLength: {
          value: PHONE_MIN_LENGTH,
          message: ERRORS.shortPhone,
        },
      },
    },
    {
      name: 'description',
      placeholder: 'About me',
      type: 'text',
      validation: {},
    },
    {
      name: 'newBirthDate',
      placeholder: 'Birth date',
      type: 'date',
      validation: {},
    },
    {
      name: 'newPassword',
      placeholder: 'Password',
      type: 'text',
      isNeedShow: !isGoogleVerifired,
      validation: {
        required: ERRORS.passwordRequired,
        minLength: {
          value: PASSWORD_MIN_LENGTH,
          message: ERRORS.shortPassword,
        },
      },
    },
  ];

  return (
    <form className={styles.menu} onSubmit={handleSubmit(onSubmit)}>
      {dataInputs.map(
        ({ name, placeholder, type, validation, isNeedShow = true }) => {
          if (!isNeedShow) return;
          return (
            <DataInput
              key={name}
              placeholder={placeholder}
              type={type}
              {...register(name as keyof ProfileFormInputs, validation)}
              error={errors[name as keyof ProfileFormInputs]?.message}
            />
          );
        },
      )}

      <ImageInput
        acceptFiles={ACCEPT_PROFILE_PHOTO_FILES}
        imageStatus={photoStatus}
        setPhoto={setPhoto}
        setPhotoStatus={setPhotoStatus}
        id="profile photo"
        title="Choose new profile photo"
        isValidFile={isValidFile}
        setIsValidFile={setIsValidFile}
      />
      <ImageInput
        acceptFiles={ACCEPT_FILES}
        imageStatus={backgroundStatus}
        setPhoto={setBackground}
        setPhotoStatus={setBackgroundStatus}
        id="background photo"
        title="Choose new background photo"
        isValidFile={isValidFile}
        setIsValidFile={setIsValidFile}
      />
      <button
        type="submit"
        className={styles.submitButton}
        disabled={
          photoStatus === LOADING ||
          backgroundStatus === LOADING ||
          !isValidFile
        }
      >
        Save
      </button>
    </form>
  );
};
