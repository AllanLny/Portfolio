import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./style.css";
import "./styles/globals.scss";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('app')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
