import {configureStore} from "@reduxjs/toolkit"

import roleSlice from "./roleSlice"
const store = configureStore({
    reducer:{
        roleSlice: roleSlice.reducer,
    }
})

export default store