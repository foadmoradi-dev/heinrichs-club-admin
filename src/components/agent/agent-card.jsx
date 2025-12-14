import { useState } from "react";
import {
    FaEdit,
    FaTrash,
    FaEnvelope,
    FaPhone,
    FaGlobe,
    FaLink,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "../../api/api";

const AgentCard = ({ agent }) => {
    const queryClient = useQueryClient();

    const [isActive, setIsActive] = useState(agent.is_active === 1);
    const [level, setLevel] = useState(agent.level);
    const [webActive, setWebActive] = useState(agent.web_active === 1);
    const [socialActive, setSocialActive] = useState(agent.social_active === 1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Update mutation
    const updateAgent = async ({ id, updatedData }) => {
        const res = await Api.patch(`/agent/${id}`, updatedData);
        return res.data;
    };

    const updateMutation = useMutation({
        mutationFn: updateAgent,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["agents"],
                exact: false,
            });
        },
    });

    // Delete mutation
    const deleteAgent = async (id) => {
        const res = await Api.delete(`/agent/${id}`);
        return res.data;
    };

    const deleteMutation = useMutation({
        mutationFn: deleteAgent,
        onSuccess: () => {
            queryClient.invalidateQueries(["agents"]);
            setShowDeleteModal(false);
        },
    });

    // Toggle switch component
    const ToggleSwitch = ({ checked, onChange }) => (
        <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
            <div
                className={`w-12 h-6 rounded-full transition-colors ${
                    checked ? "bg-green-500" : "bg-gray-300"
                }`}
            />
            <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    checked ? "translate-x-6" : ""
                }`}
            />
        </label>
    );

    // Handlers
    const handleToggleAgentActive = () => {
        const newStatus = !isActive;
        setIsActive(newStatus);
        updateMutation.mutate({ id: agent.id, updatedData: { is_active: newStatus ? 1 : 0 } });
    };

    const handleToggleWebActive = () => {
        const newStatus = !webActive;
        setWebActive(newStatus);
        updateMutation.mutate({ id: agent.id, updatedData: { cert: { is_active: newStatus ? 1 : 0 } } });
    };

    const handleToggleSocialActive = () => {
        const newStatus = !socialActive;
        setSocialActive(newStatus);
        updateMutation.mutate({ id: agent.id, updatedData: { cert: { social_active: newStatus ? 1 : 0 } } });
    };

    const handleLevelChange = (e) => {
        const newLevel = parseInt(e.target.value, 10);
        setLevel(newLevel);
        updateMutation.mutate({ id: agent.id, updatedData: { level: newLevel } });
    };

    // Helper to show value or placeholder
    const displayField = (field) => field || "---";

    return (
        <>
            <div
                className={`p-5 rounded-2xl shadow-md border transition hover:shadow-lg ${
                    isActive ? "bg-white border-gray-200" : "bg-red-50 border-red-200"
                } flex flex-col justify-between h-full`}
            >
                {/* Top Row: Name + Actions */}
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {displayField(agent.first_name)} {displayField(agent.last_name)}
                        </h2>
                    </div>

                    <div className="flex gap-3 items-center">
                        <FaEdit
                            className="text-blue-500 text-xl cursor-pointer hover:text-blue-700 transition"
                            onClick={() =>
                                (window.location.href = `/dashboard/agents-management/${agent.id}`)
                            }
                        />
                        <FaTrash
                            className="text-red-500 text-xl cursor-pointer hover:text-red-700 transition"
                            onClick={() => setShowDeleteModal(true)}
                        />
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-4 space-y-2 text-gray-700">
                    <p className="flex items-center gap-2">
                        <FaEnvelope className="text-blue-500" /> {displayField(agent.email)}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaPhone className="text-green-600" /> {displayField(agent.phone_number)}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />{" "}
                        {displayField(agent.full_address)}, {displayField(agent.address_country)}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaGlobe className="text-indigo-600" /> {displayField(agent.web_address)}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaLink className="text-pink-600" /> {displayField(agent.social_address)}
                    </p>
                </div>

                {/* Bottom Controls */}
                <div className="mt-5 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Agent Active</span>
                        <ToggleSwitch checked={isActive} onChange={handleToggleAgentActive} />
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-medium">Web Active (cert)</span>
                        <ToggleSwitch checked={webActive} onChange={handleToggleWebActive} />
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-medium">Social Active (cert)</span>
                        <ToggleSwitch checked={socialActive} onChange={handleToggleSocialActive} />
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-medium">Level</span>
                        <select
                            value={level}
                            onChange={handleLevelChange}
                            className="border rounded-lg px-2 py-1"
                        >
                            {[1, 2, 3, 4].map((lvl) => (
                                <option key={lvl} value={lvl}>
                                    {lvl}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-80">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Confirm Delete
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Are you sure you want to delete{" "}
                            <strong>
                                {displayField(agent.first_name)} {displayField(agent.last_name)}
                            </strong>
                            ?
                        </p>

                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                onClick={() => deleteMutation.mutate(agent.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AgentCard;
