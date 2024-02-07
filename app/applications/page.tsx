'use client';
import NavbarComponent from '@/components/Navbar';
import React, { useContext } from 'react';

const Dashboard = () => {
  return (
    <div>
      <NavbarComponent />
      {typeof window !== undefined && window?.localStorage.getItem('token') ? (
        <div>
          <h1>user</h1>
        </div>
      ) : (
        <div>
          <h1>Not user</h1>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
