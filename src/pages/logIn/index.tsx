import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { LOGIN_PLACEHOLDER, PASSWORD_PLACEHOLDER } from './constants';
import styles from './login.module.scss';

import { logInWithEmail } from '@/api/logInWithEmail';
import twitterIcon from '@/assets/twitter-logo.svg';
import { DataInput } from '@/components/DataInput';
import { PROFILE_ROUTE, SIGN_UP_ROUTE } from '@/constants';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';


export const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await logInWithEmail(email, password);
    dispatch(setUser(user));
    navigate(PROFILE_ROUTE + user?.uid);
  };

  return (
    <div className={styles.logWrap}>
      <form onSubmit={handleLogIn} className={styles.login}>
        <img src={twitterIcon} alt="twitter logo" />
        <h2>Log in to Twitter</h2>
        <DataInput
          inputValue={email}
          placeholder={LOGIN_PLACEHOLDER}
          setInputValue={setEmail}
          type="email"
          required
        />
        <DataInput
          inputValue={password}
          placeholder={PASSWORD_PLACEHOLDER}
          setInputValue={setPassword}
          type="password"
          required
        />
        <button className={styles.submitButton} type="submit">
          Log In
        </button>
        <Link to={SIGN_UP_ROUTE}>Sign up to Twitter</Link>
      </form>
    </div>
  );
};
