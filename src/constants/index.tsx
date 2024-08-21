export const SIGN_UP_ROUTE = '/signup';
export const LOG_IN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const PROFILE_ROUTE = '/profile/';

export const LOADED = 'loaded';
export const LOADING = 'loading';
export const NOT_LOADED = 'not loaded';

export const ACCEPT_FILES = '.png, .jpg, .jpeg, .gif, .webp, .svg';

export const DAYS_ARRAY = Array.from({ length: 31 }, (_, index) =>
  String(index + 1),
);

export const PASSWORD_MIN_LENGTH = 6;

export const PHONE_REGEXP =
  /^(\+?\d{1,3}[-\s]?)?(\(?\d{1,4}\)?[-\s]?)?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,9}$/;

export const ERRORS = {
  phoneError: 'uncorrect phone',
  emptyName: 'name cannot be empty',
  emptyEmail: 'email cannot be empty',
  shortPassword: 'password must includes 6 symbols',
  birthDateError: 'uncorret birth date',
  noProblems: 'ok',
};

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
