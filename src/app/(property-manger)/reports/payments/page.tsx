import { API_URL, ENDPOINTS } from '@/constants/ApiUrls'
import { fetchData } from '@/lib/db_operations'
import { Payment } from '@/lib/types'
import FilterSection from './FilterSection'
import PaymentTable from './PaymentTable'

const Page = async () => {
    const dataItems: Payment[] | null = await fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.PAYMENT_SUMMARY)

    return (
        <>
            <FilterSection data={dataItems!} />
            <PaymentTable data={dataItems}/>
        </>
    )
}

export default Page