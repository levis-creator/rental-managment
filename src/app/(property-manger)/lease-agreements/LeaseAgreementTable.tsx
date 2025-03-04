"use client";

import DeleteModal from "@/components/DeleteModal";
import { API_URL, ENDPOINTS } from "@/constants/ApiUrls";
import { fetchData } from "@/lib/db_operations";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { useEffect, useState, useCallback } from "react";
import "react-data-grid/lib/styles.css";
import toast from "react-hot-toast";
import { leaseAgreement, leaseAgreements, pageTitle } from "./LeaseAgreementAtoms"; // Import pageTitle
import PageHead from "@/components/PageHead";
import LeaseAgreementForm from "./LeaseAgreeForm";
import { LeaseAgreement } from "@/lib/types";
import { DataTable } from "@/components/reports/data-table"; // Assuming you have a DataTable component
import { getColumns } from "./column";

interface LeaseAgreementTableProps {
    dataItems: LeaseAgreement[]; // dataItems passed as a prop
}

const LeaseAgreementTable = ({ dataItems }: LeaseAgreementTableProps) => {
    // State management
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [data, setData] = useAtom(leaseAgreements);
    const setEditLeaseAgreement = useSetAtom(leaseAgreement);
    const [openLeaseAgreementEdit, setOpenLeaseAgreementEdit] = useState(false);
    const [openAddLeaseAgreement, setAddLeaseAgreement] = useState(false);

    // Use pageTitle atom
    const pageHead = useAtomValue(pageTitle);

    // Initialize data with dataItems on component mount
    useEffect(() => {
        setData(dataItems);
    }, [setData, dataItems]);

    // Edit handlers
    const handleEdit = useCallback((data: LeaseAgreement) => {
        setEditLeaseAgreement({ ...data });
        setOpenLeaseAgreementEdit(true);
    }, [setEditLeaseAgreement]);

    const handleCloseEdit = useCallback(() => {
        setEditLeaseAgreement({
            tenantId: 0,
            unitId: null,
            startDate: "",
            endDate: "",
            rentAmount: 10000,
        });
        setOpenLeaseAgreementEdit(false);
    }, [setEditLeaseAgreement]);

    // Add handlers
    const handleOpenAddForm = useCallback(() => {
        setAddLeaseAgreement(true);
    }, []);

    const handleCloseAddForm = useCallback(() => {
        setAddLeaseAgreement(false);
    }, []);

    // Delete handlers
    const handleDelete = useCallback((data: LeaseAgreement) => {
        setDeleteId(data.id as number);
        setDeleteModal(true);
    }, []);

    const handleCloseDelete = useCallback(() => {
        setDeleteModal(false);
    }, []);

    const deleteItem = useCallback(async () => {
        if (deleteId === null) return;

        try {
            await fetchData(
                `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.LEASE_AGREEMENT}/${deleteId}`,
                { method: "DELETE" }
            );
            setData((prevData) => prevData.filter((item) => item.id !== deleteId));
            toast.success(`Successfully deleted ${pageHead}`);
        } catch (error) {
            toast.error(`Failed to delete ${pageHead}`);
            console.error(error);
        } finally {
            handleCloseDelete();
        }
    }, [deleteId, setData, handleCloseDelete, pageHead]);

    // Generate columns using getColumns
    const columns = getColumns(handleEdit, handleDelete);

    return (
        <>
            {/* Modals */}
            {openAddLeaseAgreement && (
                <LeaseAgreementForm handleClose={handleCloseAddForm} head="Add " edit={false} />
            )}
            {openLeaseAgreementEdit && (
                <LeaseAgreementForm handleClose={handleCloseEdit} head="Edit " edit={true} />
            )}
            {openDeleteModal && (
                <DeleteModal handleDelete={deleteItem} close={handleCloseDelete} />
            )}

            {/* Page Header */}
            <PageHead title={pageHead} handleAdd={handleOpenAddForm} />

            {/* DataTable */}
            <DataTable columns={columns} data={data} />
        </>
    );
};

export default LeaseAgreementTable;