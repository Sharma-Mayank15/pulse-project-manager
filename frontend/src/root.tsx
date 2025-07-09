import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { customRouter } from './custom-router';
import { QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import { queryClient } from './api/base-api';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={customRouter} />
  </QueryClientProvider>,
);
