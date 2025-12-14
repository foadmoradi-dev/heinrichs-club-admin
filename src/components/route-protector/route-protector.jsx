import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../api/api";
import { fetchUserData } from "../../store/user-actions";

const RouteProtector = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginStatus = useSelector(state => state.userSlice.loggedIn);
    const [loading, setLoading] = useState(true);
    console.log(loginStatus);
    useEffect(() => {
        if (!loginStatus) {
            Api.get('/session.php', { withCredentials: true })
                .then(response => {
                    console.log(response);
                    if (response.data.loggedIn) {
                        dispatch(fetchUserData(response.data.data));
                    } else {
                        navigate('/login');
                    }
                })
                .catch(error => {
                    console.error('Session check error:', error);
                    navigate('/login');
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch, navigate, loginStatus]);

    if (loading) return <div>Loading...</div>;
    if (loginStatus) return children;
    return null;
};

export default RouteProtector;
