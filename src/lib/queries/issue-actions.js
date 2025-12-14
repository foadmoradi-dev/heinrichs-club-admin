// src/lib/queries/issue-actions.js
import api from "../../api/api";

export async function submitIssue(issueData) {
    const res = await api.post("issue",
        issueData,
        { withCredentials: true }
    );
    return res.data;
}

export const getIssues = async () => {
    const res = await api.get("issue", { withCredentials: true }); // adjust endpoint if needed
    return res.data;
};

export const updateIssueStatus = async (issueData) => {
    console.log(issueData);
    const res = await api.patch(`issue/${issueData.issueId}`, {status_id:issueData.statusId}, { withCredentials: true });
    return res.data;
};