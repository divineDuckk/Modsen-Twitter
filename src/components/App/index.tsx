import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ProfileLayout } from '@/components/ProfileLayout';
import { PROFILE_ROUTE, SIGN_UP_ROUTE } from '@/constants';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/routes';
import { getUser } from '@/store/selectors/user';

export const App = () => {
  const { uid } = useSelector(getUser);
  return uid ? (
    <ProfileLayout>
      <Routes>
        {PRIVATE_ROUTES.map(({ Page, path }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        <Route
          path="*"
          element={<Navigate to={PROFILE_ROUTE + uid} replace />}
        />
      </Routes>
    </ProfileLayout>
  ) : (
    <Routes>
      {PUBLIC_ROUTES.map(({ Page, path }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
      <Route path="*" element={<Navigate to={SIGN_UP_ROUTE} replace />} />
    </Routes>
  );
};
