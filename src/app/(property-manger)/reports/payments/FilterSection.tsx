"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Payment } from "@/lib/types"
import { useSetAtom } from "jotai"
import { Calendar, ChevronDown } from "lucide-react"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { filterData } from "./DataAtoms"

interface FilterData {
    startDate: string;
    endDate: string;
}

const FilterSection = ({ data }: { data: Payment[] }) => {
    const setfilterData = useSetAtom(filterData)
   
    const [inputData, setInputData] = useState<FilterData>({
        startDate: "",
        endDate: ""
    })
    const [errors, setErrors] = useState({ startDate: false, endDate: false })

    function filterPaymentsByDate(payments: Payment[], filter: FilterData): Payment[] {
        const { startDate, endDate } = filter;
        const start = new Date(startDate);
        const end = new Date(endDate);

        return payments.filter((payment) => {
            const paymentDate = new Date(payment.paymentDate);
            return paymentDate >= start && paymentDate <= end;
        });
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        let hasError = false;
        const validationErrors = { startDate: false, endDate: false };

        if (!inputData.startDate) {
            validationErrors.startDate = true;
            hasError = true;
        }
        if (!inputData.endDate) {
            validationErrors.endDate = true;
            hasError = true;
        }
        setErrors(validationErrors);

        if (hasError) return;

        const filteredPayments = filterPaymentsByDate(data, inputData);
        setfilterData(filteredPayments);
    }

    function handleReset(): void {
        setInputData({ startDate: "", endDate: "" });
        setfilterData(data);
        setErrors({ startDate: false, endDate: false });
    }

    const downloadUrl = `payments/download${inputData.startDate || inputData.endDate ? `?startDate=${inputData.startDate}&endDate=${inputData.endDate}` : ""}`

    return (
        <div className='shadow-md sm:rounded-lg bg-gray-50 flex justify-between dark:bg-gray-700 text-gray-500 dark:text-gray-400 mb-10 p-4'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button>
                        <Calendar className='mr-2' /> {inputData.startDate ? `${inputData.startDate} - ${inputData.endDate}` : "Any Date"}  <ChevronDown className='ml-2' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-96' align='start'>
                    <form className='w-full space-y-4' onSubmit={handleSubmit}>
                        <div className='flex gap-4'>
                            <div className='flex flex-col flex-1'>
                                <label htmlFor="startDate" className='text-sm mb-1'>Start Date</label>
                                <Input
                                    type='date'
                                    name='startDate'
                                    id='startDate'
                                    value={inputData.startDate}
                                    onChange={e => setInputData(dataItem => ({ ...dataItem, startDate: e.target.value }))}
                                    className={`${errors.startDate ? "border-red-500" : ""}`}
                                />
                                {errors.startDate && <span className="text-red-500 text-xs">Start Date is required</span>}
                            </div>
                            <div className='flex flex-col flex-1'>
                                <label htmlFor="endDate" className='text-sm mb-1'>End Date</label>
                                <Input
                                    type='date'
                                    name='endDate'
                                    id='endDate'
                                    value={inputData.endDate}
                                    onChange={e => setInputData(dataItem => ({ ...dataItem, endDate: e.target.value }))}
                                    className={`${errors.endDate ? "border-red-500" : ""}`}
                                />
                                {errors.endDate && <span className="text-red-500 text-xs">End Date is required</span>}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button type='submit' className='flex-1'>
                                Filter
                            </Button>
                            <Button type="button" variant="outline" className="flex-1" onClick={handleReset}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </DropdownMenuContent>
            </DropdownMenu>
            <Link href={downloadUrl} className=""> 
            Download 
            </Link>
           
        </div>
    )
}

export default FilterSection
