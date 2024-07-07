import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { handleLogin } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';

function LayoutWithNavbar() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    checkToken();
  }, []);
  
  const checkToken = () => {
    let token = localStorage.getItem("access_token");
    if (token) {
      try {
        let decoded = jwtDecode(token);
        const d = new Date();
        let currentTime = d.getTime() / 1000;
        let tokenExpireTime = decoded.exp;

        if (tokenExpireTime > currentTime) {
          // decoded nesnesinde username ve email var mı kontrol edelim
          const { username, email } = decoded;
          if (username && email) {
            dispatch(handleLogin({ username, email }));
          } else {
            console.error("Decoded token does not contain necessary user information.");
          }
        } else {
          localStorage.removeItem("access_token");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("access_token");
      }
    }
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default LayoutWithNavbar;
