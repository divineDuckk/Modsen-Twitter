import {
  LOG_IN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SIGN_UP_ROUTE,
} from '@/constants';
import { LogIn } from '@/pages/logIn';
import { Profile } from '@/pages/profile';
import { Registration } from '@/pages/registration';
import { SignUp } from '@/pages/signUp';

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
];
