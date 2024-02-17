'use client';
// Page.tsx
import React from 'react';
import { usePathname } from 'next/navigation';
import NavbarComponent from '@/components/Navbar';

const Page = () => {
  const pathname = usePathname();
  return (
    <div>
      <NavbarComponent />
      {pathname && <h1>{pathname}</h1>}
    </div>
  );
};

export default Page;
