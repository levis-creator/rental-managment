import { API_URL, ENDPOINTS } from '@/constants/ApiUrls'
import { fetchData } from '@/lib/db_operations'
import { Arrears } from '@/lib/types'
import ArrearTable from './ArrearTable'

const Page = async () => {
    const dataItems: Arrears[] | null = await fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.ARREARS)

    return (
        <>
            <ArrearTable data={dataItems}/>
        </>
    )
}

export default Page