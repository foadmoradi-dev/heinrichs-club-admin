import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    role :""
}
const roleSlice = createSlice({
    name: "roleSlice",
    initialState,
    reducers :{
        setRole (state, action){
            state.role = action.payload
        },
        unsetRole(state){
            state.role = ""
        }
    }
})

// Create Action Creator to use redux with asynchronous task

export const roleSliceActions = roleSlice.actions
export default roleSlice