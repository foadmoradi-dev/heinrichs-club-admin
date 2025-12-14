'use client'
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo192.png";
import { useActionState, useEffect } from "react";


import { useNavigate } from "react-router";
import Input from "../../widgets/input";
import FormButton from "../../widgets/form-button";
import {loginAction} from "../../lib/actions/auth-actions";


const LoginForm = () => {
    const [formState, formAction, isPending] = useActionState(loginAction, {});
    const navigate = useNavigate();

    useEffect(() => {
        if (formState.success) {
            navigate(`/dashboard`);
        }
    }, [formState, navigate]);

    return (
        <div
            className={`relative flex flex-col justify-center items-center shadow-xl z-20 bg-white rounded-3xl w-full max-w-md px-8 py-10 transition-all duration-300`}
        >

            <div className="flex justify-center items-center mb-8">
                <Link to="/">
                    <img src={logo} alt={"Heinrich's Logo"} className="h-24 w-auto" />
                </Link>
            </div>

            {/* Form */}
            <form className="flex flex-col space-y-6 w-full" action={formAction}>
                {/* Phone Input */}
                <Input
                    type="phone"
                    name="phoneNumber"
                    label={"Phone number"}
                    country="country"
                    error={formState.errors?.phoneNumber}
                    helperText={formState.errors?.phoneNumber || "Input your phone number"}
                    value={formState.phoneNumber}

                />
                {/* Password Input */}
                <Input
                    type="password"
                    name="password"
                    label={"Password"}
                    error={formState.errors?.password}
                    helperText={formState.errors?.password || "Enter You Password"}
                    value={formState.password}
                />

                {/* Submit Button */}
                <FormButton
                    title={"Login"}
                    loadingStatus={isPending}
                    type="submit"
                    className="mt-2"
                />
            </form>

            {/* Links */}
            <div
                className={`flex flex-col sm:flex-row w-full justify-between items-center mt-6 gap-2 text-sm`}
            >
                <Link
                    to="/login-by-otp"
                    className="hover:text-blue-600 transition-colors duration-200"
                >
                    {"Login By OTP"}
                </Link>

            </div>
        </div>
    );
};

export default LoginForm;
