import { API_URL, ENDPOINTS } from '@/constants/ApiUrls'
import { fetchData } from '@/lib/db_operations'
import { Tenant } from '@/lib/types'
import TenantTable from './TenantTable'

const Page = async() => {
const data= await  fetchData<Tenant[]>(`${API_URL.EXTERNAL_API_URL}${ENDPOINTS.TENANT_SUMMARY}`)

  return (
    <>
      <TenantTable dataItems={data!} />
    </>)

}


export default Page