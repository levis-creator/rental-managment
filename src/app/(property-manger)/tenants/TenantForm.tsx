"use client";
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

import { tenants, tenant, pageTitle } from './TenantAtoms'; // Import pageTitle
import { units } from '../units/unitAtoms';
import { UnitStatus } from '@/lib/status';

interface TenantFormProps {
    edit?: boolean;
    head: string;
    handleClose: () => void;
}

const TenantForm: React.FC<TenantFormProps> = ({ edit = false, head, handleClose }) => {
    const tenantEdit = useAtomValue(tenant);
    const refreshData = useSetAtom(tenants);
    const [unitData, setUnitData] = useAtom(units);
    const pageHead = useAtomValue(pageTitle); // Use pageTitle atom

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Tenant>({
        defaultValues: tenantEdit || { fullName: "", email: "", phone: "", id: undefined },
    });

    // Fetch units if not already loaded
    useEffect(() => {
        if (unitData.length === 0) {
            fetchData<Unit[]>(`${API_URL.EXTERNAL_API_URL}${ENDPOINTS.UNIT_AVAILABLE}`)
                .then((dataItems) => {
                    if (dataItems) {
                        setUnitData(dataItems);
                    } else {
                        toast.error('No units available found');
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch units:', error);
                    toast.error('Failed to load units');
                });
        }
    }, [unitData, setUnitData]);

    // Reset form when the modal opens or when `tenantEdit` changes
    useEffect(() => {
        reset(tenantEdit || { fullName: "", email: "", phone: "", id: undefined });
    }, [tenantEdit, reset]);

    // Fetch latest data from the database
    const fetchLatestData = useCallback(async () => {
        try {
            const dataItems = await fetchData<Tenant[]>(`${API_URL.EXTERNAL_API_URL}${ENDPOINTS.TENANT_SUMMARY}`);
            if (dataItems) {
                refreshData(dataItems);
            } else {
                toast.error('No tenants found');
            }
        } catch (error) {
            console.error('Failed to fetch tenants:', error);
            toast.error('Failed to load tenants');
        }
    }, [refreshData]);

    // Handle form submission
    const onSubmit: SubmitHandler<Tenant> = useCallback(
        async (data) => {
            const unitId = data.unitId;
            data = { ...data,  unit: { id: unitId, status:UnitStatus.Occupied } };

            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.TENANT}${edit ? `/${tenantEdit?.id}` : ''}`;
                const method = edit ? 'PUT' : 'POST';

                const response = await fetchData<Tenant>(url, { method, body: data });

                // Handle 204 No Content response
                if (response === null) {
                    // For 204 responses, assume the operation was successful
                    await fetchLatestData(); // Refresh data from the database
                    toast.success(`${head} ${pageHead} successfully`); // Use pageHead
                    handleClose();
                } else {
                    // For responses with a body, use the returned data
                    await fetchLatestData(); // Refresh data from the database
                    toast.success(`${head} ${pageHead} successfully`); // Use pageHead
                    handleClose();
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(`Unable to ${edit ? 'edit' : 'add'} ${pageHead}: ${error.message}`); // Use pageHead
                } else {
                    toast.error(`Unable to ${edit ? 'edit' : 'add'} ${pageHead}`); // Use pageHead
                }
            }
        },
        [edit, tenantEdit, handleClose, head, pageHead, fetchLatestData] // Include fetchLatestData in dependencies
    );

    return (
        <FormModal title={`${head} ${pageHead}`} handleClose={handleClose}> {/* Use pageHead */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
            >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <TextInput
                        name="fullName"
                        label="Full Name"
                        register={register}
                        errors={errors}
                        aria-invalid={errors.fullName ? 'true' : 'false'}
                    />
                    <TextInput
                        name="email"
                        label="Email Address"
                        register={register}
                        errors={errors}
                        type="email"
                        aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    <TextInput
                        name="phone"
                        label="Phone"
                        register={register}
                        errors={errors}
                        type="tel"
                        aria-invalid={errors.phone ? 'true' : 'false'}
                    />
                    <SelectInput
                        display="unitNumber"
                        options={unitData}
                        name="unitId"
                        label="Unit"
                        register={register}
                        aria-invalid={errors.unitId ? 'true' : 'false'}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Submitting...' : edit ? 'Save Changes' : `Add ${pageHead}`} {/* Use pageHead */}
                </button>
            </form>
        </FormModal>
    );
};

export default TenantForm;