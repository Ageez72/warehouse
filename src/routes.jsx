import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/dashboard',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/production-orders',
        element: lazy(() => import('./views/production-orders/ProductionOrders'))
      },
      {
        exact: 'true',
        path: '/palletizing',
        element: lazy(() => import('./views/palletizing/Palletizing'))
      },
      {
        exact: 'true',
        path: '/shipping-orders',
        element: lazy(() => import('./views/ShippingOrders/ShippingOrders'))
      },
      {
        exact: 'true',
        path: '/loading-checkpoint',
        element: lazy(() => import('./views/LoadingCheckpoint/LoadingCheckpoint'))
      },
      {
        exact: 'true',
        path: '/sales-orders',
        element: lazy(() => import('./views/sales-orders/SalesOrders'))
      },
      {
        exact: 'true',
        path: '/warehouse-inventory',
        element: lazy(() => import('./views/warehouse/WarehouseInventory'))
      },
      {
        exact: 'true',
        path: '/users',
        element: lazy(() => import('./views/settings/Users'))
      },
      {
        exact: 'true',
        path: '/badges',
        element: lazy(() => import('./views/settings/Users'))
      },
      {
        exact: 'true',
        path: '/roles',
        element: lazy(() => import('./views/settings/Roles'))
      },
      {
        exact: 'true',
        path: '/customers',
        element: lazy(() => import('./views/settings/Customers'))
      },
      {
        exact: 'true',
        path: '/Warehouses',
        element: lazy(() => import('./views/settings/Warehouses'))
      },
      {
        exact: 'true',
        path: '/line',
        element: lazy(() => import('./views/settings/Line'))
      },
      {
        exact: 'true',
        path: '/products',
        element: lazy(() => import('./views/settings/Products'))
      },
      {
        exact: 'true',
        path: '/size',
        element: lazy(() => import('./views/settings/Size'))
      },
      {
        exact: 'true',
        path: '/color',
        element: lazy(() => import('./views/settings/Color'))
      },
      {
        exact: 'true',
        path: '/priority',
        element: lazy(() => import('./views/settings/Priority'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
