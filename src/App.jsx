import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import LiveMap from './pages/LiveMap';
import VehicleInsights from './pages/VehicleInsights';
import Analytics from './pages/Analytics';

function RequireAuth({ children }) {
  const auth = sessionStorage.getItem('gov_auth_token');
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

import { ToastProvider } from './components/ui/Toast';

import Roster from './pages/Roster';

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="map" element={<LiveMap />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="roster" element={<Roster />} />
          <Route path="vehicles" element={<VehicleInsights />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
