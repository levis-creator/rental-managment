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
import { UnitStatus } from '@/lib/status';
import { Apartment, Unit } from '@/lib/types';
import { apartments } from '../apartments/apartmentAtom';
import { pageTitle, unit, units } from './unitAtoms'; // Import pageTitle

interface UnitFormProps {
    edit?: boolean;
    head: string;
    handleClose: () => void;
}

const UnitForm: React.FC<UnitFormProps> = ({ edit = false, head, handleClose }) => {
    const unitEdit = useAtomValue(unit);
    const refreshData = useSetAtom(units);
    const [apartmentData, setApartmentData] = useAtom(apartments);
    const pageHead = useAtomValue(pageTitle); // Use pageTitle atom

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Unit>({
        defaultValues: unitEdit || { apartmentId: 0, status: UnitStatus.Available, unitNumber: '', id: undefined },
    });

    // Fetch apartments if not already loaded
    useEffect(() => {
        if (apartmentData.length === 0) {
            fetchData<Apartment[]>(`${API_URL.EXTERNAL_API_URL}${ENDPOINTS.APARTMENT}`)
                .then((dataItems) => {
                    if (dataItems) {
                        setApartmentData(dataItems);
                    } else {
                        toast.error('No apartments found');
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch apartments:', error);
                    toast.error('Failed to load apartments');
                });
        }
    }, [apartmentData, setApartmentData]);

    // Reset form when the modal opens or when `unitEdit` changes
    useEffect(() => {
        reset(unitEdit || { apartmentId: 0, status: UnitStatus.Available, unitNumber: '', id: undefined });
    }, [unitEdit, reset]);

    // Fetch latest data from the API
    const fetchLatestData = useCallback(async () => {
        try {
            const dataItems = await fetchData<Unit[]>(`${API_URL.EXTERNAL_API_URL}${ENDPOINTS.UNIT_SUMMARY}`);
            if (dataItems) {
                refreshData(dataItems);
            } else {
                toast.error('No units found');
            }
        } catch (error) {
            console.error('Failed to fetch units:', error);
            toast.error('Failed to load units');
        }
    }, [refreshData]);

    // Handle form submission
    const onSubmit: SubmitHandler<Unit> = useCallback(
        async (data) => {
            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.UNIT}${edit ? `/${unitEdit?.id}` : ''}`;
                const method = edit ? 'PUT' : 'POST';

                const response = await fetchData<Unit>(url, { method, body: data });

                // Handle 204 No Content response
                if (response === null) {
                    // For 204 responses, assume the operation was successful
                    await fetchLatestData(); // Refresh data from the API
                    toast.success(`${head} ${pageHead} successfully`); // Use pageHead
                    handleClose();
                } else {
                    // For responses with a body, use the returned data
                    await fetchLatestData(); // Refresh data from the API
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
        [edit, unitEdit, handleClose, head, pageHead, fetchLatestData] // Include fetchLatestData in dependencies
    );

    return (
        <FormModal title={`${head} ${pageHead}`} handleClose={handleClose}> {/* Use pageHead */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
            >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <TextInput
                        name="unitNumber"
                        label="Unit Number"
                        register={register}
                        errors={errors}
                        aria-invalid={errors.unitNumber ? 'true' : 'false'}
                    />
                    <SelectInput
                        display="apartmentName"
                        options={apartmentData}
                        name="apartmentId"
                        label="Apartment Name"
                        register={register}
                        aria-invalid={errors.apartmentId ? 'true' : 'false'}
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

export default UnitForm;