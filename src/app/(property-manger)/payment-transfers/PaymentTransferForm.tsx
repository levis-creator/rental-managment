import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import SelectInput from '@/components/form/SelectInput';
import TextInput from '@/components/form/TextInput';
import FormModal from '@/components/FormModal';
import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import { Payment, PaymentTransfer, Tenant, Unit } from '@/lib/types';
import { tenants } from '../tenants/TenantAtoms';
import { PageTitle, paymentTranfers, paymentTransfer } from './PaymentTransferAtom';
import { units } from '../units/unitAtoms';

interface PaymentFormProps {
    edit?: boolean;
    handleClose: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ edit = false, handleClose }) => {
    const title = useAtomValue(PageTitle)
    const head = `${edit ? 'Edit ' : 'Add '}` + title
    const paymentTransferEdit = useAtomValue(paymentTransfer);
    const refreshData = useSetAtom(paymentTranfers);
    const [tenantData, setTenantData] = useAtom(tenants)
    const [unitData, setUnitData] = useAtom(units)

    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<PaymentTransfer>({
        defaultValues: paymentTransferEdit || { tenantId: 0, toUnitId: 0, transferDate: '' }, // Ensure default values
    });

    // Reset form when the modal opens
    useEffect(() => {
        fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.TENANT).then(
            (dataItems) => {
                setTenantData(dataItems as Tenant[])
            }
        )
        fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.UNIT).then(
            (dataItems) => {
                setUnitData(dataItems as Unit[])
            }
        )
        reset(paymentTransferEdit || { tenantId: 0, toUnitId: 0, transferDate: '' });
    }, [paymentTransferEdit, reset, setTenantData, setUnitData]);

    // Function to handle form submission
    const onSubmit: SubmitHandler<PaymentTransfer> = useCallback(
        async (data) => {
            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PAYMENT_TRANSFER}${edit ? `/${paymentTransferEdit?.id}` : ''}`;
                const method = edit ? 'PUT' : 'POST';

                await fetchData<Payment>(url, { method, body: data });

                refreshData((items) => (edit ? items.map((item) => (item.id === data.id ? data : item)) : [...items, data]));
                toast.success(edit ? 'Edited  successfully' : 'Added  successfully');
                handleClose();
            } catch {
                toast.error(edit ? 'Unable to edit ' : 'Unable to add ');
            }
        },
        [edit, paymentTransferEdit, refreshData, handleClose]
    );

    return (
        <FormModal title={head} handleClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <SelectInput display='fullName' options={tenantData} value='id' name='tenantId' label='Tenant' register={register} />
                    <SelectInput display='unitNumber' options={unitData} value='id' name='toUnitId' label='Move to Unit' register={register} />
                    <TextInput name="transferDate" label="Transfer Date" register={register} errors={errors} type='date' />
                </div>

                <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    {edit ? 'Edit' : 'Add'}
                </button>
            </form>
        </FormModal>
    );
};

export default PaymentForm;
