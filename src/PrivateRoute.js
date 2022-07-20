import React from 'react';
import { useState, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie";
import AuthContext from "./AuthContext";

export const PrivateRoute = () => {

    if (Cookies.get('jwt')) {
        return <Outlet/>
      } else {
        return <Navigate to="/login"/>
      }


    // return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

