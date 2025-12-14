import { FiLogOut } from "react-icons/fi";
import { logoutUser } from "../../store/user-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";


const Header = ({ userId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        try {
            dispatch(logoutUser());
            navigate("/", { replace: true });
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <header
            className="flex items-center justify-between fixed top-0 w-full bg-gray-900 text-white px-4 sm:px-6 py-3 shadow-md z-50"
        >
            <div id="header-left" className="flex items-center">
                <p className="font-vazir font-bold text-sm sm:text-lg ms-2 sm:ms-0">
                    Welcome to Admin Dashboard
                </p>
            </div>
            <div className="flex justify-center items-center space-x-3 sm:space-x-5 ms-2 sm:ms-8">
                <button
                    className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-400 transition"
                    onClick={logoutHandler}
                >
                    <FiLogOut size={20} />
                    <span className="hidden sm:block font-medium">{"Logout"}</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
