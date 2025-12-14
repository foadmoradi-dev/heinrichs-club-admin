// src/lib/actions/tickets.js
import Api from "../../api/api";

export async function getTickets({
                                     page = 1,
                                     limit = 50,
                                     department = "",
                                     role = "all",
                                 } = {}) {

    const params = new URLSearchParams();

    params.append("page", page);
    params.append("limit", limit);

    // only send if has value
    if (department) params.append("department", department);
    if (role && role !== "all") params.append("role", role);

    // ------- FIRST REQUEST -------
    let res = await Api.get(`/ticket?${params.toString()}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });

    // ------- TOKEN EXPIRED → REFRESH --------
    if (res.status === 201) {
        await Api.get("refresh.php", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });

        // re-fetch after refresh
        res = await Api.get(`/ticket?${params.toString()}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });
    }

    return res.data;
}


export async function createTicket({ user_id, department_id, subject, content, role, status_id }) {
    try {
        const res = await Api.post("/ticket",
            { user_id, department_id, subject, content, role, status_id },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return res.data;

    } catch (err) {
        throw err.response?.data || err;
    }
}

export async function fetchTicketContents(ticket_id) {
    try {
        const res = await Api.get(`/ticket/${ticket_id}`, {
            withCredentials: true,
        });
        return res.data; // assuming backend returns { items: [...] }
    } catch (err) {
        console.error("Failed to fetch ticket contents:", err);
        throw err;
    }
}

export async function createTicketReply(data, ticketId) {
    try {
        const res = await Api.post(`/ticket/${ticketId}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return res.data;

    } catch (err) {
        throw err.response?.data || err;
    }
}


export async function fetchTicketById(ticketId) {
    const res = await Api.get(`/ticket?ticket_id=${ticketId}`,{
        withCredentials: true,
    });
    if (!res.data) throw new Error(res.data.message || "Ticket not found");
    return res.data.data;
}