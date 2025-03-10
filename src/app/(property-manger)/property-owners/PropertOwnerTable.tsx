"use client";
import DeleteModal from "@/components/DeleteModal";
import PageHead from "@/components/PageHead";
import { DataTable } from "@/components/reports/data-table";
import { API_URL, ENDPOINTS } from "@/constants/ApiUrls";
import { PropertyOwner } from "@/lib/types";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import 'react-data-grid/lib/styles.css';
import toast from "react-hot-toast";
import { getColumns } from "./column";
import { pageTitle, propertyOwner, propertyOwners } from "./propertyOwnerAtoms";
import PropertyOwnerForm from "./PropertyOwnerForm";

const PropertyOwnerTable = ({ dataItems }: { dataItems: PropertyOwner[] }) => {
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
    const [data, setData] = useAtom(propertyOwners);
    const setEditProperty = useSetAtom(propertyOwner);
    const pageHead = useAtomValue(pageTitle);
    const [openPropertyOwnerEdit, setOpenPropertyOwnerEdit] = useState(false);
    const [openAddPropertyOwner, setAddPropertyOwner] = useState(false);

    // Initialize data when the component mounts or when `dataItems` changes
    useEffect(() => {
        setData(dataItems);
    }, [setData, dataItems]);

    // Reset property owner to default values
    const resetPropertyOwner = useCallback(() => {
        setEditProperty({
            email: "",
            fullName: "",
            phone: "",
            id: undefined,
        });
    }, [setEditProperty]);

    // Edit handlers
    const handleEdit = useCallback((data: PropertyOwner) => {
        setEditProperty(data);
        setOpenPropertyOwnerEdit(true);
    }, [setEditProperty]);

    const handleCloseEdit = useCallback(() => {
        resetPropertyOwner();
        setOpenPropertyOwnerEdit(false);
    }, [resetPropertyOwner]);

    // Add handlers
    const handleOpenAddForm = useCallback(() => {
        setAddPropertyOwner(true);
    }, []);

    const handleCloseAddForm = useCallback(() => {
        setAddPropertyOwner(false);
    }, []);

    // Delete handlers
    const handleDelete = useCallback((data: PropertyOwner) => {
        setDeleteId(data.id);
        setDeleteModal(true);
    }, []);

    const handleCloseDelete = useCallback(() => {
        setDeleteModal(false);
    }, []);

    const deleteItem = useCallback(async () => {
        if (deleteId === undefined) return;

        try {
            const response = await fetch(`${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PROPERTY_OWNERS}/${deleteId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setData((prevData) => prevData.filter((owner) => owner.id !== deleteId));
            toast.success("Successfully deleted");
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
            {openAddPropertyOwner && <PropertyOwnerForm handleClose={handleCloseAddForm} head="Add " edit={false} />}
            {openPropertyOwnerEdit && <PropertyOwnerForm handleClose={handleCloseEdit} head="Edit " edit={true} />}

            <PageHead title={pageHead} handleAdd={handleOpenAddForm} />
            {openDeleteModal && <DeleteModal handleDelete={deleteItem} close={handleCloseDelete} />}
            <DataTable columns={getColumns(handleEdit, handleDelete)} data={data} />
        </>
    );
};

export default PropertyOwnerTable;