import { useQuery } from "@tanstack/react-query";

import {
    Tag,
    Layers,
    AlertCircle,
    Clock,
    Calendar,
} from "lucide-react";
import {fetchTicketById} from "../../lib/queries/ticket-actions";

export default function TicketInfo({ ticketId }) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["ticket", ticketId],
        queryFn: () => fetchTicketById(ticketId),
    });

    if (isLoading)
        return (
            <div className="p-6 bg-white rounded-2xl shadow-md w-[30%] animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );

    if (isError)
        return (
            <div className="p-6 bg-red-50 border border-red-300 rounded-xl w-72">
                <p className="text-red-600 font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error?.message || "Failed to load ticket info"}
                </p>
            </div>
        );

    const ticket = data;

    return (
        <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 w-72">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-600">
                <Tag className="w-5 h-5 text-indigo-500" />
                Ticket Info
            </h3>

            <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span><strong>Subject:</strong> {ticket.subject}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-gray-400" />
                    <span><strong>Department:</strong> {ticket.department_title}</span>
                </div>

                <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-gray-400" />
                    <span><strong>Status:</strong> {ticket.status_title}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span><strong>Priority:</strong> {ticket.priority}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>
            <strong>Created:</strong>{" "}
                        {new Date(ticket.created_at).toLocaleString()}
          </span>
                </div>
            </div>
        </div>
    );
}
