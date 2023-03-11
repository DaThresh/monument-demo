import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import DetailsDashboard from './Details/Dashboard';
import UnitManagement from './Details/UnitManagement';

const LocationList = React.lazy(() => import('./List/LocationList'));
const LocationDetails = React.lazy(() => import('./Details/Details'));

const LocationApp = () => {
  return (
    <Suspense>
      <Routes>
        <Route index element={<LocationList />}></Route>
        <Route path=':locationId' element={<LocationDetails />}>
          <Route path='units' element={<UnitManagement />} />
          <Route index element={<DetailsDashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default LocationApp;
