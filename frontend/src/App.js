import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PersonalityTest from './pages/PersonalityTest';
import CareerTest from './pages/CareerTest';
import Recommendations from './pages/Recommendations';
import Statistics from './pages/Statistics';
import UserManagement from './pages/Admin/UserManagement';
import SystemSettings from './pages/Admin/SystemSettings';

// 私有路由组件
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* 公共路由 */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 用户路由 */}
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/personality-test" element={
          <PrivateRoute>
            <PersonalityTest />
          </PrivateRoute>
        } />
        <Route path="/career-test" element={
          <PrivateRoute>
            <CareerTest />
          </PrivateRoute>
        } />
        <Route path="/recommendations" element={
          <PrivateRoute>
            <Recommendations />
          </PrivateRoute>
        } />
        <Route path="/statistics" element={
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        } />

        {/* 管理员路由 */}
        <Route path="/admin/users" element={
          <PrivateRoute>
            <UserManagement />
          </PrivateRoute>
        } />
        <Route path="/admin/settings" element={
          <PrivateRoute>
            <SystemSettings />
          </PrivateRoute>
        } />

        {/* 404 路由 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
