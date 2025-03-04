import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import { Invoice } from '@/lib/types';
import InvoiceTable from './InvoiceTable'

const Page = async () => {
  const data = await fetchData<Invoice[]>(
    `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.INVOICE_SUMMARY}`
  );
  return (
    <>
      <InvoiceTable dataItems={data!} />
    </>)

}


export default Page