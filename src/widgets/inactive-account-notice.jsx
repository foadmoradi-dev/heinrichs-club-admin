const InactiveAccountNotice = () => {
    return (
        <div
            role="alert"
            className="mx-auto my-6 max-w-xl rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm"
        >
            <div className="flex items-start gap-3">
                <svg
                    className="h-6 w-6 flex-none text-red-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M12 8v4"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12 16h.01"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>

                <div>
                    <p className="font-semibold text-red-800">Your Account Not Activated</p>
                </div>
            </div>
        </div>
    )
}

export default InactiveAccountNotice