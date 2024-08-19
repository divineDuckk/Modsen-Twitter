import {
  LINKS,
  LOG_IN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
} from '@/constants';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/store/hooks';
import { signUpWithGoogle } from '@/api/signUpWithGoogle';
import { setUser } from '@/store/slices/userSlice';
import googleIcon from '@/assets/google-icon.webp';
import twitterBg from '@/assets/back-twitter.png';
import twitterIcon from '@/assets/twitter-logo.svg';

import styles from './singup.module.scss';

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignUp = async () => {
    const user = await signUpWithGoogle();
    dispatch(setUser(user));
    navigate(PROFILE_ROUTE + user?.uid);
  };

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.signup}>
        <img src={twitterBg} alt="twitter bg" className={styles.imgBg} />
        <div className={styles.info}>
          <img src={twitterIcon} alt="twitter logo" />
          <h1>Happening now</h1>
          <h2>Join Twitter today</h2>
          <button onClick={handleSignUp}>
            <img src={googleIcon} alt="google logo" />
            Sign up with Google
          </button>
          <Link to={REGISTRATION_ROUTE}>
            <button>Sign up with email</button>
          </Link>
          <p>
            By singing up you agree to the <Link to="/">Terms of Service</Link>{' '}
            and <Link to="/">Privacy Policy</Link>, including{' '}
            <Link to="/">Cookie Use</Link>.
          </p>
          <span>
            Already have an account? <Link to={LOG_IN_ROUTE}>Log in</Link>
          </span>
        </div>
      </div>
      <div className={styles.links}>
        {LINKS.map(({ name, path }) => (
          <Link key={path} to={path}>
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};
