import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './components/views/PrivateRoutes/Home';
import Login from './components/views/login/login-form';
import CreateUser from './components/utils/create-user';
import EditUser from './components/utils/edit-user';

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
          path="/login"
          element={<Login setToken={setToken} />}
          />
          <Route 
        path="/home"
        element={token ? <Home token={token} /> : <Navigate to="/login" />}
        />
          <Route
            path="/CreateUser"
            element={token ? <CreateUser token={token} /> : <Navigate to="/login" />}
          />
          <Route 
          path="/EditUser"
          element={token? <EditUser token={token} /> : <Navigate to="/login"/>}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
