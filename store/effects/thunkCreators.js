import { _addToWeapons } from '../actions/actionCreators';

export const addToWeapons = (weapon) => {
	return function (dispatch) {
        dispatch(_addToWeapons(weapon));
    };
};


