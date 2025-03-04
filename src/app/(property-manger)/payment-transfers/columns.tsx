"use client";
import { PaymentTransfer } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (
    handleEdit: (paymentTransfer: PaymentTransfer) => void,
    handleDelete: (paymentTransfer: PaymentTransfer) => void
): ColumnDef<PaymentTransfer>[] => [
    {
        accessorKey: "tenantName",
        header: "Tenant Name",
    },
    {
        accessorKey: "unitNumber",
        header: "To Unit",
    },
    {
        accessorKey: "transferDate",
        header: "Transfer Date",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const paymentTransfer = row.original; // Access the row data

            return (
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleEdit(paymentTransfer)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(paymentTransfer)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    >
                        Remove
                    </button>
                </div>
            );
        },
    },
];