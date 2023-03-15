import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Contacts from './Details/Tabs/Contacts';
import DetailsDashboard from './Details/Tabs/Dashboard';
import UnitManagement from './Details/Tabs/UnitManagement';

const LocationList = React.lazy(() => import('./List/LocationList'));
const LocationDetails = React.lazy(() => import('./Details/Details'));

const LocationApp = () => {
  return (
    <Suspense>
      <Routes>
        <Route index element={<LocationList />}></Route>
        <Route path=':locationId' element={<LocationDetails />}>
          <Route index element={<DetailsDashboard />} />
          <Route path='units' element={<UnitManagement />} />
          <Route path='contacts' element={<Contacts />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default LocationApp;
