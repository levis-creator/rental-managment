"use client"
import { Provider } from 'jotai'
import { ReactNode } from 'react'

const StateProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <>
            <Provider>
                {children}
            </Provider>
        </>
    )
}

export default StateProvider