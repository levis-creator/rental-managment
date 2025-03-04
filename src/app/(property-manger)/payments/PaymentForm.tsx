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
import { Invoice, Payment } from "@/lib/types";
import { invoices } from "../invoices/InvoiceAtoms";
import { PageTitle, payment, payments } from "./PaymentAtoms";

interface PaymentFormProps {
    edit?: boolean;
    handleClose: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ edit = false, handleClose }) => {
    const pageHead = useAtomValue(PageTitle); // Use pageTitle atom
    const head = `${edit ? "Edit " : "Add "}${pageHead}`; // Dynamic title
    const paymentEdit = useAtomValue(payment);
    const refreshData = useSetAtom(payments);
    const [invoiceData, setInvoiceData] = useAtom(invoices);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Payment>({
        defaultValues: paymentEdit || {
            invoiceId: 0,
            paymentDate: "",
            amountPaid: 0,
            paymentMethod: "",
            transactionId: "",
        },
    });

    // Fetch invoices if not already loaded
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const dataItems = await fetchData<Invoice[]>(
                    `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.INVOICE_SUMMARY}`
                );
                setInvoiceData(dataItems as Invoice[]);
            } catch (error) {
                toast.error("Failed to fetch invoices.");
                console.error(error);
            }
        };

        fetchInvoices();
    }, [setInvoiceData]);

    // Reset form when the modal opens or when `paymentEdit` changes
    useEffect(() => {
        reset(
            paymentEdit || {
                invoiceId: 0,
                paymentDate: "",
                amountPaid: 0,
                paymentMethod: "",
                transactionId: "",
            }
        );
    }, [paymentEdit, reset]);

    // Fetch latest data from the database
    const fetchLatestData = useCallback(async () => {
        try {
            const dataItems = await fetchData<Payment[]>(
                `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PAYMENT_SUMMARY}`
            );
            if (dataItems) {
                refreshData(dataItems);
            } else {
                toast.error("No payments found");
            }
        } catch (error) {
            console.error("Failed to fetch payments:", error);
            toast.error("Failed to load payments");
        }
    }, [refreshData]);

    // Handle form submission
    const onSubmit: SubmitHandler<Payment> = useCallback(
        async (data) => {
            setIsSubmitting(true);
            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PAYMENT}${
                    edit ? `/${paymentEdit?.id}` : ""
                }`;
                const method = edit ? "PUT" : "POST";

                const response = await fetchData<Payment>(url, { method, body: data });

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
        [edit, paymentEdit, handleClose, pageHead, fetchLatestData] // Include fetchLatestData in dependencies
    );

    return (
        <FormModal title={head} handleClose={handleClose}>
            {/* Use pageHead */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
            >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <SelectInput
                        display="tenantName"
                        options={invoiceData}
                        value="id"
                        name="invoiceId"
                        label="Invoice Paid"
                        register={register}
                        aria-invalid={errors.invoiceId ? "true" : "false"}
                    />
                    <TextInput
                        name="paymentDate"
                        label="Payment Date"
                        register={register}
                        errors={errors}
                        type="date"
                        aria-invalid={errors.paymentDate ? "true" : "false"}
                    />
                    <TextInput
                        name="amountPaid"
                        label="Amount Paid"
                        register={register}
                        errors={errors}
                        type="number"
                        aria-invalid={errors.amountPaid ? "true" : "false"}
                    />
                    <TextInput
                        name="paymentMethod"
                        label="Payment Method"
                        register={register}
                        errors={errors}
                        aria-invalid={errors.paymentMethod ? "true" : "false"}
                    />
                    <TextInput
                        name="transactionId"
                        label="Transaction ID"
                        register={register}
                        errors={errors}
                        aria-invalid={errors.transactionId ? "true" : "false"}
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

export default PaymentForm;