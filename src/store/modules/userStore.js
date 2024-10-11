import { createSlice } from "@reduxjs/toolkit"
import { getUserInfoAPI } from "../../api/user"
const userStore = createSlice({
    name:"user",
    initialState:{
        userInfo:{}
    },
    reducers:{
        setUserInfo(state, actions) {
            state.userInfo = actions.payload
        },
    }

})
const {setUserInfo}=userStore.actions
const fetchUserInfo = (id) => {
    return async (dispatch) => {
        const res = await getUserInfoAPI(id)
        dispatch(setUserInfo(res.data))
    }
}
const userReducer = userStore.reducer
export{setUserInfo,fetchUserInfo}
export default userReducer