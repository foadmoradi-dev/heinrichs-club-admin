// src/components/AddGuarantiesLog/AddGuarantiesLog.jsx
const GuarantiesRegistrationLog = ({ successList = [], failedList = [] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

            {/* Success */}
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-2 text-green-600">
                    Success List
                </h2>
                <p className="mb-2 text-sm">
                    <span className="font-bold">{successList.length}</span> uploaded successfully
                </p>
                <div className="h-64 overflow-y-auto space-y-1">
                    {successList.map((item, i) => (
                        <p key={i} className="text-sm text-purple-700">
                            {item} – Uploaded
                        </p>
                    ))}
                </div>
            </div>

            {/* Failed */}
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-2 text-red-600">
                    Failed List
                </h2>
                <p className="mb-2 text-sm">
                    <span className="font-bold">{failedList.length}</span> failed uploads
                </p>
                <div className="h-64 overflow-y-auto space-y-1">
                    {failedList.map((item, i) => (
                        <p key={i} className="text-sm text-red-700">
                            {item}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuarantiesRegistrationLog;
