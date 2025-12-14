/*
    as I learned earlier, reducer function must be pure: side effect free, and synchronous function
    thunk function: is a function that delay an action until later
    never change the state of redux outside of reducer, because redux has own memory
    what is the action creator function:
    1 - this is a function that return another function
    2 - in this function we can useDispatch and run reducer to change the state
    3 - this function can accept side effect like fetch, because this is function is  thunk so this can run asynchronous function
    
*/
import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    user : null,
    loggedIn: false
}
const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers :{
        set (state, action){
            state.user = {...action.payload}
            state.loggedIn = true
        },
        unset(state){
            state.user = null
            state.loggedIn = false
        }
    }
})

// Create Action Creator to use redux with asynchronous task

export const userSliceActions = userSlice.actions
export default userSlice