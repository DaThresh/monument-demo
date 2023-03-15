import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cashflow from './Details/Tabs/Cashflow';
import Contacts from './Details/Tabs/Contacts';
import Dashboard from './Details/Tabs/Dashboard';
import Debt from './Details/Tabs/Debt';
import Projections from './Details/Tabs/Projections';
import Units from './Details/Tabs/Units';

const LocationList = React.lazy(() => import('./List/LocationList'));
const LocationDetails = React.lazy(() => import('./Details/Details'));

const LocationApp = () => {
  return (
    <Suspense>
      <Routes>
        <Route index element={<LocationList />}></Route>
        <Route path=':locationId' element={<LocationDetails />}>
          <Route index element={<Dashboard />} />
          <Route path='units' element={<Units />} />
          <Route path='contacts' element={<Contacts />} />
          <Route path='debt' element={<Debt />} />
          <Route path='cashflow' element={<Cashflow />} />
          <Route path='projections' element={<Projections />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default LocationApp;
