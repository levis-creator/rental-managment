"use client"
import { Button } from "@/components/ui/button"
import currence_converter from "@/lib/currency_converter"
import { Arrears } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


export const columns: ColumnDef<Arrears>[] = [
    {
        accessorKey: "tenantName",
        header: "Tenant Name",
    },
    {
        accessorKey: "apartmentName",
        header: "Apartment Name",
    },
    {
        accessorKey: "unitName",
        header: "Unit",
    },
    {
        accessorKey: "amountDue",
        header: "Amount Due",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amountDue"))
            const formatted = currence_converter(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "balanceDue",
        header: "Balance Due",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("balanceDue"))
            const formatted = currence_converter(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "overpaidAmount",
        header: "OverPaid Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("overpaidAmount"))
            const formatted = currence_converter(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "amountPaid",
        header: ({ column }) => {
            return (
                <div className="text-right">

                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amountPaid"))
            const formatted = currence_converter(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
]