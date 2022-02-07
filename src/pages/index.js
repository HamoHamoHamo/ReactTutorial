import React from 'react';
import AppLayout from '../components/AppLayout';
import { Route, Routes  } from "react-router-dom";
import Home from './Home';
import Login from './accounts/Login'
import Signup from './accounts/Signup'

function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route />
        최상위 컴포넌트
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AppLayout>
  )
}

export default Root;