"use client"
import NavbarComponent from '@/components/Navbar';
import CoefficientPage from '@/components/CoefficientPage';
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <NavbarComponent />
      <CoefficientPage />
    </div>
  );
};

export default Dashboard;
