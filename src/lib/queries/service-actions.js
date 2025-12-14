import api from "../../api/api";

/* =====================================================
   GET – all service companies
===================================================== */
export const fetchServiceCompanies = async () => {
    const { data } = await api.get("/service", {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
    });
    return data;
};

/* =====================================================
   GET – single service company by id
===================================================== */
export const fetchServiceCompanyById = async (id) => {
    if (!id) return null;
    const { data } = await api.get(`/service/${id}`, {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
    });
    return data;
};

/* =====================================================
   POST – create new service company
===================================================== */
export const newServiceCompany = async (payload) => {
    const { data } = await api.post("/service", payload, {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
    });
    return data;
};

/* =====================================================
   PUT – update service company
===================================================== */
export const updateServiceCompany = async (id, payload) => {
    const { data } = await api.patch(`/service/${id}`, payload, {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
    });
    return data;
};

/* =====================================================
   DELETE – remove service company
===================================================== */
export const deleteServiceCompany = async (id) => {
    const { data } = await api.delete(`/service/${id}`, {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
    });
    return data;
};

/* =====================================================
   PATCH – toggle active / inactive
===================================================== */
export const toggleServiceCompany = async (id, payload) => {
    const { data } = await api.patch(`/service/${id}`, payload, {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
    });
    return data;
};
