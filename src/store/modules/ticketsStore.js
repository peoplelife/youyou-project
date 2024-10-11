import { createSlice } from "@reduxjs/toolkit"
import { ticketsAPI } from "../../api/ticket"
import { loginAPI } from "../../api/login"
import { _setToken, _setUSERToken, getToken ,removeToken, removeUSERToken} from "../../pages/utils/token"
import router from "../../router"
import { message } from "antd"
const ticketsStore = createSlice({
    name: 'tickets',
    initialState: {
        tickets: [],
        cityName: localStorage.getItem("cityName")||"北京",
        orderInfo: {},
        token: getToken() || "",
        time:"",
        price:0,
        userInfo:{},
    },
    reducers: {
        setTicketsInfo(state, actions) {
            state.tickets = actions.payload
        },
        setCityName(state, actions) {
            state.cityName = actions.payload
            localStorage.setItem("cityName", actions.payload)
        },
        setOrderInfo(state, actions) {
            state.orderInfo = actions.payload
        },
        setToken(state, actions) {
            state.token = actions.payload
            _setToken(actions.payload)
        },
        setTime(state, actions) {
            state.time = actions.payload
        },
        setPrice(state, actions) {
            state.price = actions.payload
        },
        setUserinfo(state,actions){
            state.userInfo=actions.payload
            _setUSERToken(actions.payload.username)
            localStorage.setItem("id", actions.payload.userId)
        },
        clearUserinfo(state){
            state.token=''
            state.userInfo={}
            removeToken()
            removeUSERToken()
        },
    }
})
const { setTicketsInfo, setCityName, setOrderInfo, setToken,setPrice,setTime,setUserinfo,clearUserinfo } = ticketsStore.actions
const fetchTicketsInfo = (cityName) => {
    return async (dispatch) => {
        const res = await ticketsAPI(cityName)
        dispatch(setTicketsInfo(res.data))
    }
}
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        //发送异步请求 
        const res = await loginAPI(loginForm)
        if (res.code === "200") {
            dispatch(setToken(res.data.token))
            dispatch(setUserinfo({username:res.data.username,userId:res.data.userId,avatar:res.data.avatar}))
            router.navigate('/')
        }else if(res.code==="500"){
            message.error(res.message)
        }
    }
}

const ticketsReducer = ticketsStore.reducer
export { setTicketsInfo, fetchTicketsInfo, setCityName, setOrderInfo, setToken, fetchLogin,setPrice,setTime,setUserinfo,clearUserinfo }
export default ticketsReducer
