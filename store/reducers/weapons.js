// ['rune scimitar', 'rune sword'] -12-
// ADD_WEAPON = action.type
// [...weaponsArray, 'rune dagger'] => ['rune scimitar', 'rune sword', 'rune dagger'] -19-
import * as types from '../actions/actionTypes';
const weaponsReducer = (state = [], action) => {
    switch(action.type) {
        case types.ADD_WEAPON:
            return [...state, action.payload];
        default:
            return state;
    }
} 
export default weaponsReducer;