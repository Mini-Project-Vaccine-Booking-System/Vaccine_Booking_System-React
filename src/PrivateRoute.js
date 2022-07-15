import React from 'react';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie";

export const PrivateRoute = () => {
    const JWT = (Cookies.get('jwt'))

    if (JWT !== undefined) {
        return <Outlet/>
      } else {
        return <Navigate to="/login"/>
      }


    // return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

