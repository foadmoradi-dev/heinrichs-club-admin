export default function DepartmentsDropdown({
                                                value,
                                                onChange,
                                                label = "Department",
                                                placeholder = "Select Department",
                                                departments = [],
                                            }) {
    return (
        <div className="flex flex-col gap-1 w-full">

            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border rounded-lg lg:px-3 lg:py-2 lg:pr-8 px-2 py-1 pr-6 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                    <option value="">{placeholder}</option>
                    {departments.map((dep) => (
                        <option key={dep.id} value={dep.id}>
                            {dep.title}
                        </option>
                    ))}
                </select>

            </div>
        </div>
    );
}
