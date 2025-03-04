import MainLayout from '@/components/layout/MainLayout';
import { getToken } from '@/lib/token';
import { redirect } from 'next/navigation';
import React from 'react'

const Layout = async ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  const token = await getToken()
  if (!token) {
    redirect('/login');
  }
  return (
    <>
      <MainLayout>
        {children}
      </MainLayout>
    </>
  )
}

export default Layout