import { Route, Routes } from 'react-router-dom';

import { PUBLIC_ROUTES } from '@/routes';

export const App = () => {
  return (
    <Routes>
      {PUBLIC_ROUTES.map(({ Page, path }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  );
};
