import {
    FaUserTie,
    FaEnvelope,
    FaPhone,
    FaGlobe,
    FaSms,
    FaCalendarAlt,
    FaEdit,
    FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ServiceInfoCard({ company, onDelete, onToggle }) {
    const navigate = useNavigate();

    return (
        <div className="relative bg-white rounded-xl border border-gray-200 shadow-2xl hover:shadow-md transition-all duration-300 overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-start p-4 border-b bg-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <FaUserTie className="text-blue-600" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-800 leading-tight">
                            {company.company_name}
                        </h2>
                        <p className="text-xs text-gray-500">
                            CEO: {company.company_manager}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Toggle */}
                    <button
                        onClick={() => onToggle(company)}
                        className={`relative w-9 h-5 rounded-full transition ${
                            company.is_active ? "bg-green-500" : "bg-gray-300"
                        }`}
                        title="Activate / Deactivate"
                    >
            <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                    company.is_active ? "right-0.5" : "left-0.5"
                }`}
            />
                    </button>

                    <button
                        onClick={() => navigate(`/dashboard/service-companies-management/${company.id}`)}
                        className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
                        title="Edit"
                    >
                        <FaEdit size={14} />
                    </button>

                    <button
                        onClick={() => onDelete(company)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                        title="Delete"
                    >
                        <FaTrash size={14} />
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-600">
                    <FaEnvelope className="text-gray-400" />
                    <span>{company.email}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                    <FaPhone className="text-gray-400" />
                    <span>{company.company_phone_customer || company.company_phone}</span>
                </div>

                {company.company_website && (
                    <div className="flex items-center gap-3 text-blue-600">
                        <FaGlobe className="text-gray-400" />
                        <a
                            href={company.company_website}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline truncate"
                        >
                            {company.company_website}
                        </a>
                    </div>
                )}

                <div className="flex items-center gap-3 text-gray-600">
                    <FaSms className="text-gray-400" />
                    <span>
            SMS Service:{" "}
                        <span
                            className={`font-medium ${
                                company.company_sms_service
                                    ? "text-green-600"
                                    : "text-gray-400"
                            }`}
                        >
              {company.company_sms_service ? "Enabled" : "Disabled"}
            </span>
          </span>
                </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t bg-gray-50 flex items-center gap-2 text-xs text-gray-500">
                <FaCalendarAlt />
                <span>
          Started at {new Date(company.start_at).toLocaleDateString()}
        </span>
            </div>
        </div>
    );
}
