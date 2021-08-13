import * as types from './actionTypes';

export const _addToWeapons = (weapon) => {
    return {
        type: types.ADD_WEAPON,
        payload: weapon
    }
}


