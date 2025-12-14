import { useState } from "react";
import { FaFileInvoice, FaTimes } from "react-icons/fa";
import ReceiptTemplate from "./receipt-template";

export default function GuaranteeReceipt({ data }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            {/* Receipt Icon */}
            <FaFileInvoice
                size={20}
                className="text-indigo-600 cursor-pointer hover:scale-110 transition"
                onClick={() => setOpen(true)}
            />

            {/* Dialog */}
            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-4xl h-[90vh] overflow-y-auto relative p-6">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                            onClick={() => setOpen(false)}
                        >
                            <FaTimes size={18} />
                        </button>

                        {/* Title */}
                        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                            Guarantee Receipt
                        </h2>

                        {/* The Invoice (printable area inside the dialog) */}
                        <ReceiptTemplate data={data} />
                    </div>
                </div>
            )}
        </>
    );
}
