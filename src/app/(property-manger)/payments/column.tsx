"use client";
import { Payment } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (
    handleEdit: (payment: Payment) => void,
    handleDelete: (payment: Payment) => void
): ColumnDef<Payment>[] => [
    {
        accessorKey: "invoiceId",
        header: "Invoice No",
        cell: ({ row }) => `#${row.original.invoiceId}`,
    },
    {
        accessorKey: "amountPaid",
        header: "Amount Paid",
        cell: ({ row }) => `$${row.original.amountPaid.toLocaleString()}`,
    },
    {
        accessorKey: "paymentDate",
        header: "Payment Date",
    },
    {
        accessorKey: "paymentMethod",
        header: "Payment Method",
    },
    {
        accessorKey: "transactionId",
        header: "Transaction ID",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const payment = row.original; // Access the row data

            return (
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleEdit(payment)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(payment)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    >
                        Remove
                    </button>
                </div>
            );
        },
    },
];