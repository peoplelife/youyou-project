import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./modules/ticketsStore";
import countReducer from "./modules/countsStore";
import userReducer from "./modules/userStore";
import searchReducer from "./modules/searchStore";
const store= configureStore({
    reducer: {
        tickets: ticketsReducer,
        counts:countReducer,
        user:userReducer,
        search:searchReducer
    }
})
export default store;