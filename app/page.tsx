'use client';
import NavbaComponent from '@/components/Navbar';

import React, { useState } from 'react';

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);
  return <NavbaComponent />;
};

export default Home;
