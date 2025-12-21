// src/components/ExcelFileSelector/ExcelFileSelector.jsx
import { useState } from "react";

const ExcelFileSelector = ({ onFileSelect, disabled }) => {
    const [fileName, setFileName] = useState("File must be .xls or .xlsx");

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const ext = file.name.split(".").pop().toLowerCase();
        if (ext === "xls" || ext === "xlsx") {
            setFileName(file.name);
            onFileSelect(file);
        } else {
            setFileName("Invalid file format");
        }
    };

    return (
        <div className="space-y-2">
            <label className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700">
                Browse
                <input
                    type="file"
                    className="hidden"
                    disabled={disabled}
                    onChange={handleChange}
                />
            </label>
            <p className="text-sm text-gray-600">{fileName}</p>
        </div>
    );
};

export default ExcelFileSelector;
