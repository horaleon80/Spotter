import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { SearchContextProvider } from './contexts/SearchContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <SearchContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </SearchContextProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
