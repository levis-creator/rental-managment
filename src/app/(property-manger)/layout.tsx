import MainLayout from '@/components/layout/MainLayout';
import React from 'react'

const Layout = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <>
    <MainLayout>
    {children}
    </MainLayout>
    </>
  )
}

export default Layout