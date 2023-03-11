import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Routes } from 'react-router-dom';
import Modal from './common/components/Modal';
import Toasts from './common/components/Toasts';

const LocationApp = React.lazy(() => import('./LocationApp/Location'));
const LocationDetails = React.lazy(() => import('./LocationApp/Details'));
const LandingApp = React.lazy(() => import('./LandingApp/Landing'));

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/locations/:locationId' element={<LocationDetails />} />
          <Route path='/locations' element={<LocationApp />} />
          <Route index element={<LandingApp />} />
        </Routes>
      </Suspense>

      <Modal />
      <Toasts />
    </>
  );
};

export default hot(App);
