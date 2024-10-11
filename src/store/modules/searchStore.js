import { createSlice } from "@reduxjs/toolkit"
import { searchAPI } from "../../api/search"
import arrSplit from "../../pages/utils/fields/arrSlice"
const searchStore = createSlice({
    name:"search",
    initialState:{
        searchInfo:{},
        searchCity:"",
        searchClass:"",
        searchCityClassList:{},
        searchList:[],
        searchRecommend:[],
        sum:[]
    },
    reducers:{
        setSearchInfo(state, actions) {
            state.searchInfo = actions.payload
        },
        setSearchCity(state, actions) {
            state.searchCity = actions.payload
        },
        setSearchClass(state, actions) {
            state.searchClass = actions.payload
        },
        setSearchCityClassList(state, actions) {
            state.searchCityClassList = actions.payload
        },
        setSearchList(state, actions) {
            state.searchList = actions.payload
        },
        setSearchRecommend(state, actions) {
            state.searchRecommend = actions.payload
        },
        setSum(state, actions){
            state.sum = actions.payload
        }
    }

})
const {setSearchInfo,setSearchCity,setSearchClass,setSearchCityClassList,setSearchList,setSearchRecommend,setSum}=searchStore.actions
const fetchSearchInfo = (params) => {
    return async (dispatch) => {
        const res = await searchAPI(params)
        dispatch(setSearchCityClassList({cityList:res.data?.cityList,category:res.data?.category}))
        // dispatch(setSearchList(res.data.concertByEsList ))
        dispatch(setSum(res.data?.concertByEsList))
        dispatch(setSearchList(arrSplit(res.data.concertByEsList,1, 7) ))
        dispatch(setSearchRecommend(res.data.recommend))
    }
}
const fetchSearchList=(params)=>{
    return async (dispatch)=>{
        const res = await searchAPI(params)
        dispatch(setSearchList(arrSplit(res.data.concertByEsList,1, 7) ))
        // dispatch(setSearchList(res.data.concertByEsList))
        dispatch(setSearchRecommend(res.data.recommend))
    }
}
const searchReducer = searchStore.reducer
export{setSearchInfo,fetchSearchInfo,setSearchCity,setSearchClass,setSearchCityClassList,setSearchList,fetchSearchList,setSearchRecommend,setSum}
export default searchReducer