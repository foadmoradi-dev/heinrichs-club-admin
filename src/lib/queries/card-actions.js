import Api from "../../api/api";
import api from "../../api/api";



export const fetchCardById = async (id) => {
    const { data } = await Api.get(`/card/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    });
    return data;
};

export const fetchCard = async () => {
    const { data } = await Api.get(`/card`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    });
    return data;
};

export const updateCard = async (id, formData) => {
    return await api.patch(`/card/${id}`, formData, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
}
export const deleteCard = async (id, formData) => {
    return await api.delete(`/card/${id}`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
}
export const newCard = async (formData) => {
    return await api.post(`/card`, formData, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })
}

export const fetchDiscountCardsOfCustomer = async ({page, filters}) => {
    const params = new URLSearchParams({
        page,
        ...(filters?.category ? { type: filters.category } : {}),
        ...(filters?.role ? { role: filters.role } : {}),
        ...(filters?.role_id ? { role_id: filters.role_id } : {}),
    });
    const res = await Api.get(`/card?${params}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
    if(res.status === 201) {
        await Api.get('refresh.php', {
            header: {
                'Content-Type': "application/json"
            },
            withCredentials: true
        })
        const res = await Api.get(`/card?${params}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return res.data
    }else {
        return res.data
    }
}
export async function toggleBurnStatus(id) {
    const res = await Api.patch(`/card`, {redeemed_id:id},{
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
    return res.data
}

