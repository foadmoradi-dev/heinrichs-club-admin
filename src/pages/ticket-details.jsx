import TicketInfo from "../components/tickets/ticket-info";
import ReplyForm from "../components/tickets/replay-form";
import {fetchTicketContents} from "../lib/queries/ticket-actions";
import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {useSelector} from "react-redux";

export default function TicketDetailsPage() {
    const user = useSelector((state) => state.userSlice.user);
    console.log(user);
    const { ticketId } = useParams();

    const { data: messages, isLoading } = useQuery({
        queryKey: ["ticketContents", ticketId],
        queryFn: () => fetchTicketContents(ticketId),
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="flex gap-6 p-6">
            {/* Messages and reply form */}
            <div className="flex-1 flex flex-col">
                <div className="flex flex-col space-y-4 w-full">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`max-w-sm p-4 rounded-lg ${
                                msg.role !== "admin"
                                    ? "bg-blue-100 self-start"
                                    : "bg-gray-100 self-end"
                            }`}
                        >
                            <div className="text-sm text-gray-600 mb-1">
                                {msg.role !== "admin" ? "User" : "Admin"} •{" "}
                                {new Date(msg.created_at).toLocaleString()}
                            </div>
                            <div className="prose lg:prose-xl max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reply form */}
                <ReplyForm ticketId={ticketId} userId={user.id} role={user.role} />
            </div>

            {/* Ticket Info Sidebar */}
            <TicketInfo ticketId={ticketId} />
        </div>
    );
}