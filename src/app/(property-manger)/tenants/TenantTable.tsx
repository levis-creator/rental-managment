"use client";
import DeleteModal from "@/components/DeleteModal";
import PageHead from "@/components/PageHead";
import { API_URL, ENDPOINTS } from "@/constants/ApiUrls";
import { fetchData } from "@/lib/db_operations";
import { Tenant } from "@/lib/types";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { useEffect, useState, useCallback } from "react";
import 'react-data-grid/lib/styles.css';
import toast from "react-hot-toast";
import { tenant, tenants, pageTitle } from "./TenantAtoms"; // Import pageTitle
import TenantForm from "./TenantForm";
import { DataTable } from "@/components/reports/data-table";
import { getColumns } from "./column"; // Import getColumns

const TenantTable = ({ dataItems }: { dataItems: Tenant[] }) => {
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
    const [data, setData] = useAtom(tenants);
    const setEditTenant = useSetAtom(tenant);
    const pageHead = useAtomValue(pageTitle); // Use pageTitle atom
    const [openTenantEdit, setOpenTenantEdit] = useState(false);
    const [openAddTenant, setAddTenant] = useState(false);

    // Fetch data on component mount
    useEffect(() => {
        setData(dataItems);
    }, [setData, dataItems]);

    // Edit handlers
    const handleEdit = useCallback((data: Tenant) => {
        setEditTenant(data);
        setOpenTenantEdit(true);
    }, [setEditTenant]);

    const handleCloseEdit = useCallback(() => {
        setEditTenant({
            fullName: "",
            email: "",
            phone: "",
            id: undefined,
        });
        setOpenTenantEdit(false);
    }, [setEditTenant]);

    // Add handlers
    const handleOpenAddForm = useCallback(() => {
        setAddTenant(true);
    }, []);

    const handleCloseAddForm = useCallback(() => {
        setAddTenant(false);
    }, []);

    // Delete handlers
    const handleDelete = useCallback((data: Tenant) => {
        setDeleteId(data.id);
        setDeleteModal(true);
    }, []);

    const handleCloseDelete = useCallback(() => {
        setDeleteModal(false);
    }, []);

    const deleteItem = useCallback(async () => {
        if (deleteId === undefined) return;

        try {
            const response = await fetchData(`${API_URL.EXTERNAL_API_URL}${ENDPOINTS.TENANT}/${deleteId}`, {
                method: "DELETE",
            });

            // Handle 204 No Content response
            if (response === null) {
                // For 204 responses, assume the deletion was successful
                setData((prevData) => prevData.filter((tenant) => tenant.id !== deleteId));
                toast.success(`Successfully deleted ${pageHead}`);
            } else {
                // For responses with a body, use the returned data (if applicable)
                setData((prevData) => prevData.filter((tenant) => tenant.id !== deleteId));
                toast.success(`Successfully deleted ${pageHead}`);
            }
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
            {openAddTenant && <TenantForm handleClose={handleCloseAddForm} head="Add " edit={false} />}
            {openTenantEdit && <TenantForm handleClose={handleCloseEdit} head="Edit " edit={true} />}

            <PageHead title={pageHead} handleAdd={handleOpenAddForm} />
            {openDeleteModal && <DeleteModal handleDelete={deleteItem} close={handleCloseDelete} />}
            <DataTable columns={getColumns(handleEdit, handleDelete)} data={data} />
        </>
    );
};

export default TenantTable;