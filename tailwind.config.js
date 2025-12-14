/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                unified: ['Unified', 'sans-serif'],
                noto: ['"Noto Sans Arabic"', 'sans-serif'],
            },
        },
    },
    plugins: [
    ],
};
