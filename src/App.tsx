import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from './components/views/login-form';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );
}

export default App;
