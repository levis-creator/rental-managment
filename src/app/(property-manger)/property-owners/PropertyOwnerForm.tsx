import React, { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAtomValue, useSetAtom } from 'jotai';
import toast from 'react-hot-toast';

import TextInput from '@/components/form/TextInput';
import FormModal from '@/components/FormModal';
import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import { PropertyOwner } from '@/lib/types';
import { propertyOwner, propertyOwners } from './propertyOwnerAtoms';

interface PropertyOwnerFormProps {
    edit?: boolean;
    head: string;
    handleClose: () => void;
}

const PropertyOwnerForm: React.FC<PropertyOwnerFormProps> = ({ edit = false, head, handleClose }) => {
    const propertyOwnerEdit = useAtomValue(propertyOwner);
    const refreshData = useSetAtom(propertyOwners);

    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<PropertyOwner>({
        defaultValues: propertyOwnerEdit || { fullName: '', email: '', phone: '' }, // Ensure default values
    });

    // Reset form when the modal opens
    useEffect(() => {
        reset(propertyOwnerEdit || { fullName: '', email: '', phone: '' });
    }, [propertyOwnerEdit, reset]);

    // Function to handle form submission
    const onSubmit: SubmitHandler<PropertyOwner> = useCallback(
        async (data) => {
            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.PROPERTY_OWNERS}${edit ? `/${propertyOwnerEdit?.id}` : ''}`;
                const method = edit ? 'PUT' : 'POST';

                await fetchData<PropertyOwner>(url, { method, body: data });

                refreshData((items) => (edit ? items.map((item) => (item.id === data.id ? data : item)) : [...items, data]));
                toast.success(edit ? 'Edited  successfully' : 'Added  successfully');
                handleClose();
            } catch {
                toast.error(edit ? 'Unable to edit ' : 'Unable to add ');
            }
        },
        [edit, propertyOwnerEdit, refreshData, handleClose]
    );

    return (
        <FormModal title={head} handleClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <TextInput name="fullName" label="Full Name" register={register} errors={errors} />
                    <TextInput name="email" label="Email Address" register={register} errors={errors} type="email" />
                    <TextInput name="phone" label="Phone Number" register={register} errors={errors} type="tel" />
                </div>

                <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    {edit ? 'Edit' : 'Add'}
                </button>
            </form>
        </FormModal>
    );
};

export default PropertyOwnerForm;
