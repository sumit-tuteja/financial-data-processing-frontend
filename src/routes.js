import React from 'react';
import MapTable from './containers/MapTable';
import FileParser from './containers/FileParser';
import FinalResultTable from './containers/FinalResultTable';

const routes = [
  {
    path: '/',
    element: <FileParser/>,
  },
  {
    path: '/map-table',
    element: <MapTable />,
  },
  {
    path: '/final-table',
    element: <FinalResultTable />,
  },
];

export default routes;
