import { Link } from 'react-router-dom';

import { LINKS, LOG_IN_ROUTE } from '@/constants';
import { signUpWithGoogle } from '@/api/signUpWithGoogle';
import googleIcon from '@/assets/google-icon.webp';
import twitterBg from '@/assets/back-twitter.png';
import twitterIcon from '@/assets/twitter-logo.svg';

import styles from './singup.module.scss';

export const SignUp = () => {
  return (
    <div className={styles.signupWrapper}>
      <div className={styles.signup}>
        <img src={twitterBg} alt="twitter bg" className={styles.imgBg} />
        <div className={styles.info}>
          <img src={twitterIcon} alt="twitter logo" />
          <h1>Happening now</h1>
          <h2>Join Twitter today</h2>
          <button onClick={signUpWithGoogle}>
            <img src={googleIcon} alt="google logo" />
            Sign up with Google
          </button>
          <button> Sign up with email</button>
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
