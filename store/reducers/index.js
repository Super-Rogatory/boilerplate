import { combineReducers } from "redux";
import weaponsReducer from "./weapons";

const combinedReducer = combineReducers({
    weapons: weaponsReducer
})

export default combinedReducer;