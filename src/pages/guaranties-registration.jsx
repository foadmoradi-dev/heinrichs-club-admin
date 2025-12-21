// src/components/AddGuaranties/AddGuaranties.jsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import ExcelFileSelector from "../components/guaranties-registration/excel-file-selector";
import GuarantiesRegistrationLog from "../components/guaranties-registration/guaranties-registration-log";
import {postGuarantees} from "../lib/queries/guarantee-actions";

const GuarantiesRegistrationPage = () => {
    const [successList, setSuccessList] = useState([]);
    const [failedList, setFailedList] = useState([]);

    const uploadMutation = useMutation({
        mutationFn: postGuarantees,
        onSuccess: (data) => {
            const [valid, invalid] = data[0];
            setSuccessList(valid);
            setFailedList(invalid);
        },
    });

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: "binary" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // backend expects array of barcodes
            const barcodes = rows
                .map((row) => row[0])
                .filter(Boolean);

            uploadMutation.mutate(barcodes);
        };
    };

    return (
        <div className="max-w-3xl mx-auto mt-16 bg-white shadow-lg rounded-xl p-6">
            <h1 className="text-2xl font-semibold mb-4">
                Upload Guarantee Barcodes
            </h1>

            <ExcelFileSelector
                onFileSelect={handleFile}
                disabled={uploadMutation.isPending}
            />

            {uploadMutation.isPending && (
                <p className="mt-3 text-sm text-gray-500">
                    Uploading barcodes...
                </p>
            )}

            {uploadMutation.isError && (
                <p className="mt-3 text-sm text-red-600">
                    Upload failed. Please check file format.
                </p>
            )}

            <GuarantiesRegistrationLog
                successList={successList}
                failedList={failedList}
            />
        </div>
    );
};

export default GuarantiesRegistrationPage;
