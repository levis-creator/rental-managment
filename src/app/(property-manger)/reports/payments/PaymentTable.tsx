"use client"
import { DataTable } from '@/components/reports/data-table'
import { useAtomValue } from 'jotai'
import { columns } from './column'
import { filterData } from './DataAtoms'

const PaymentTable = ({ data }) => {

    const displayFilterData = useAtomValue(filterData) // Read the atom value
    const dataItem = displayFilterData.length > 0 ? displayFilterData : data;
    const sum = dataItem.reduce((previous, current) => previous + new Number(current.amountPaid), 0)
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(sum)
    return (
        <>
            <div className='w-full mb-6 text-gray-600'>
                <h2 className='text-xl font-semibold'>Summary</h2>
                <h4>
                    Payment Total: <span>{formatted}</span>
                </h4>
                <h4>
                    Payment Made: <span>{dataItem.length}</span>
                </h4>
            </div>
            <DataTable
                columns={columns}
                data={dataItem} // Use filtered data if available
            />

        </>
    )
}

export default PaymentTable
