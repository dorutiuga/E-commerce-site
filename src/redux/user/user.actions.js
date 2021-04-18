import {UserActionType} from './user.types';
export const setUtilizatorCurent = user => ({
    type: UserActionType.SET_UTILIZATOR_CURENT,
    payload : user
})