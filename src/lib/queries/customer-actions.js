import Api from "../../api/api";


export const getCustomers = async ({ page = 1, limit = 16, filters = {} }) => {
    try {
        const params = new URLSearchParams({
            page,
            limit,
            ...(filters.order ? { order: filters.order } : {}),
            ...(filters.query ? { query: filters.query } : {}),
        });

        const res = await Api.get(`/customer?${params}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });

        if (res.status === 201) {
            // refresh session if needed
            await Api.get("/refresh.php", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            const retryRes = await Api.get(`/customer?${params}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            return retryRes.data;
        }

        return res.data;
    } catch (err) {
        console.error("Error fetching agents:", err);
        return { agents: [], total: 0 };
    }
};
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