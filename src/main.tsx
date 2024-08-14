import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/components/App';

import 'firebase/firestore';

import './theme.scss';

const firebaseConfig = {
  apiKey: 'AIzaSyB31WMLsvZkfyL49UxLSr-6LgZ0CXj3MxQ',
  authDomain: 'modsen-twitter-d3a5a.firebaseapp.com',
  projectId: 'modsen-twitter-d3a5a',
  storageBucket: 'modsen-twitter-d3a5a.appspot.com',
  messagingSenderId: '559771962409',
  appId: '1:559771962409:web:89c756353d3f6e764c2038',
  measurementId: 'G-9SFFP7B0MN',
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
