import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import "./App.css";
import LoginForm from './features/auth/LoginForm';
import Tasks from './features/tasks/Tasks';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
