import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { SIGN_UP_ROUTE } from '@/constants';
import { logInWithEmail } from '@/api/logInWithEmail';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';
import twitterIcon from '@/assets/twitter-logo.svg';

import { LOGIN_PLACEHOLDER, PASSWORD_PLACEHOLDER } from './constants';
import styles from './login.module.scss';

export const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await logInWithEmail(email, password);
    dispatch(setUser(user));
  };

  return (
    <div className={styles.logWrap}>
      <form onSubmit={handleLogIn} className={styles.login}>
        <img src={twitterIcon} alt="twitter logo" />
        <h2>Log in to Twitter</h2>
        <input
          value={email}
          placeholder={LOGIN_PLACEHOLDER}
          type="email"
          onChange={handleEmailChange}
          required
        />
        <input
          value={password}
          placeholder={PASSWORD_PLACEHOLDER}
          type="password"
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Log In</button>
        <Link to={SIGN_UP_ROUTE}>Sign up to Twitter</Link>
      </form>
    </div>
  );
};
