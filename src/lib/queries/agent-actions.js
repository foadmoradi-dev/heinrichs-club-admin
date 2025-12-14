

// Fetch agents with pagination & optional filters
import Api from "../../api/api";

export const getAgents = async ({ page = 1, limit = 16, filters = {} }) => {
    try {
        const params = new URLSearchParams({
            page,
            limit,
            ...(filters.order ? { order: filters.order } : {}),
            ...(filters.query ? { query: filters.query } : {}),
        });

        const res = await Api.get(`/agent?${params}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });

        if (res.status === 201) {
            // refresh session if needed
            await Api.get("/refresh.php", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            const retryRes = await Api.get(`/agent?${params}`, {
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

// Fetch agents by search query
export const getAgentsBySearch = async ({ filters = {} }) => {
    try {
        const searchParams = {};
        if (filters.phone) searchParams.phone = filters.phone;
        if (filters.email) searchParams.email = filters.email;
        if (filters.first_name) searchParams.first_name = filters.first_name;

        const params = new URLSearchParams(searchParams);

        const res = await Api.get(`/agent?${params}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });

        if (res.status === 201) {
            // refresh session
            await Api.get("/refresh.php", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            const retryRes = await Api.get(`/agent?${params}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            return retryRes.data;
        }

        return res.data;
    } catch (err) {
        console.error("Error searching agents:", err);
        return { agents: [], total: 0 };
    }
};

export const updateAgent = async ({ id, updatedData }) => {
    const res = await Api.patch(`/agent/${id}`, updatedData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });
    return res.data;
};
