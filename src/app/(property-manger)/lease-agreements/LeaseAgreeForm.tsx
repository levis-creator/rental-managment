import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import SelectInput from '@/components/form/SelectInput';
import TextInput from '@/components/form/TextInput';
import FormModal from '@/components/FormModal';
import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import { enumToArray } from '@/lib/EnumToArray';
import { LeaseStatus } from '@/lib/status';
import { LeaseAgreement, Tenant, Unit } from '@/lib/types';
import { tenants } from '../tenants/TenantAtoms';
import { units } from '../units/unitAtoms';
import { leaseAgreement, leaseAgreements } from './LeaseAgreementAtoms';

interface LeaseAgreementFormProps {
    edit?: boolean;
    head: string;
    handleClose: () => void;
}

const LeaseAgreementForm: React.FC<LeaseAgreementFormProps> = ({ edit = false, head, handleClose }) => {
    const statusOptions= enumToArray(LeaseStatus)
    const leaseAgreementEdit = useAtomValue(leaseAgreement);
    const refreshData = useSetAtom(leaseAgreements);
    const [tenantData, setTenantData] = useAtom(tenants)
    const [unitData, setUnitData]=useAtom(units)
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<LeaseAgreement>({
        defaultValues: leaseAgreementEdit || { tenantId: 0, unitId:null, startDate: '', endDate: '', rentAmount: 10000 }, // Ensure default values
    });

    // Reset form when the modal opens
    useEffect(() => {
        reset(leaseAgreementEdit || { tenantId: 0, startDate: '', endDate: '', rentAmount: 10000 });
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
    }, [leaseAgreementEdit, reset, setTenantData, setUnitData]);

    // Function to handle form submission
    const onSubmit: SubmitHandler<LeaseAgreement> = useCallback(
        async (data) => {
            const unitId= data.unitId;
            data={...data, unit:{id: unitId}}
            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.LEASE_AGREEMENT}${edit ? `/${leaseAgreementEdit?.id}` : ''}`;
                const method = edit ? 'PUT' : 'POST';

                await fetchData<LeaseAgreement>(url, { method, body: data });

                refreshData((items) => (edit ? items.map((item) => (item.id === data.id ? data : item)) : [...items, data]));
                toast.success(edit ? 'Edited  successfully' : 'Added  successfully');
                handleClose();
            } catch {
                toast.error(edit ? 'Unable to edit ' : 'Unable to add ');
            }
        },
        [edit, leaseAgreementEdit, refreshData, handleClose]
    );

    return (
        <FormModal title={head} handleClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <SelectInput display='fullName' options={tenantData} value='id' name='tenantId' label='Tenant' register={register} />
                    <SelectInput display='unitNumber' options={unitData} value='id' name='unitId' label='Unit' register={register} />
                    <TextInput name="startDate" label="Start Date" register={register} errors={errors} type='date' />
                    <TextInput name="endDate" label="End Date" register={register} errors={errors} type="date" />
                    <TextInput name="rentAmount" label="Rent Amount" register={register} errors={errors} type="number" />
                    <SelectInput display='name' options={statusOptions} name='status' label='Status' register={register} />
                    
                </div>

                <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    {edit ? 'Edit' : 'Add'}
                </button>
            </form>
        </FormModal>
    );
};

export default LeaseAgreementForm;
