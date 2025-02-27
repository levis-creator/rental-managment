import React from 'react'

const PageHead = ({ title = "Head", handleAdd }: {
    title: string;
    handleAdd: () => void
}) => {
    return (
        <div className=' flex justify-between shadow-md sm:rounded-lg bg-gray-50 dark:bg-gray-700  text-gray-500 dark:text-gray-400 mb-10 p-4'>
            <h2 className='text-xl font-semibold'>
                {title}
            </h2>
            <button onClick={handleAdd} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
        </div>
    )
}

export default PageHead