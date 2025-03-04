import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import PaymentTable from './PaymentTable'
import { Payment } from '@/lib/types';

const Page = async() => {
  const data = await fetchData<Payment[]>(
    `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PAYMENT_SUMMARY}`
);
  return (
    <>
      <PaymentTable dataItems={data!}/>
    </>)

}


export default Page