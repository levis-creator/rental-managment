import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import SelectInput from '@/components/form/SelectInput';
import TextInput from '@/components/form/TextInput';
import FormModal from '@/components/FormModal';
import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import { Invoice, LeaseAgreement } from '@/lib/types';
import { leaseAgreements } from '../lease-agreements/LeaseAgreementAtoms';
import { invoice, invoices, PageTitle } from './InvoiceAtoms';
import { InvoiceStatus } from '@/lib/status';
import { enumToArray } from '@/lib/EnumToArray';

interface InvoiceFormProps {
    edit?: boolean;
    handleClose: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ edit = false, handleClose }) => {
        const statusOptions= enumToArray(InvoiceStatus)
    
    const invoiceEdit = useAtomValue(invoice);
    const refreshData = useSetAtom(invoices);
    const title=useAtomValue(PageTitle)
    const head= `${edit?'Edit ':'Add '}`+ title 
    const [leaseAgreementData, setLeaseAgreementData] = useAtom(leaseAgreements)

    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<Invoice>({
        defaultValues: invoiceEdit || { tenantName: '', leaseId: null, amountDue: 10000 }, // Ensure default values
    });

    // Reset form when the modal opens
    useEffect(() => {
        fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.LEASEAGREEMENTSUMMARY).then(
            (dataItems) => {
                setLeaseAgreementData(dataItems as LeaseAgreement[])
            }
        )
        reset(invoiceEdit || { tenantName: '', leaseId: null, amountDue: 10000 });
    }, [invoiceEdit, reset, setLeaseAgreementData]);

    // Function to handle form submission
    const onSubmit: SubmitHandler<Invoice> = useCallback(
        async (data) => {
            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.INVOICE}${edit ? `/${invoiceEdit?.id}` : ''}`;
                const method = edit ? 'PUT' : 'POST';

                await fetchData<Invoice>(url, { method, body: data });

                refreshData((items) => (edit ? items.map((item) => (item.id === data.id ? data : item)) : [...items, data]));
                toast.success(edit ? 'Edited  successfully' : 'Added  successfully');
                handleClose();
            } catch {
                toast.error(edit ? 'Unable to edit ' : 'Unable to add ');
            }
        },
        [edit, invoiceEdit, refreshData, handleClose]
    );

    return (
        <FormModal title={head} handleClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <SelectInput display='tenantName' options={leaseAgreementData} value='id' name='leaseId' label='Lease Agreement' register={register} />
                    <TextInput name="amountDue" label="Amount Due" register={register} errors={errors} type='number'/>
                    <SelectInput display='name' options={statusOptions} name='status' label='Status' register={register} />
                    
                </div>
                <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    {edit ? 'Edit' : 'Add'}
                </button>
            </form>
        </FormModal>
    );
};

export default InvoiceForm;
