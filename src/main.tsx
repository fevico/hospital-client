
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; 
import App from './App.tsx';
import './index.css';
import 'leaflet/dist/leaflet.css'; 
import { queryClient } from './libs/queryClient.ts';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} /> 
      <Toaster position="top-right" />   {/* or bottom-right, top-center, etc. */}
    </QueryClientProvider>
  </React.StrictMode>,
);