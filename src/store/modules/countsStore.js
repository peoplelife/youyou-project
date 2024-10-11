import {createSlice} from "@reduxjs/toolkit"
const counterStore=createSlice({
    name:'counter',
    initialState:{
        count:1
    },
    reducers:{
        inscrement(state){
            if(state.count<4){
                state.count++
            }
        },
        decrement(state){
            if(state.count>1){
                state.count--
            }
        }
    }
})
const {inscrement,decrement}=counterStore.actions
const countReducer=counterStore.reducer
export{inscrement,decrement}
export default countReducer