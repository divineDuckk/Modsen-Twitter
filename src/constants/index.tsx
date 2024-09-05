export const SIGN_UP_ROUTE = '/signup';
export const LOG_IN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const PROFILE_ROUTE = '/profile/';
export const TWEET_ROUTE = '/tweets/';
export const HOME_ROUTE = '/home';
export const EXPLORE_ROUTE = '/explore';
export const BOOKMARS_ROUTE = '/bookmarks';
export const LISTS_ROUTE = '/lists';
export const NOTIFICATIONS_ROUTE = '/notifications';
export const MORE_ROUTE = '/more';
export const MESSAGE_ROUTE = '/messages';

export const DARK = 'dark';
export const LIGHT = 'light';

export const PROFILE = 'profile';

export const DEBOUNCE_TIMEOUT = 5000;

export const LOADED = 'loaded';
export const LOADING = 'loading';
export const NOT_LOADED = 'not loaded';

export const ACCEPT_FILES = '.png, .jpg, .jpeg, .gif, .webp, .svg';

export const DAYS_ARRAY = Array.from({ length: 31 }, (_, index) =>
  String(index + 1),
);

export const PASSWORD_MIN_LENGTH = 6;
export const PHONE_MIN_LENGTH = 7;

export const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const PHONE_REGEXP =
  /^(\+?\d{1,3}[-\s]?)?(\(?\d{1,4}\)?[-\s]?)?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,9}$/;

export const ERRORS = {
  phoneError: 'Invalid phone number',
  emptyName: 'Name cannot be empty',
  shortPassword: 'Password must be at least 6 characters',
  shortPhone: 'Phone number must be at least 6 characters',
  birthDateError: 'Invalid birth date',
  emailError: 'Invalid email address',
  nameRequired: 'Name is required',
  emailRequired: 'Email is required',
  passwordRequired: 'Password is required',
  unCorrectFileFormat: 'Invalid file format',

  noProblems: 'ok',
};
export const SCROLL_OFFSET = 10;
export const PAGE_SIZE = 3;
export const BIG_PAGE_SIZE = 5;

export const GOOGLE_DOMAIN_NAME = 'google.com';

export const LARGE_SIZE = 'large';
export const MEDIUM_SIZE = 'medium';
export const SMALL_SIZE = 'small';

export const YEARS_INTERVAl = 100;

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const LINKS = [
  { name: 'About', path: '/about' },
  { name: 'Help Center', path: '/help-center' },
  { name: 'Terms of Service', path: '/terms-of-service' },
  { name: 'Privacy Policy', path: '/privacy-policy' },
  { name: 'Cookie Policy', path: '/cookie-policy' },
  { name: 'Ads info', path: '/ads-info' },
  { name: 'Blog', path: '/blog' },
  { name: 'Status', path: '/status' },
  { name: 'Carrers', path: '/careers' },
  { name: 'Brand Resources', path: '/brand-resources' },
  { name: 'Advertising', path: '/advertising' },
  { name: 'Marketing', path: '/marketing' },
  { name: 'Twitter for Business', path: '/twitter-for-business' },
  { name: 'Developers', path: '/developers' },
  { name: 'Directory', path: '/directory' },
  { name: 'Settings', path: '/settings' },
  { name: '© 2021 Twitter, Inc.', path: '/copyright' },
];
