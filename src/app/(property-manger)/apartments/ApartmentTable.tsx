"use client";
import DeleteModal from "@/components/DeleteModal";
import PageHead from "@/components/PageHead";
import { DataTable } from "@/components/reports/data-table";
import { API_URL, ENDPOINTS } from "@/constants/ApiUrls";
import { fetchData } from "@/lib/db_operations";
import { Apartment } from "@/lib/types";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import 'react-data-grid/lib/styles.css';
import toast from "react-hot-toast";
import { apartment, apartments, pageTitle } from "./apartmentAtom";
import ApartmentForm from "./ApartmentForm";
import { getColumns } from "./column";

const ApartmentTable = ({ dataItems }: { dataItems: Apartment[] }) => {
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
    const [data, setData] = useAtom(apartments);
    const setEditApartment = useSetAtom(apartment);
    const pageHead = useAtomValue(pageTitle); // Use pageHead atom
    const [openEdit, setOpenEdit] = useState(false);
    const [openAddApartment, setAddApartment] = useState(false);

    // Initialize data
    useEffect(() => {
        setData(dataItems);
    }, [setData, dataItems]);

    // Edit handlers
    const handleEdit = useCallback((data: Apartment) => {
        setEditApartment(data);
        setOpenEdit(true);
    }, [setEditApartment]);

    const handleCloseEdit = useCallback(() => {
        setEditApartment({
            address: "",
            apartmentName: "",
            id: undefined,
        });
        setOpenEdit(false);
    }, [setEditApartment]);

    // Add handlers
    const handleOpenAddForm = useCallback(() => {
        setAddApartment(true);
    }, []);

    const handleCloseAddForm = useCallback(() => {
        setAddApartment(false);
    }, []);

    // Delete handlers
    const handleDelete = useCallback((data: Apartment) => {
        setDeleteId(data.id);
        setDeleteModal(true);
    }, []);

    const handleCloseDelete = useCallback(() => {
        setDeleteModal(false);
    }, []);

    const deleteItem = useCallback(async () => {
        if (deleteId === undefined) return;

        try {
            await fetchData(`${API_URL.EXTERNAL_API_URL}${ENDPOINTS.APARTMENT}/${deleteId}`, {
                method: "DELETE",
            });
            setData((prevData) => prevData.filter((apartment) => apartment.id !== deleteId));
            toast.success(`Successfully deleted ${pageHead}`);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(`Failed to delete ${pageHead}: ${err.message}`);
            } else {
                toast.error(`Failed to delete ${pageHead}`);
            }
        } finally {
            handleCloseDelete();
        }
    }, [deleteId, setData, handleCloseDelete, pageHead]);

    return (
        <>
            {openAddApartment && <ApartmentForm handleClose={handleCloseAddForm} head="Add " edit={false} />}
            {openEdit && <ApartmentForm handleClose={handleCloseEdit} head="Edit " edit={true} />}

            <PageHead title={pageHead} handleAdd={handleOpenAddForm} />
            {openDeleteModal && <DeleteModal handleDelete={deleteItem} close={handleCloseDelete} />}
            <DataTable columns={getColumns(handleEdit, handleDelete)} data={data} />
        </>
    );
};

export default ApartmentTable;