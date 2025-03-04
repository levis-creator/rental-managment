"use client";
import { Unit } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (
    handleEdit: (unit: Unit) => void,
    handleDelete: (unit: Unit) => void
): ColumnDef<Unit>[] => [
    {
        accessorKey: "unitNumber",
        header: "Unit Number",
    },
    {
        accessorKey: "apartmentName",
        header: "Apartment Name",
    },
    {
        accessorKey: "statusDescription",
        header: "Unit Status",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const unit = row.original; // Access the row data

            return (
                <div className="flex items-center py-4">
                <button
                    onClick={() => handleEdit(unit)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(unit)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                >
                    Remove
                </button>
            </div>
            );
        },
    },
];