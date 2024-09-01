import {
  EXPLORE_ROUTE,
  HOME_ROUTE,
  LOG_IN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SIGN_UP_ROUTE,
  TWEET_ROUTE,
} from '@/constants';
import { Explore } from '@/pages/explore';
import { Home } from '@/pages/home';
import { LogIn } from '@/pages/logIn';
import { Profile } from '@/pages/profile';
import { Registration } from '@/pages/registration';
import { SignUp } from '@/pages/signUp';
import { SeparateTweet } from '@/pages/tweet';

export const PUBLIC_ROUTES = [
  {
    Page: SignUp,
    path: SIGN_UP_ROUTE,
  },
  {
    Page: LogIn,
    path: LOG_IN_ROUTE,
  },
  {
    Page: Registration,
    path: REGISTRATION_ROUTE,
  },
];
export const PRIVATE_ROUTES = [
  {
    Page: Profile,
    path: PROFILE_ROUTE + ':id',
  },
  {
    Page: SeparateTweet,
    path: TWEET_ROUTE + ':id',
  },
  {
    Page: Home,
    path: HOME_ROUTE,
  },
  {
    Page: Explore,
    path: EXPLORE_ROUTE,
  },
];
