// app/layout.tsx
import React from 'react';
import { SessionProvider } from '@/app/contexts/SessionContext';
import { ProductsProvider } from '@/app/contexts/ProductsContext';
import Sidebar from '../components/dashboard/sidebar';
import Navbar from '../components/dashboard/navbar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ProductsProvider>
          <div className='flex bg-bg'>
            <div className='flex bg-bgSoft p-5 w-72 shadow-lg shadow-slate-700'>
              <Sidebar />
            </div>
            <div className='flex-1 p-5 max-h-screen overflow-auto'>
              <Navbar />
              {children}
            </div>
          </div>
      </ProductsProvider>
    </SessionProvider>
  );
};

export default RootLayout;
