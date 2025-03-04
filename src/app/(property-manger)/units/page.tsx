import { API_URL, ENDPOINTS } from '@/constants/ApiUrls'
import UnitTable from './UnitTable'
import { fetchData } from '@/lib/db_operations'
import { Unit } from '@/lib/types'

const Page = async() => {
  const data= await fetchData<Unit[]>(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.UNIT_SUMMARY)
  return  (
    <>
      <UnitTable dataItems={data!} />
    </>)

}


export default Page