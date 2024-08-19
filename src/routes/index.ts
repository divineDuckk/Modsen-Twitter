import { LOG_IN_ROUTE, SIGN_UP_ROUTE } from '@/constants';
import { LogIn } from '@/pages/logIn';
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
];
