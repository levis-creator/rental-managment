"use client";

import DeleteModal from "@/components/DeleteModal";
import { API_URL, ENDPOINTS } from "@/constants/ApiUrls";
import { fetchData } from "@/lib/db_operations";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState, useCallback } from "react";
import "react-data-grid/lib/styles.css";
import toast from "react-hot-toast";
import { PageTitle, paymentTranfers, paymentTransfer } from "./PaymentTransferAtom";
import PageHead from "@/components/PageHead";
import PaymentTransferForm from "./PaymentTransferForm";
import { PaymentTransfer } from "@/lib/types";
import { DataTable } from "@/components/reports/data-table"; // Assuming you have a DataTable component
import { getColumns } from "./columns"; // Import the getColumns function

interface PaymentTransferTableProps {
    dataItems: PaymentTransfer[]; // dataItems passed as a prop
}

const PaymentTransferTable = ({ dataItems }: PaymentTransferTableProps) => {
    const pageHead = useAtomValue(PageTitle); // Use pageTitle atom

    const [openDeleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [data, setData] = useAtom(paymentTranfers);
    const setEditPaymentTransfer = useSetAtom(paymentTransfer);
    const [openPaymentTransferEdit, setOpenPaymentTransferEdit] = useState(false);
    const [openAddPaymentTransfer, setAddPaymentTransfer] = useState(false);

    // Initialize data with dataItems on component mount
    useEffect(() => {
        setData(dataItems);
    }, [setData, dataItems]);

    // Function to refresh data from the database
    const refreshData = useCallback(async () => {
        try {
            const dataItems = await fetchData<PaymentTransfer[]>(
                `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PAYMENT_TRANSFER_SUMMARY}`
            );
            setData(dataItems as PaymentTransfer[]);
        } catch (error) {
            toast.error(`Failed to refresh ${pageHead}.`);
            console.error(error);
        }
    }, [setData, pageHead]);

    // Edit handlers
    const handleEdit = useCallback((data: PaymentTransfer) => {
        setEditPaymentTransfer(data);
        setOpenPaymentTransferEdit(true);
    }, [setEditPaymentTransfer]);

    const handleCloseEdit = useCallback(() => {
        setEditPaymentTransfer({
            tenantId: 0,
            toUnitId: 0,
            transferDate: "",
        });
        setOpenPaymentTransferEdit(false);
        refreshData(); // Refresh data after editing
    }, [setEditPaymentTransfer, refreshData]);

    // Add handlers
    const handleOpenAddForm = useCallback(() => {
        setAddPaymentTransfer(true);
    }, []);

    const handleCloseAddForm = useCallback(() => {
        setAddPaymentTransfer(false);
        refreshData(); // Refresh data after adding
    }, [refreshData]);

    // Delete handlers
    const handleDelete = useCallback((data: PaymentTransfer) => {
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
                `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PAYMENT_TRANSFER}/${deleteId}`,
                { method: "DELETE" }
            );
            toast.success(`Successfully deleted ${pageHead}`);
            refreshData(); // Refresh data after deleting
        } catch (error) {
            toast.error(`Failed to delete ${pageHead}`);
            console.error(error);
        } finally {
            handleCloseDelete();
        }
    }, [deleteId, handleCloseDelete, pageHead, refreshData]);

    // Generate columns using getColumns
    const columns = getColumns(handleEdit, handleDelete);

    return (
        <>
            {/* Modals */}
            {openAddPaymentTransfer && (
                <PaymentTransferForm handleClose={handleCloseAddForm} />
            )}
            {openPaymentTransferEdit && (
                <PaymentTransferForm handleClose={handleCloseEdit} edit={true} />
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

export default PaymentTransferTable;