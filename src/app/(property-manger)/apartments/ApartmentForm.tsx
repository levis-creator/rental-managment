import React, { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import toast from 'react-hot-toast';

import TextInput from '@/components/form/TextInput';
import FormModal from '@/components/FormModal';
import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import { Apartment, PropertyOwner } from '@/lib/types';
import { apartment, apartments } from './apartmentAtom';
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

    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<Apartment>({
        defaultValues: apartmentEdit || { address: '', apartmentName: '', ownerId: '' }, // Ensure default values
    });
    const [propertyOwnerData, setPropertyOwnerData] = useAtom(propertyOwners)
    // Reset form when the modal opens
    useEffect(() => {
        if (propertyOwnerData.length==0) {
            fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.PROPERTY_OWNERS).then(
                (dataItems) => {
                    setPropertyOwnerData(dataItems as PropertyOwner[])
                }
            )
        }
        reset(apartmentEdit || { address: '', apartmentName: '', ownerId: '' });
    }, [apartmentEdit, reset, propertyOwnerData, setPropertyOwnerData]);

    // Function to handle form submission
    const onSubmit: SubmitHandler<Apartment> = useCallback(

        async (data) => {
            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.APARTMENT}${edit ? `/${apartmentEdit?.id}` : ''}`;
                const method = edit ? 'PUT' : 'POST';

                await fetchData<Apartment>(url, { method, body: data });

                refreshData((items) => (edit ? items.map((item) => (item.id === data.id ? data : item)) : [...items, data]));
                toast.success(edit ? 'Edited Apartment successfully' : 'Added  successfully');
                handleClose();
            } catch {
                toast.error(edit ? 'Unable to edit ' : 'Unable to add ');
            }
        },
        [edit, apartmentEdit, refreshData, handleClose]
    );

    return (
        <FormModal title={head} handleClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <TextInput name="apartmentName" label="Apartment Name" register={register} errors={errors} />
                    <TextInput name="address" label="Apartment Address" register={register} errors={errors} />
                    <SelectInput display='fullName' options={propertyOwnerData} name='ownerId' label='' register={register} />
                </div>

                <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    {edit ? 'Edit' : 'Add'}
                </button>
            </form>
        </FormModal>
    );
};

export default ApartmentForm;
