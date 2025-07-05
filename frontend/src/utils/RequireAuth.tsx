import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }: { children: ReactElement }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}
