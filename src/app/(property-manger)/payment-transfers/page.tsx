import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import { PaymentTransfer } from '@/lib/types';
import PaymentTransferTable from './PaymentTransferTable';

const Page = async() => {
  const data = await fetchData<PaymentTransfer[]>(
      `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PAYMENT_TRANSFER_SUMMARY}`
    );
  return (
    <>
      <PaymentTransferTable dataItems={data!} />
    </>)

}


export default Page