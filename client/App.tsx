import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Routes } from 'react-router-dom';
import Modal from './common/components/Modal';
import NotFound from './common/components/NotFound';
import Toasts from './common/components/Toasts';
import DetailsDashboard from './LocationApp/Details/Dashboard';
import UnitManagement from './LocationApp/Details/UnitManagement';

const LocationApp = React.lazy(() => import('./LocationApp/Location'));
const LocationDetails = React.lazy(() => import('./LocationApp/Details/Details'));
const LandingApp = React.lazy(() => import('./LandingApp/Landing'));

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<LandingApp />} />
          <Route path='/locations'>
            <Route index element={<LocationApp />} />
            <Route path=':locationId' element={<LocationDetails />}>
              <Route path='units' element={<UnitManagement />} />
              <Route index element={<DetailsDashboard />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>

      <Modal />
      <Toasts />
    </>
  );
};

export default hot(App);
