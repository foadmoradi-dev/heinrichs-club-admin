import { useState } from "react";
import logo from "../../assets/logo/logo192.png";
import clsx from "clsx";
import {
    FiBook,
    FiFileText,
    FiHome,
    FiInfo,
    FiLogOut,
    FiPackage,
    FiShoppingCart,
    FiUser,
    FiUsers,

} from "react-icons/fi";
import { GiShield } from "react-icons/gi";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

const Sidebar = () => {
    const user = useSelector(state => state.userSlice.user);
    const [open, setOpen] = useState(false)

    return (
        <>
            <aside
                className={clsx(
                    "fixed top-10 h-full w-64 bg-gray-900 text-white flex flex-col py-6 shadow-2xl z-40",
                    "transform transition-all duration-300 ease-in-out",
                    "left-0 md:translate-x-0",
                )}
            >
                {/* Logo */}
                <div className="w-full flex justify-center mb-8 px-4">
                    <Link to="/" onClick={() => setOpen(false)}>
                        <img src={logo} alt="Company Logo" className="h-20 w-auto" />
                    </Link>
                </div>

                {/* Menu Section */}
                <nav className="flex flex-col gap-4 px-6 ">
                    {[
                        { title: "Dashboard", route: "/dashboard", icon: <FiHome size={20} /> },
                        { title: "Profile", route: "/dashboard/profile", icon: <FiInfo size={20} /> },
                        { title: "Employees", route: "/dashboard/employees-management", icon: <FiUser size={20} /> },
                        { title: "Tickets", route: "/dashboard/tickets-management", icon: <FiFileText size={20} /> },
                        { title: "Agents", route: "/dashboard/agents-management", icon: <FiBook size={20} /> },
                        { title: "Guarantees", route: "/dashboard/guaranties-management", icon: <GiShield size={20} /> },
                        { title: "Products", route: "/dashboard/products-management", icon: <FiUsers size={20} /> },
                        { title: "Customers", route: "/dashboard/customers-management", icon: <FiPackage size={20} /> },
                        { title: "Contents", route: "/dashboard/contents-managements", icon: <FiShoppingCart size={20} /> },
                        { title: "Orders", route: "/dashboard/orders-management", icon: <FiInfo size={20} /> },
                        { title: "Cards", route: "/dashboard/cards-management", icon: <FiInfo size={20} /> },
                        { title: "Service Companies", route: "/dashboard/service-companies-management", icon: <FiInfo size={20} /> },
                    ].map((item, index) => (
                        <Link
                            key={index}
                            to={item.route}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 hover:text-blue-400 transition"
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    ))}

                    {/* Logout */}
                    <button
                        type="submit"
                        className="flex items-center gap-3 text-red-400 hover:text-red-500 mt-auto"
                    >
                        <FiLogOut size={20} />
                        <span>{"Logout"}</span>
                    </button>
                </nav>
            </aside>

            {/* Mobile Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
