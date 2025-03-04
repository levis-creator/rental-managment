"use client"
import { DataTable } from '@/components/reports/data-table'
import currence_converter from '@/lib/currency_converter'
import { columns } from './column'
import Link from 'next/link'

const ArrearTable = ({ data }) => {

    const dataItem = data;
    const paidAmount = dataItem.reduce((previous, current) => previous + new Number(current.amountPaid), 0)
    const balances = dataItem.reduce((previous, current) => previous + new Number(current.balanceDue), 0)
    const overpaidAmount = dataItem.reduce((previous, current) => previous + new Number(current.overpaidAmount), 0)

    return (
        <>
        
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Rent Arrears Report</h2>
                
            </div>
            <div className='w-full mb-6'>
                <div className='flex justify-between'>

                <h2 className='text-xl font-semibold'>Summary</h2>
                <Link href="arrears/download">Download</Link>
                </div>
                <h4>
                    Total Paid: <span>{currence_converter(paidAmount)}</span>
                </h4>
                <h4>
                    Total Balances: <span>{currence_converter(balances)}</span>
                </h4>
                <h4>
                    Total Overpay: <span>{currence_converter(overpaidAmount)}</span>
                </h4>
            </div>
            <DataTable
                columns={columns}
                data={dataItem} // Use filtered data if available
            />

        </>
    )
}

export default ArrearTable
