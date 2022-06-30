import React from 'react';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie";

export const PrivateRoute = () => {
    const JWT = (Cookies.get('jwt'))

    const [isAuth, setAuth] = useState(false)
    if (JWT !== undefined) {
        return <Outlet/>
      } else {
        return <Navigate to="/login"/>
      }

    //   console.log("cek auth", isAuth)

    // return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

