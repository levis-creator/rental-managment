"use client";

import DeleteModal from "@/components/DeleteModal";
import PageHead from "@/components/PageHead";
import { API_URL, ENDPOINTS } from "@/constants/ApiUrls";
import { fetchData } from "@/lib/db_operations";
import { InvoiceStatus } from "@/lib/status";
import { Invoice } from "@/lib/types";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState, useCallback } from "react";
import "react-data-grid/lib/styles.css";
import toast from "react-hot-toast";
import { invoice, invoices, PageTitle } from "./InvoiceAtoms";
import InvoiceForm from "./InvoiceForm";
import { DataTable } from "@/components/reports/data-table"; // Assuming you have a DataTable component
import { getColumns } from "./columns";

interface InvoiceTableProps {
    dataItems: Invoice[]; // dataItems passed as a prop
}

const InvoiceTable = ({ dataItems }: InvoiceTableProps) => {
    const pageHead = useAtomValue(PageTitle); // Use pageTitle atom

    const [openDeleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [data, setData] = useAtom(invoices);
    const setEditInvoice = useSetAtom(invoice);
    const [openInvoiceEdit, setOpenInvoiceEdit] = useState(false);
    const [openAddInvoice, setAddInvoice] = useState(false);

    // Initialize data with dataItems on component mount
    useEffect(() => {
        setData(dataItems);
    }, [setData, dataItems]);

    // Function to refresh data from the database
    const refreshData = useCallback(async () => {
        try {
            const dataItems = await fetchData<Invoice[]>(
                `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.INVOICE_SUMMARY}`
            );
            setData(dataItems as Invoice[]);
        } catch (error) {
            toast.error(`Failed to refresh ${pageHead}.`);
            console.error(error);
        }
    }, [setData, pageHead]);

    // Edit handlers
    const handleEdit = useCallback((data: Invoice) => {
        setEditInvoice(data);
        setOpenInvoiceEdit(true);
    }, [setEditInvoice]);

    const handleCloseEdit = useCallback(() => {
        setEditInvoice({
            tenantName: "",
            amountDue: 0,
            status: InvoiceStatus.Pending,
            id: undefined,
        });
        setOpenInvoiceEdit(false);
        refreshData(); // Refresh data after editing
    }, [setEditInvoice, refreshData]);

    // Add handlers
    const handleOpenAddForm = useCallback(() => {
        setAddInvoice(true);
    }, []);

    const handleCloseAddForm = useCallback(() => {
        setAddInvoice(false);
        refreshData(); // Refresh data after adding
    }, [refreshData]);

    // Delete handlers
    const handleDelete = useCallback((data: Invoice) => {
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
                `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.INVOICE}/${deleteId}`,
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
            {openAddInvoice && (
                <InvoiceForm handleClose={handleCloseAddForm} edit={false} />
            )}
            {openInvoiceEdit && (
                <InvoiceForm handleClose={handleCloseEdit} edit={true} />
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

export default InvoiceTable;