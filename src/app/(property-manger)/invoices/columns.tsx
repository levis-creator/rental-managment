"use client";
import { Invoice } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (
    handleEdit: (invoice: Invoice) => void,
    handleDelete: (invoice: Invoice) => void
): ColumnDef<Invoice>[] => [
        {
            accessorKey: "id",
            header: "Invoice ID",
        },
        {
            accessorKey: "tenantName",
            header: "Tenant Name",
        },
        {
            accessorKey: "amountDue",
            header: "Amount Due",
            cell: ({ row }) => {
                const amountDue = row.original.amountDue;
                return `$${amountDue.toLocaleString()}`; // Format as currency
            },
        },
        {
            accessorKey: "statusDescription",
            header: "Status",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const invoice = row.original; // Access the row data

                return (
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleEdit(invoice)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(invoice)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                        >
                            Remove
                        </button>
                    </div>
                );
            },
        },
    ];