'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import NavbarComponent from '@/components/Navbar';
const Page = () => {
  const pathname = usePathname();
  return (
    <div>
      <NavbarComponent />
      {pathname && <div></div>}
    </div>
  );
};

export default Page;
