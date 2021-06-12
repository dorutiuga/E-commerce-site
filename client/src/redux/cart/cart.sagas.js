import {all, call, takeLatest, put, select} from 'redux-saga/effects';

import UserActionType from '../user/user.types';
import { getUserCartRef } from '../../firebase/firebase.utils';
import {  selectUtilizatorCurent } from '../user/user.selectors';
import {clearCart, setCartFromFirebase } from './cart.actions';
import { selectCartItems } from './cart.selectors';
import CartActionTypes from './cart.types';

export function* clearCartOnSignOut(){
    yield put(clearCart());
}


export function* updateCartInFirebase() {
    const utilizatorCurent = yield select(selectUtilizatorCurent);
    if (utilizatorCurent) {
      try {
        const cartRef = yield getUserCartRef(utilizatorCurent.id);
        const cartItems = yield select(selectCartItems);
        yield cartRef.update({ cartItems });
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  export function* checkCartFromFirebase({ payload: user }) {
    const cartRef = yield getUserCartRef(user.id);
    const cartSnapshot = yield cartRef.get();
    yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
  }
  export function* onUserSignIn() {
    yield takeLatest(UserActionType.SIGN_IN_SUCCESS, checkCartFromFirebase);
  }
  
  export function* onCartChange() {
    yield takeLatest(
      [
        CartActionTypes.ADD_ITEM,
        CartActionTypes.REMOVE_ITEM,
        CartActionTypes.CLEAR_ITEM_FROM_CART
      ],
      updateCartInFirebase
    );
  }
  export function* onSignOutSuccess(){
    yield takeLatest(UserActionType.SIGN_OUT_SUCCESS,clearCartOnSignOut )
}



export function* cartSagas() {
    yield all([call(onSignOutSuccess), call(onCartChange), call(onUserSignIn)]);
}