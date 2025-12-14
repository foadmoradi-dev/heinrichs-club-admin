import {userSliceActions} from "./user-slice";
import Api from "../api/api";


export const fetchUserData = (usr) => {
    return async (dispatch) => {
        try {
            const r = await Api.get(`${usr.role}/${usr.id}`, {
                header: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            })
            if (r.status === 201) {
                await Api.get('refresh.php', {
                    header: {
                        'Content-Type': "application/json"
                    },
                    withCredentials: true
                })
                const rr = await Api.get(`${usr.role}/${usr.id}`, {
                    header: {
                        'Content-Type': "application/json"
                    },
                    withCredentials: true
                })

                const user = {
                    firstname: rr.data.first_name,
                    lastname: rr.data.last_name,
                    email: rr.data.email,
                    phone_number: rr.data.phone_number,
                    id: rr.data.id,
                    isActive: rr.data.is_active,
                    level: rr.data.level ? rr.data.level : 0,
                    role:usr.role
                }
                console.log(user)
                dispatch(userSliceActions.set({...user}))
            } else {
                const user = {
                    firstname: r.data.first_name,
                    lastname: r.data.last_name,
                    email: r.data.email,
                    phone_number: r.data.phone_number,
                    id: r.data.id,
                    isActive: r.data.is_active,
                    level: r.data.level ? r.data.level : 0,
                    role:usr.role

                }
                console.log(user)
                dispatch(userSliceActions.set({...user}))

            }
        }
        catch(err)  {
        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            // Call backend logout
            await Api.get("/logout.php", {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            // Clear Redux state
            dispatch(userSliceActions.unset());
        } catch (err) {
            console.error("Logout failed", err);
        }
    };
};
