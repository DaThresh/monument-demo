import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Routes } from 'react-router-dom';
import Toasts from './common/components/Toasts';

const LocationApp = React.lazy(() => import('./LocationApp/Location'));
const LandingApp = React.lazy(() => import('./LandingApp/Landing'));

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/locations' element={<LocationApp />} />
          <Route index element={<LandingApp />} />
        </Routes>
      </Suspense>

      <Toasts />
    </>
  );
};

export default hot(App);
