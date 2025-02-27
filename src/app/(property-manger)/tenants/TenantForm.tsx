"use client"
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import SelectInput from '@/components/form/SelectInput';
import TextInput from '@/components/form/TextInput';
import FormModal from '@/components/FormModal';
import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import { Tenant, Unit } from '@/lib/types';

import { tenants,tenant } from './TenantAtoms';
import { units } from '../units/unitAtoms';

interface tenantFormProps {
    edit?: boolean;
    head: string;
    handleClose: () => void;
}

const TenantForm: React.FC<tenantFormProps> = ({ edit = false, head, handleClose }) => {
    const tenantEdit = useAtomValue(tenant);
    const refreshData = useSetAtom(tenants);
    const [unitData, setUnitData] = useAtom(units)
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<Tenant>({
        defaultValues: tenantEdit || {fullName:"", email: '', phone:'', id: undefined }, // Ensure default values
    });

    // Reset form when the modal opens
    useEffect(() => {
        if (unitData.length == 0) {
            fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.UNIT).then(
                (dataItems) => {
                    setUnitData(dataItems as Unit[])
                }
            )
        }
        reset(tenantEdit || { fullName: "", email: "", phone:"", id: undefined });
    }, [tenantEdit, reset, unitData, setUnitData]);

    // Function to handle form submission
    const onSubmit: SubmitHandler<Tenant> = useCallback(
        async (data) => {
            const unitId= data.unitId
            data={...data, unit:{id:unitId}}
            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.TENANT}${edit ? `/${tenantEdit?.id}` : ''}`;
                const method = edit ? 'PUT' : 'POST';

                await fetchData<Tenant>(url, { method, body: data });

                refreshData((items) => (edit ? items.map((item) => (item.id === data.id ? data : item)) : [...items, data]));
                toast.success(edit ? 'Edited  successfully' : 'Added  successfully');
                handleClose();
            } catch {
                toast.error(edit ? 'Unable to edit ' : 'Unable to add ');
            }
        },
        [edit, tenantEdit, refreshData, handleClose]
    );

    return (
        <FormModal title={head} handleClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <TextInput name="fullName" label="Full Name" register={register} errors={errors} />
                    <TextInput name="email" label="Email Address" register={register} errors={errors} type='email'/>
                    <TextInput name="phone" label="Phone" register={register} errors={errors} type='tel'/>
                    <SelectInput display='unitNumber' options={unitData} name='unitId' label='Unit' register={register} />
                </div>

                <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    {edit ? 'Edit' : 'Add'}
                </button>
            </form>
        </FormModal>
    );
};

export default TenantForm;
