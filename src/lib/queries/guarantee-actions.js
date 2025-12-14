import Api from "../../api/api";

export const getGuarantees = async ({ page, filters }) => {
    const params = new URLSearchParams({
        page,
        ...(filters?.category ? { type: filters.category } : {}),
    });

    const res = await Api.get(`/guarantee?${params}`, {
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
        const res = await Api.get(`/guarantee?${params}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return res.data
    }else {
        return res.data
    }
};


export const getGuaranteesForCustomer = async ({ page, filters }) => {
    const params = new URLSearchParams({
        page,
        ...(filters?.category ? { type: filters.category } : {}),
        ...(filters?.role ? { role: filters.role } : {}),
        ...(filters?.role_id ? { role_id: filters.role_id } : {}),
    });

    const res = await Api.get(`/guarantee?${params}`, {
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
        const res = await Api.get(`/guarantee?${params}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return res.data
    }else {
        return res.data
    }
};

export const getGuarantiesBySearch =async ({filters }) => {
    try {
        // build filters properly
        const activeFilter =
            filters.barcode || filters.phone
                ? {
                    ...(filters.barcode
                        ? { barcode: filters.barcode }
                        : { phone: filters.phone }),
                }
                : {};

        const params = new URLSearchParams({
            ...(activeFilter.barcode ? { barcode: activeFilter.barcode } : {}),
            ...(activeFilter.phone ? { phone: activeFilter.phone } : {}),
        });


        const res = await Api.get(`/guarantee?${params}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        // your API returns {status, result}
        if (res.status === 201) {
            await Api.get('refresh.php', {
                header: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            })
            const res = await Api.get(`/guarantee?${params}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return res.data
        }
        return res.data
    } catch (err) {
        return { items: [], totalCount: 0 };
    }
}
export async function activeGuarantee(guarantee) {
    const { data } = await Api.patch('guarantee', guarantee, {
        headers: {
            'Content-Type': 'application/json', // or 'multipart/form-data' if sending FormData
        },
        withCredentials: true, // send cookies/session
    });
    console.log(data);
    return data;
}