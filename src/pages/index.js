import React from 'react';
import AppLayout from '../components/AppLayout';
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import Login from './accounts/Login'
import Signup from './accounts/Signup'
import Profile from './accounts/Profile';
import Attendance from './attendance/Attendance'
import LoginRequired from '../utils/LoginRequired';

function NotFound() {
  return <h3>NotFound</h3>;
}

function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<LoginRequired />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/attendance" element={<Attendance />} />
        </Route>
        {/* <LoginRequiredRoute path="/profile" element={<Profile />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  )
}

export default Root;