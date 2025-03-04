"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import SelectInput from "@/components/form/SelectInput";
import TextInput from "@/components/form/TextInput";
import FormModal from "@/components/FormModal";
import { API_URL, ENDPOINTS } from "@/constants/ApiUrls";
import { fetchData } from "@/lib/db_operations";
import { enumToArray } from "@/lib/EnumToArray";
import { InvoiceStatus } from "@/lib/status";
import { Invoice, LeaseAgreement } from "@/lib/types";
import { leaseAgreements } from "../lease-agreements/LeaseAgreementAtoms";
import { invoice, invoices, PageTitle } from "./InvoiceAtoms";

interface InvoiceFormProps {
    edit?: boolean;
    handleClose: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ edit = false, handleClose }) => {
    const statusOptions = enumToArray(InvoiceStatus);
    const invoiceEdit = useAtomValue(invoice);
    const refreshData = useSetAtom(invoices);
    const pageHead = useAtomValue(PageTitle); // Use pageTitle atom
    const [leaseAgreementData, setLeaseAgreementData] = useAtom(leaseAgreements);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Invoice>({
        defaultValues: invoiceEdit || {
            tenantName: "",
            leaseId: null,
            amountDue: 10000,
            status: InvoiceStatus.Pending, // Default status
        },
    });

    // Fetch lease agreements if not already loaded
    useEffect(() => {
        const fetchLeaseAgreements = async () => {
            try {
                const dataItems = await fetchData<LeaseAgreement[]>(
                    `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.LEASEAGREEMENTSUMMARY}`
                );
                setLeaseAgreementData(dataItems as LeaseAgreement[]);
            } catch (error) {
                toast.error("Failed to fetch lease agreements.");
                console.error(error);
            }
        };

        fetchLeaseAgreements();
    }, [setLeaseAgreementData]);

    // Reset form when the modal opens or when `invoiceEdit` changes
    useEffect(() => {
        reset(
            invoiceEdit || {
                tenantName: "",
                leaseId: null,
                amountDue: 10000,
                status: InvoiceStatus.Pending,
            }
        );
    }, [invoiceEdit, reset]);

    // Fetch latest data from the database
    const fetchLatestData = useCallback(async () => {
        try {
            const dataItems = await fetchData<Invoice[]>(
                `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.INVOICE_SUMMARY}`
            );
            if (dataItems) {
                refreshData(dataItems);
            } else {
                toast.error("No invoices found");
            }
        } catch (error) {
            console.error("Failed to fetch invoices:", error);
            toast.error("Failed to load invoices");
        }
    }, [refreshData]);

    // Handle form submission
    const onSubmit: SubmitHandler<Invoice> = useCallback(
        async (data) => {
            setIsSubmitting(true);
            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.INVOICE}${
                    edit ? `/${invoiceEdit?.id}` : ""
                }`;
                const method = edit ? "PUT" : "POST";

                const response = await fetchData<Invoice>(url, { method, body: data });

                // Handle 204 No Content response
                if (response === null) {
                    // For 204 responses, assume the operation was successful
                    await fetchLatestData(); // Refresh data from the database
                    toast.success(`${edit ? "Edited" : "Added"} ${pageHead} successfully`); // Use pageHead
                    handleClose();
                } else {
                    // For responses with a body, use the returned data
                    await fetchLatestData(); // Refresh data from the database
                    toast.success(`${edit ? "Edited" : "Added"} ${pageHead} successfully`); // Use pageHead
                    handleClose();
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(`Unable to ${edit ? "edit" : "add"} ${pageHead}: ${error.message}`); // Use pageHead
                } else {
                    toast.error(`Unable to ${edit ? "edit" : "add"} ${pageHead}`); // Use pageHead
                }
            } finally {
                setIsSubmitting(false);
            }
        },
        [edit, invoiceEdit, handleClose, pageHead, fetchLatestData] // Include fetchLatestData in dependencies
    );

    return (
        <FormModal title={`${edit ? "Edit" : "Add"} ${pageHead}`} handleClose={handleClose}>
            {/* Use pageHead */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
            >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <SelectInput
                        display="tenantName"
                        options={leaseAgreementData}
                        value="id"
                        name="leaseId"
                        label="Lease Agreement"
                        register={register}
                        aria-invalid={errors.leaseId ? "true" : "false"}
                    />
                    <TextInput
                        name="amountDue"
                        label="Amount Due"
                        register={register}
                        errors={errors}
                        type="number"
                        aria-invalid={errors.amountDue ? "true" : "false"}
                    />
                    <SelectInput
                        display="name"
                        options={statusOptions}
                        value="value"
                        name="status"
                        label="Status"
                        register={register}
                        aria-invalid={errors.status ? "true" : "false"}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Submitting..." : edit ? "Save Changes" : `Add ${pageHead}`}{" "}
                    {/* Use pageHead */}
                </button>
            </form>
        </FormModal>
    );
};

export default InvoiceForm;