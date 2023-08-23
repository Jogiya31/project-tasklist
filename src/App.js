import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import "./App.css";
import { useSelector } from 'react-redux';
import LoginForm from './features/auth/LoginForm';
import Tasks from './features/tasks/Tasks';

function App() {
  const isAuthenticated = sessionStorage.getItem('loggedIn');;

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<AuthForm />} /> */}
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/tasks" element={<Tasks />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
