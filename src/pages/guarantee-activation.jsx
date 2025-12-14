import {useState} from "react";
import {useSelector} from "react-redux";
import Input from "../widgets/input";
import PhoneInput from "../widgets/phone-input";
import {CountriesList} from "../assets/CountriesList/CountriesList";
import FormButton from "../widgets/form-button";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {activeGuarantee} from "../lib/queries/guarantee-actions";
import InactiveAccountNotice from "../widgets/inactive-account-notice";
import ReceiptTemplate from "../components/guaranties/receipt-template";

const GuaranteeActivationLayout = () => {
    const queryClient = useQueryClient();
    const user = useSelector(state => state.userSlice.user);
    const [errors, setErrors] = useState(null);
    const [data, setData] = useState({});
    const [status, setStatus] = useState(null);


    const { mutate } = useMutation({
        mutationFn: activeGuarantee,
        onMutate: async (updatedGuarantee) => {
            await queryClient.cancelQueries({ queryKey: ['active-guarantee'] });
            const previousGuarantee = queryClient.getQueryData(['active-guarantee']);
            queryClient.setQueryData(['active-guarantee'], updatedGuarantee);
            setStatus(true)
            return { previousGuarantee };
        },
        onError: (err, updatedGuarantee, context) => {
            queryClient.setQueryData(['active-guarantee'], context.previousGuarantee);
            setStatus(false)

        },
        onSettled: () => {
            queryClient.invalidateQueries(['active-guarantee']);
        },
    });

    const validate = (data) => {
        const tempErrors = {};
        if (!data.first_name)  tempErrors.first_name = "Customer first name is required";
        if (!data.last_name) tempErrors.last_name = "Customer Last name is required";
        if(!data.barcode)  tempErrors.barcode = "Barcode is required";
        if(!data.product_price) tempErrors.product_price = "Price is required";
        if(!data.product_model)  tempErrors.product_model = "Product Model is required";
        if(!data.address)  tempErrors.customer_model = "Customer Address is required";
        if(!data.phone_number)  tempErrors.phone_number = "Phone number is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const isValid = validate(data);
        if (!isValid) return;
        mutate(data);
        setData({
            ...data,
            customer_name:data.first_name + " " + data.last_name,
            customer_address:data.address,
            customer_phone_number:data.phone_number,
            price:data.product_price,
            agent_name:user.firstname + " " + user.lastname,
            agent_address:user.address,
            agent_phone_number:user.phone_number,
            start_at:new Date(),
        })

    }
    return(
            <div className={'flex justify-center items-center mt-20 space-x-10'}>
                <form className={'flex flex-col justify-left items-left mt-20 space-y-10'} onSubmit={submitHandler}>
                    <div className="flex justify-left items-center space-x-4">
                        <Input
                            type="text"
                            name="first_name"
                            label="First Name"
                            value={data.first_name}
                            error={!!errors?.first_name}
                            helperText={errors?.first_name}
                        />
                        <Input
                            type="text"
                            name="last_name"
                            label="Last Name"
                            value={data.last_name}
                            error={!!errors?.last_name}
                            helperText={errors?.last_name}
                        />
                    </div>
                    <Input
                        type="text"
                        name="barcode"
                        label="Barcode"
                        value={data.barcode}
                        error={!!errors?.barcode}
                        helperText={errors?.barcode}
                    />
                    <PhoneInput
                        type="phone"
                        name="phone_number"
                        precodeName="country_code"
                        label="Phone Number"
                        country="country_name"
                        precodeHelperText="preCodeHelperText"
                        precodeLabel="Precode"
                        value={data.phone_number}
                        selCount={CountriesList.find(sel => sel.code === user.phone_number.slice(0, 3))}
                        error={!!errors?.phone_number}
                        helperText={errors?.phone_number}
                    />
                    <Input
                        type="text"
                        name="address"
                        label="Address"
                        value={data.address}
                        error={!!errors?.address}
                        helperText={errors?.address}
                    />
                    <div className={'flex justify-left items-center space-x-4'}>
                        <Input
                            type="text"
                            name="product_model"
                            label="Product Model"
                            value={data.product_model}
                            error={!!errors?.product_model}
                            helperText={errors?.product_model}
                        />
                        <Input
                            type="text"
                            name="product_price"
                            label="Product Price"
                            value={data.product_price}
                            error={!!errors?.product_price}
                            helperText={errors?.product_price}
                        />
                    </div>
                    <div className="flex md:w-[50%] justify-between ps-4 pe-4 items-center mb-5 mt-5">
                        <FormButton title="Active Guarantee" type="submit" variant="text" />
                    </div>
                </form>
                {
                    status && <ReceiptTemplate data={data}/>
                }
            </div>

    )
}
export default GuaranteeActivationLayout