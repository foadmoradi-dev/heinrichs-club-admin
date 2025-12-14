import { CountriesList } from "../../assets/CountriesList/CountriesList";
import Api from "../../api/api";


export function isValidPassword(password) {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>/;:'[\]\\+=_-]).{8,}$/;
    return passwordRegex.test(password);
}

export async function loginAction(prevState, formData) {
    const errors = {};
    const phoneNumber = formData.get("phoneNumber");
    const password = formData.get("password");
    if (!isValidPassword(password)) {
        errors.password = "Invalid password format";
    }
    if (!phoneNumber || phoneNumber.length < 10) {
        errors.phoneNumber = "Invalid phone number";
    }
    if (Object.keys(errors).length > 0) {
        return {
            password,
            phoneNumber,
            errors,
        };
    }

    try {
        const response = await Api.post("admin-login.php", {
                username: phoneNumber,
                password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        console.log(response);
        return {
            success: true,
            user: response.data,
        };
    } catch (err) {
        errors.phoneNumber =err?.response?.data?.message || "Login failed. Please try again.";
        return {
            password,
            phoneNumber,
            errors,
            success: false,
        };
    }
}


export async function sendVerificationCode(prevState, formData) {
    const errors = {};
    const phone_number = formData.get("phone_number");
    const country_code = formData.get("country_code");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const password = formData.get("password");
    const password_repeat = formData.get("password_repeat");
    const role = formData.get("role");
    const country_name = formData.get("country_name");

    if (!phone_number || phone_number.length < 8) {
        errors.phoneNumber = "Invalid phone number";
    }
    if (!first_name) errors.firstname = "First name required";
    if (!last_name) errors.lastname = "Last name required";
    if (!phone_number || phone_number.length < 8) errors.phoneNumber = "Invalid phone number";
    if (!password || !isValidPassword(password)) errors.password = "Invalid password";
    if (password !== password_repeat) errors.password_repeat = "Passwords do not match";
    if (!role) errors.role = "Select a role";
    if (Object.keys(errors).length > 0) {
        return {
            user :{
                first_name,
                last_name,
                password,
                password_repeat,
                role,
                phone_number,
                country_code,
                country_name
            },
            errors,
        };
    }

    try {
        const response = await Api.post("send-code.php", {
            phone_number: country_code + phone_number,
        });

        return {
            success: true,
            sentCode: response.data.code,
            user :{
                first_name,
                last_name,
                password,
                password_repeat,
                role,
                phone_number,
                country_code,
                country_name
            },
        };
    } catch (err) {
        return {
            errors: { phone_number: err?.response?.data?.message || "Failed to send code" },
            success: false,
            user :{
                first_name,
                last_name,
                password,
                password_repeat,
                role,
                phone_number,
                country_code,
                country_name
            },
        };
    }
}


