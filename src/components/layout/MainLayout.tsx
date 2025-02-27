import React from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'
import { Toaster } from 'react-hot-toast';

const MainLayout = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <>

            <TopBar />
            <SideBar />

            <main className="p-4 sm:ml-72 mt-20">
             {children}
            </main>
            <Toaster/>
        </>
    )
}

export default MainLayout