import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href="/" className="flex ms-2 md:me-24 justify-center">
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">RentaliMani</span>
        </Link>
    )
}

export default Logo