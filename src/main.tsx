import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from '@/components/App';

import { persistor, store } from './store';
import './firebase';
import { getTheme } from './store/selectors/theme';
import { useAppSelector } from './store/hooks';

import './theme.scss';

const Root = () => {
  const theme = useAppSelector(getTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    console.log(theme);
  }, [theme]);

  return <App />;
};

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Root />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
