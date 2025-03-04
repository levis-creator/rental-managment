import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import LeaseAgreementTable from './LeaseAgreementTable'
import { LeaseAgreement } from '@/lib/types';

const Page = async() => {
      const data = await fetchData<LeaseAgreement[]>(
    `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.LEASEAGREEMENTSUMMARY}`
);
  return (
    <>
      <LeaseAgreementTable dataItems={data!} />
    </>)

}


export default Page