import Api from "../../api/api";

export const verifyHandler = async (phone_number) => {
    try{
        const response = await Api.post("send-code.php", {
            phone_number: phone_number,
        });
        return {message:response.data.code, success:true};
    }catch(e){
        return {message:e.response.data.message, success:false};
    }

}

export async function updateProfile(profile) {
    const { data } = await Api.patch('agent', profile, {
        headers: {
            'Content-Type': 'application/json', // or 'multipart/form-data' if sending FormData
        },
        withCredentials: true, // send cookies/session
    });
    console.log(data);
    return data;
}
export async function updateCustomerProfile(profile) {
    const { data } = await Api.patch('customer', profile, {
        headers: {
            'Content-Type': 'application/json', // or 'multipart/form-data' if sending FormData
        },
        withCredentials: true, // send cookies/session
    });
    console.log(data);
    return data;
}


export async function fetchCertification() {
    const { data } = await Api.get('/cert', {
        headers: {
            'Content-Type': 'application/json', // or 'multipart/form-data' if sending FormData
        },
        withCredentials: true, // send cookies/session
    });
    console.log(data);
    return data;
}