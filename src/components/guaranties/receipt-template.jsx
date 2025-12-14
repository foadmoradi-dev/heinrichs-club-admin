import React, { useRef } from "react";
import { FaDownload } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import logo from "../../assets/logo/logo192.png";

export default function ReceiptTemplate({ data }) {
    const componentRef = useRef(null);

    if (!data) return null;

    const formattedDate = new Date(data.start_at).toLocaleDateString();

    const handleDownload = () => {
        const element = componentRef.current;
        if (!element) return alert("Nothing to print yet!");

        const options = {
            margin: 0.5,
            filename: `Guarantee-${data?.barcode || "Receipt"}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };

        html2pdf().set(options).from(element).save();
    };

    return (
        <div >
            {/* Printable content */}
            <div
                ref={componentRef}
                className="max-w-3xl mx-auto bg-white text-gray-800 p-8 shadow-lg rounded-xl border border-gray-200"
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <img src={logo} alt="Logo" className="h-20 w-auto" />
                    <div className="text-right">
                        <p className="text-xl font-semibold italic">HEINRICHS GmbH & Co</p>
                        <p className="italic text-gray-700">Rhine, Germany</p>
                        <p className="italic text-gray-700">Phone: +49 (152) 1356-7688</p>
                        <p className="italic text-gray-700">
                            Ramanco GmbH VirmondstraBe 135 47877 Willich
                        </p>
                    </div>
                </div>

                <div className="border-b-2 border-gray-300 mb-6"></div>

                {/* Billing Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-1">Bill To:</h3>
                        <p>{data.customer_name}</p>
                        <p>{data.customer_address}</p>
                        <p>{data.customer_phone_number}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700 mb-1">Activated By:</h3>
                        <p>{data.agent_name}</p>
                        <p>{data.agent_address}</p>
                        <p>{data.agent_phone_number}</p>
                    </div>
                </div>

                <div className="border-b-2 border-gray-300 mb-6"></div>

                {/* Product Table */}
                <table className="w-full border-collapse mb-8">
                    <thead>
                    <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
                        <th className="py-2 px-3 border-b">Barcode</th>
                        <th className="py-2 px-3 border-b">Model</th>
                        <th className="py-2 px-3 border-b">Price</th>
                        <th className="py-2 px-3 border-b">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{data.barcode}</td>
                        <td className="py-2 px-3">{data.product_model}</td>
                        <td className="py-2 px-3">{data.price}</td>
                        <td className="py-2 px-3">{formattedDate}</td>
                    </tr>
                    </tbody>
                </table>

                {/* Signatures */}
                <div className="grid grid-cols-2 mt-12">
                    <div>
                        <p className="font-semibold mb-12">Agent Signature:</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-12">Customer Signature:</p>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-500 italic">
                    Thank you for choosing Heinrichs — Quality guaranteed for 540 days.
                </p>
            </div>

            {/* Download Button */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-xl shadow-md transition active:scale-95"
                >
                    <FaDownload />
                    Download PDF
                </button>
            </div>
        </div>
    );
}
