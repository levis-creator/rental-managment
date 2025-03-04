import React, { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAtomValue, useSetAtom } from 'jotai';
import toast from 'react-hot-toast';

import TextInput from '@/components/form/TextInput';
import FormModal from '@/components/FormModal';
import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import { PropertyOwner } from '@/lib/types';
import { pageTitle, propertyOwner, propertyOwners } from './propertyOwnerAtoms';

interface PropertyOwnerFormProps {
    edit?: boolean;
    head: string;
    handleClose: () => void;
}

const PropertyOwnerForm: React.FC<PropertyOwnerFormProps> = ({ edit = false, head, handleClose }) => {
    const propertyOwnerEdit = useAtomValue(propertyOwner);
    const pageHead = useAtomValue(pageTitle)
    const refreshData = useSetAtom(propertyOwners);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PropertyOwner>({
        defaultValues: propertyOwnerEdit || { fullName: '', email: '', phone: '' },
        mode: 'onBlur'
    });

    // Reset form when the modal opens or when `propertyOwnerEdit` changes
    useEffect(() => {
        reset(propertyOwnerEdit || { fullName: '', email: '', phone: '' });
    }, [propertyOwnerEdit, reset]);

    // Handle form submission
    const onSubmit: SubmitHandler<PropertyOwner> = useCallback(
        async (data) => {
            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PROPERTY_OWNERS}${edit ? `/${propertyOwnerEdit?.id}` : ''}`;
                const method = edit ? 'PUT' : 'POST';

                const response = await fetchData<PropertyOwner>(url, { method, body: data });

                // Handle 204 No Content response
                if (response === undefined || response === null) {
                    // For 204 responses, assume the operation was successful
                    refreshData((items) =>
                        edit
                            ? items.map((item) => (item.id === propertyOwnerEdit?.id ? { ...item, ...data } : item))
                            : [...items, data]
                    );
                    toast.success(`${head} successfully`);
                    handleClose();
                } else if (response) {
                    // For responses with a body, use the returned data
                    refreshData((items) =>
                        edit
                            ? items.map((item) => (item.id === propertyOwnerEdit?.id ? { ...item, ...response } : item))
                            : [...items, response]
                    );
                    toast.success(`${head} successfully`);
                    handleClose();
                } else {
                    throw new Error('Failed to save property owner');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error(`Unable to ${edit ? 'edit' : 'add'} ${pageHead}`);
            }
        },
        [edit, propertyOwnerEdit, refreshData, handleClose, head, pageHead]
    );

    return (
        <FormModal title={`${head} ${pageHead}`} handleClose={handleClose}>
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
                        label="Phone Number"
                        register={register}
                        errors={errors}
                        type="tel"

                        aria-invalid={errors.phone ? 'true' : 'false'}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Submitting...' : edit ? 'Save Changes' : 'Add Property Owner'}
                </button>
            </form>
        </FormModal>
    );
};

export default PropertyOwnerForm;