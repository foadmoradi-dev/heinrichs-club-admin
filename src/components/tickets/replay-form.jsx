import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import { createTicketReply } from "../../lib/queries/ticket-actions";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";

export default function ReplyForm({ ticketId, userId, role }) {
    const [content, setContent] = useState("");
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: (data) => createTicketReply(data, ticketId),
        onSuccess: (res) => {
            if (res.success) {
                toast.success(res.message || "Ticket created successfully!");
                queryClient.invalidateQueries({ queryKey: ["ticket-content", ticketId] });
                setContent("");

                // ✅ Navigate to the newly created ticket page
                navigate(`/dashboard/tickets-management/${ticketId}`);
            } else {
                toast.error(res.message || "Failed to create ticket");
            }
        },
        onError: (err) => toast.error(err.message || "Failed to send reply"),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) {
            toast.error("Message cannot be empty");
            return;
        }
        mutation.mutate(
            {
                ticket_id: ticketId,
                content: content,
                writer_id: userId,
                role: role,
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            <Editor
                apiKey="33rdsixt53ker06nvc51l1xfb66b1k96yarlyb91sgu6mzhb" // optional, or use your TinyMCE cloud key
                value={content}
                onEditorChange={(newValue) => setContent(newValue)}
                init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                        "advlist", "autolink", "lists", "link", "charmap", "preview",
                        "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                        "insertdatetime", "table", "code", "help", "wordcount"
                    ],
                    toolbar:
                        "undo redo | bold italic underline | bullist numlist | link | preview",
                    content_style: `
            body { font-family:Inter,Arial,sans-serif; font-size:14px; color:#333; }
            p { margin: 0; }
          `,
                }}
            />

            <button
                type="submit"
                disabled={mutation.isPending}
                className={`self-end px-5 py-2 rounded-lg text-white font-medium transition
          ${mutation.isPending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"}
        `}
            >
                {mutation.isPending ? "Sending..." : "Send Reply"}
            </button>
        </form>
    );
}
