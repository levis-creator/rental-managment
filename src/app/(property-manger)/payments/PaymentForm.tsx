import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import SelectInput from '@/components/form/SelectInput';
import TextInput from '@/components/form/TextInput';
import FormModal from '@/components/FormModal';
import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import { Invoice, Payment } from '@/lib/types';
import { invoices } from '../invoices/InvoiceAtoms';
import { PageTitle, payment, payments } from './PaymentAtoms';

interface PaymentFormProps {
    edit?: boolean;
    handleClose: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ edit = false, handleClose }) => {
    const title = useAtomValue(PageTitle)
    const head = `${edit ? 'Edit ' : 'Add '}` + title
    const paymentEdit = useAtomValue(payment);
    const refreshData = useSetAtom(payments);
    const [invoiceData, setinvoiceData] = useAtom(invoices)
    
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<Payment>({
        defaultValues: paymentEdit || { invoiceId: 0, paymentDate: "", amountPaid: 0, paymentMethod: '' , transactionId:''}, // Ensure default values
    });

    // Reset form when the modal opens
    useEffect(() => {
        fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.INVOICE_SUMMARY).then(
                    (dataItems) => {
                        setinvoiceData(dataItems as Invoice[])
                    }
                )
        reset(paymentEdit || { invoiceId: 0, paymentDate: "", amountPaid: 0, paymentMethod: '' , transactionId:''});
    }, [paymentEdit, reset, setinvoiceData]);

    // Function to handle form submission
    const onSubmit: SubmitHandler<Payment> = useCallback(
        async (data) => {
            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PAYMENT}${edit ? `/${paymentEdit?.id}` : ''}`;
                const method = edit ? 'PUT' : 'POST';

                await fetchData<Payment>(url, { method, body: data });

                refreshData((items) => (edit ? items.map((item) => (item.id === data.id ? data : item)) : [...items, data]));
                toast.success(edit ? 'Edited  successfully' : 'Added  successfully');
                handleClose();
            } catch {
                toast.error(edit ? 'Unable to edit ' : 'Unable to add ');
            }
        },
        [edit, paymentEdit, refreshData, handleClose]
    );

    return (
        <FormModal title={head} handleClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <SelectInput display='tenantName' options={invoiceData} value='id' name='invoiceId' label='Invoice Paid' register={register} />
                    <TextInput name="paymentDate" label="Payment Date" register={register} errors={errors} type='date'/>
                    <TextInput name="amountPaid" label="Amount Paid" register={register} errors={errors} type="number" />
                    <TextInput name="paymentMethod" label="Payment Method" register={register} errors={errors} />
                    <TextInput name="transactionId" label="Transaction Id" register={register} errors={errors} />

                </div>

                <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    {edit ? 'Edit' : 'Add'}
                </button>
            </form>
        </FormModal>
    );
};

export default PaymentForm;
