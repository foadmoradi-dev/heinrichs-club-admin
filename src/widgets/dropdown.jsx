import { useState, useRef, useEffect } from "react";

export default function Dropdown({
                                     label,
                                     options = [],
                                     value,
                                     onChange,
                                     placeholder = "Select an option...",
                                     lang = "en", // current language
                                     getValue = (item) => item.value ?? item.bre,
                                 }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Detect click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        onChange(getValue(item));
        setOpen(false);
    };

    const getLabel = (item) => {
        if (!item) return placeholder;
        return item.name?.[lang] || item.name || placeholder;
    };

    // Use document's direction attribute
    const isRTL = document.documentElement.getAttribute("dir") === "rtl";

    return (
        <div className="relative w-64" dir={isRTL ? "rtl" : "ltr"} ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-left text-gray-700 flex justify-between items-center hover:border-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
                <span>{value ? getLabel(options.find((opt) => getValue(opt) === value)) : placeholder}</span>
                <svg
                    className={`w-4 h-4 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <ul className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                    {options.map((opt) => (
                        <li
                            key={getValue(opt)}
                            onClick={() => handleSelect(opt)}
                            className={`px-3 py-2 cursor-pointer hover:bg-indigo-50 ${
                                getValue(opt) === value ? "bg-indigo-100 font-medium" : ""
                            }`}
                        >
                            {getLabel(opt)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
