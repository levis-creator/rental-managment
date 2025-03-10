import Link from 'next/link'
import { NavItem, navitems } from './NavItems'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'

const SideBar = () => {
    return (
        <>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {
                            navitems.map((data:NavItem, i) => {
                                return (
                                    <li key={i}>
                                        {
                                            !data.collapsible ?

                                                (<Link href={data.path!} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                    <data.icon className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                                    <span className="ms-3">{data.title}</span>
                                                </Link>
                                                ) : (
                                                    <Collapsible className='w-full'>
                                                        <CollapsibleTrigger className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                            <data.icon className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                                            <span className="ms-3">{data.title}</span>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent>
                                                            {
                                                                <ul className='pl-6'>
                                                                    {data.childPath?.map((dataItem, i) =>
                                                                    
                                                                        <li key={i}>
                                                                            <Link href={
                                                                                    // @ts-expect-error: Ignoring TypeScript error for unknown error type
                                                                                dataItem.path as string} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                                                <span className="ms-3">{
                                                                                        // @ts-expect-error: Ignoring TypeScript error for unknown error type
                                                                                dataItem.title}</span>
                                                                            </Link>
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            }
                                                        </CollapsibleContent>
                                                    </Collapsible>

                                                )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SideBar