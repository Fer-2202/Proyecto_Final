import React, { lazy } from 'react';
const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./auth/Login'));
const Register = lazy(() => import('./auth/Register'));

export {
  Home,
  Login,
  Register,
}

export default {
  Home,
  Login,
  Register,
}
