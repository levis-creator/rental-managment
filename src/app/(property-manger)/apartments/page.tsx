import React from 'react'
import ApartmentTable from './ApartmentTable'
import { API_URL, ENDPOINTS } from '@/constants/ApiUrls'
import { fetchData } from '@/lib/db_operations'
import { Apartment } from '@/lib/types'

const Page = async() => {
  const data= await fetchData<Apartment[]>(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.APARTMENT)
  return (
    <>
      <ApartmentTable dataItems={data!}/>
    </>
  )
}

export default Page