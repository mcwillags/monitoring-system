import {createBrowserRouter, Navigate} from 'react-router-dom';

import { UserRole } from '@models';

import {
  AdminPage,
  ErrorPage,
  LoginAdminPage,
  LoginObserverPage,
  ObserverPage, ObserverSettingsPage,
  RegisterAdminPage,
} from '@pages';

import { Layout, AuthGuard, RoleGuard } from '@components';

import App from '../App';

import { APP_ROUTES } from '@router/constants/routes';

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: APP_ROUTES.OBSERVER_PAGE,
        element: (
          <AuthGuard isNeedsAuth={true} onNonAuthPath={APP_ROUTES.LOGIN_OBSERVER}>
            <RoleGuard
              allowedRole={UserRole.OBSERVER}
              noRolePath={APP_ROUTES.LOGIN_OBSERVER}
              alternativePath={APP_ROUTES.ADMIN_PAGE}
            >
              <Layout>
                <ObserverPage />
              </Layout>
            </RoleGuard>
          </AuthGuard>
        ),
      },
      {
        path: APP_ROUTES.OBSERVER_SETTINGS,
        element: (
            <AuthGuard isNeedsAuth={true} onNonAuthPath={APP_ROUTES.LOGIN_OBSERVER}>
              <RoleGuard
                  allowedRole={UserRole.OBSERVER}
                  noRolePath={APP_ROUTES.LOGIN_OBSERVER}
                  alternativePath={APP_ROUTES.ADMIN_PAGE}
              >
                <Layout>
                  <ObserverSettingsPage />
                </Layout>
              </RoleGuard>
            </AuthGuard>
        ),
      },
      {
        path: APP_ROUTES.LOGIN_ADMIN,
        element: (
          <AuthGuard isNeedsAuth={false} onAuthPath={APP_ROUTES.ADMIN_PAGE}>
            <LoginAdminPage />
          </AuthGuard>
        ),
      },
      {
        path: APP_ROUTES.LOGIN_OBSERVER,
        element: (
          <AuthGuard isNeedsAuth={false} onAuthPath={APP_ROUTES.OBSERVER_PAGE}>
            <LoginObserverPage />
          </AuthGuard>
        ),
      },
      {
        path: APP_ROUTES.REGISTER_ADMIN,
        element: (
          <AuthGuard isNeedsAuth={false} onAuthPath={APP_ROUTES.ADMIN_PAGE}>
            <RegisterAdminPage />
          </AuthGuard>
        ),
      },
      {
        path: APP_ROUTES.ADMIN_PAGE,
        element: (
          <AuthGuard isNeedsAuth={true} onNonAuthPath={APP_ROUTES.LOGIN_ADMIN}>
            <RoleGuard
              allowedRole={UserRole.ADMIN}
              noRolePath={APP_ROUTES.LOGIN_ADMIN}
              alternativePath={APP_ROUTES.OBSERVER_PAGE}
            >
              <Layout>
                <AdminPage />
              </Layout>
            </RoleGuard>
          </AuthGuard>
        ),
      },
      {
        path: APP_ROUTES.NON_MATCHING,
        element: <Navigate to={APP_ROUTES.LOGIN_OBSERVER}/>
      }
    ],
  },
]);
