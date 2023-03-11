import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Routes } from 'react-router-dom';
import Modal from './common/components/Modal';
import NotFound from './common/components/NotFound';
import Toasts from './common/components/Toasts';

const LocationApp = React.lazy(() => import('./LocationApp/App'));
const LandingApp = React.lazy(() => import('./LandingApp/App'));

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<LandingApp />} />
          <Route path='/locations/*' element={<LocationApp />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>

      <Modal />
      <Toasts />
    </>
  );
};

export default hot(App);
