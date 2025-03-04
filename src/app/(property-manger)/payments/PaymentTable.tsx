"use client";

import DeleteModal from "@/components/DeleteModal";
import { API_URL, ENDPOINTS } from "@/constants/ApiUrls";
import { fetchData } from "@/lib/db_operations";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState, useCallback } from "react";
import "react-data-grid/lib/styles.css";
import toast from "react-hot-toast";
import { PageTitle, payment, payments } from "./PaymentAtoms";
import PageHead from "@/components/PageHead";
import PaymentForm from "./PaymentForm";
import { Payment } from "@/lib/types";
import { DataTable } from "@/components/reports/data-table"; // Assuming you have a DataTable component
import { getColumns } from "./column";

interface PaymentTableProps {
    dataItems: Payment[]; // dataItems passed as a prop
}

const PaymentTable = ({ dataItems }: PaymentTableProps) => {
    const pageHead = useAtomValue(PageTitle); // Use pageTitle atom

    const [openDeleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [data, setData] = useAtom(payments);
    const setEditPayment = useSetAtom(payment);
    const [openPaymentEdit, setOpenPaymentEdit] = useState(false);
    const [openAddPayment, setAddPayment] = useState(false);

    // Initialize data with dataItems on component mount
    useEffect(() => {
        setData(dataItems);
    }, [setData, dataItems]);

    // Function to refresh data from the database
    const refreshData = useCallback(async () => {
        try {
            const dataItems = await fetchData<Payment[]>(
                `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PAYMENT_SUMMARY}`
            );
            setData(dataItems as Payment[]);
        } catch (error) {
            toast.error(`Failed to refresh ${pageHead}.`);
            console.error(error);
        }
    }, [setData, pageHead]);

    // Edit handlers
    const handleEdit = useCallback((data: Payment) => {
        setEditPayment(data);
        setOpenPaymentEdit(true);
    }, [setEditPayment]);

    const handleCloseEdit = useCallback(() => {
        setEditPayment({
            invoiceId: 0,
            paymentDate: "",
            amountPaid: 0,
            paymentMethod: "",
            transactionId: "",
        });
        setOpenPaymentEdit(false);
        refreshData(); // Refresh data after editing
    }, [setEditPayment, refreshData]);

    // Add handlers
    const handleOpenAddForm = useCallback(() => {
        setAddPayment(true);
    }, []);

    const handleCloseAddForm = useCallback(() => {
        setAddPayment(false);
        refreshData(); // Refresh data after adding
    }, [refreshData]);

    // Delete handlers
    const handleDelete = useCallback((data: Payment) => {
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
                `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PAYMENT}/${deleteId}`,
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
            {openAddPayment && (
                <PaymentForm handleClose={handleCloseAddForm} />
            )}
            {openPaymentEdit && (
                <PaymentForm handleClose={handleCloseEdit} edit={true} />
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

export default PaymentTable;