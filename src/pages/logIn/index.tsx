import {
  EMAIL_REGEXP,
  ERRORS,
  PASSWORD_MIN_LENGTH,
  PROFILE_ROUTE,
  SIGN_UP_ROUTE,
} from '@/constants';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { logInWithEmail } from '@/api/logInWithEmail';
import { DataInput } from '@/components/DataInput';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';
import twitterIcon from '@/assets/twitter-logo.svg';

import { LOGIN_PLACEHOLDER, PASSWORD_PLACEHOLDER } from './constants';
import styles from './login.module.scss';
import { FormValues } from './types';

export const LogIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setError(false);
    const { email, password } = data;
    const user = await logInWithEmail(email, password);
    if (!user) {
      setError(true);
      return;
    }
    dispatch(setUser(user));
    navigate(PROFILE_ROUTE + user?.uid);
  };
  return (
    <div className={styles.logWrap}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.login}>
        <img src={twitterIcon} alt="twitter logo" />
        <h2>Log in to Twitter</h2>
        <DataInput
          placeholder={LOGIN_PLACEHOLDER}
          type="email"
          {...register('email', {
            required: ERRORS.emailRequired,
            pattern: {
              value: EMAIL_REGEXP,
              message: ERRORS.emailError,
            },
          })}
          error={errors.email?.message}
        />
        <DataInput
          placeholder={PASSWORD_PLACEHOLDER}
          type="password"
          {...register('password', {
            required: ERRORS.passwordRequired,
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: ERRORS.shortPassword,
            },
          })}
          error={errors.password?.message}
        />
        {error && <p className={styles.error}>User not found</p>}
        <button className={styles.submitButton} type="submit">
          Log In
        </button>
        <Link to={SIGN_UP_ROUTE}>Sign up to Twitter</Link>
      </form>
    </div>
  );
};
