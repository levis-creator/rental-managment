"use client";
import React, { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import toast from 'react-hot-toast';

import TextInput from '@/components/form/TextInput';
import FormModal from '@/components/FormModal';
import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import { Apartment, PropertyOwner } from '@/lib/types';
import { apartment, apartments, pageTitle } from './apartmentAtom'; // Import pageTitle
import SelectInput from '@/components/form/SelectInput';
import { propertyOwners } from '../property-owners/propertyOwnerAtoms';

interface ApartmentFormProps {
    edit?: boolean;
    head: string;
    handleClose: () => void;
}

const ApartmentForm: React.FC<ApartmentFormProps> = ({ edit = false, head, handleClose }) => {
    const apartmentEdit = useAtomValue(apartment);
    const refreshData = useSetAtom(apartments);
    const [propertyOwnerData, setPropertyOwnerData] = useAtom(propertyOwners);
    const pageHead = useAtomValue(pageTitle); // Use pageTitle atom

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Apartment>({
        defaultValues: apartmentEdit || { address: '', apartmentName: '', ownerId: '' },
    });

    // Fetch property owners if not already loaded
    useEffect(() => {
        if (propertyOwnerData.length === 0) {
            fetchData<PropertyOwner[]>(`${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PROPERTY_OWNERS}`)
                .then((dataItems) => {
                    if (dataItems) {
                        setPropertyOwnerData(dataItems);
                    } else {
                        toast.error('No property owners found');
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch property owners:', error);
                    toast.error('Failed to load property owners');
                });
        }
    }, [propertyOwnerData, setPropertyOwnerData]);

    // Reset form when the modal opens or when `apartmentEdit` changes
    useEffect(() => {
        reset(apartmentEdit || { address: '', apartmentName: '', ownerId: '' });
    }, [apartmentEdit, reset]);

    // Handle form submission
    const onSubmit: SubmitHandler<Apartment> = useCallback(
        async (data) => {
            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.APARTMENT}${edit ? `/${apartmentEdit?.id}` : ''}`;
                const method = edit ? 'PUT' : 'POST';

                const response = await fetchData<Apartment>(url, { method, body: data });

                // Handle 204 No Content response
                if (response === null) {
                    // For 204 responses, assume the operation was successful
                    refreshData((items) =>
                        edit
                            ? items.map((item) => (item.id === apartmentEdit?.id ? { ...item, ...data } : item))
                            : [...items, data]
                    );
                    toast.success(`${head} ${pageHead} successfully`); // Use pageHead
                    handleClose();
                } else {
                    // For responses with a body, use the returned data
                    refreshData((items) =>
                        edit
                            ? items.map((item) => (item.id === apartmentEdit?.id ? { ...item, ...response } : item))
                            : [...items, response]
                    );
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
        [edit, apartmentEdit, refreshData, handleClose, head, pageHead] // Include pageHead in dependencies
    );

    return (
        <FormModal title={`${head} ${pageHead}`} handleClose={handleClose}> {/* Use pageHead */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
            >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <TextInput
                        name="apartmentName"
                        label={`${pageHead} Name`} // Use pageHead
                        register={register}
                        errors={errors}
                        aria-invalid={errors.apartmentName ? 'true' : 'false'}
                    />
                    <TextInput
                        name="address"
                        label={`${pageHead} Address`} // Use pageHead
                        register={register}
                        errors={errors}
                        aria-invalid={errors.address ? 'true' : 'false'}
                    />
                    <SelectInput
                        display="fullName"
                        options={propertyOwnerData}
                        name="ownerId"
                        label="Property Owner"
                        register={register}
                        aria-invalid={errors.ownerId ? 'true' : 'false'}
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

export default ApartmentForm;