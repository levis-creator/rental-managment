import { API_URL, ENDPOINTS } from '@/constants/ApiUrls'
import PropertOwnerTable from './PropertOwnerTable'
import { fetchData } from '@/lib/db_operations'
import { PropertyOwner } from '@/lib/types'

const Page = async () => {
  const dataItems: PropertyOwner[] | null = await fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.PROPERTY_OWNERS)
  return (
    <>
      <PropertOwnerTable dataItems={dataItems!} />
    </>)

}


export default Page