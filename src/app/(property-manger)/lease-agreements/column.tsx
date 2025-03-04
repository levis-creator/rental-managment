"use client";
import { LeaseAgreement } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (
    handleEdit: (leaseAgreement: LeaseAgreement) => void,
    handleDelete: (leaseAgreement: LeaseAgreement) => void
): ColumnDef<LeaseAgreement>[] => [
    {
        accessorKey: "tenantName",
        header: "Tenant Name",
    },
    {
        accessorKey: "unitNumber",
        header: "Unit",
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
    },
    {
        accessorKey: "endDate",
        header: "End Date",
    },
    {
        accessorKey: "rentAmount",
        header: "Rent Amount",
        cell: ({ row }) => {
            const rentAmount = row.original.rentAmount;
            return `$${rentAmount.toLocaleString()}`; // Format as currency
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
            const leaseAgreement = row.original; // Access the row data

            return (
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleEdit(leaseAgreement)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(leaseAgreement)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    >
                        Remove
                    </button>
                </div>
            );
        },
    },
];