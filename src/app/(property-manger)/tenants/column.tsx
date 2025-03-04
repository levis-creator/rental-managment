"use client";
import { Tenant } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (
    handleEdit: (tenant: Tenant) => void,
    handleDelete: (tenant: Tenant) => void
): ColumnDef<Tenant>[] => [
        {
            accessorKey: "fullName",
            header: "Tenant Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "unitName",
            header: "Unit Name",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const tenant = row.original; // Access the row data

                return (
                    <div className="flex items-center space-x-2">
                        <button onClick={() => handleEdit(tenant)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(tenant)} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</button>

                    </div>
                );
            },
        },
    ];