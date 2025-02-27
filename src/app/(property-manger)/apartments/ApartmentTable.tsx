"use client"

import DeleteModal from "@/components/DeleteModal";
import PageHead from "@/components/PageHead";
import { API_URL, ENDPOINTS } from "@/constants/ApiUrls";
import { fetchData } from "@/lib/db_operations";
import { Apartment } from "@/lib/types";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import 'react-data-grid/lib/styles.css';
import toast from "react-hot-toast";
import { apartment, apartments } from "./apartmentAtom";
import ApartmentForm from "./ApartmentForm";

const ApartmentTable = () => {
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number |
        null>(null);
    const [data, setData] = useAtom(apartments)
    const setEditApartment = useSetAtom(apartment)
    const [openEdit, setOpenEdit] = useState(false)
    const [openAddPropertyOwner, setAddPropertyOwner] = useState(false)
    useEffect(() => {
        fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.APARTMENT).then(
            (dataItems) => {
                setData(dataItems as Apartment[])
            }
        )
    }, [setData])
    function handleOpenEdit(data: Apartment) {
        setEditApartment(data)
        setOpenEdit(true)
    }
    function handleCloseEdit() {
        setEditApartment({
            address: "",
            apartmentName: "",
            id: undefined
        })
        setOpenEdit(false)
    }
    function handleOpenAddForm() {
        setAddPropertyOwner(true)
    }
    function handleCloseAddForm() {
        setAddPropertyOwner(false)
    }
    function handleOpenDelete(id: number) {
        setDeleteId(id)
        setDeleteModal(true)
    }
    function handleCloseDelete() {
        setDeleteModal(false)
    }
    async function deleteItem() {
        await fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.APARTMENT + "/" + deleteId, {
            method: "DELETE"
        })
            .then(() => {
                setData((prevData) => prevData.filter((owner) => owner.id !== deleteId));
                toast.success("Succesfully deleted ")
            })
    }


    return (
        <>
            {openAddPropertyOwner && <ApartmentForm handleClose={handleCloseAddForm} head="Add " edit={false} />}
            {openEdit && <ApartmentForm handleClose={handleCloseEdit} head="Edit " edit={true} />}

            <PageHead title='Apartments ' handleAdd={handleOpenAddForm} />
            {openDeleteModal && <DeleteModal handleDelete={deleteItem} close={handleCloseDelete} />}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Apartment Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>


                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((data, i) =>

                                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {data.apartmentName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {data.address}
                                    </td>

                                    <td className="flex items-center px-6 py-4">
                                        <button onClick={() => handleOpenEdit(data)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                        <button onClick={() => handleOpenDelete(data.id as number)} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default ApartmentTable