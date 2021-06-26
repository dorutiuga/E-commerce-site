import {takeLatest, put, all, call} from 'redux-saga/effects';
import UserActionType from './user.types';
import {auth, googleProvider , dateUtilizator, getUtilizatorCurent} from '../../firebase/firebase.utils'
import { signInSucces, signInFailure, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess} from './user.actions';

export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try{
    const userRef = yield call(dateUtilizator, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(signInSucces({ id: userSnapshot.id, ...userSnapshot.data() }));
} catch(error){
    yield put(signInFailure(error));
}
}

export function* signInWithGoogle() {
    try {
      const { user } = yield auth.signInWithPopup(googleProvider);
      yield getSnapshotFromUserAuth(user);
    } catch (error) {
      yield put(signInFailure(error));
    }
  }
  
  export function* signInWithEmail({ payload: { email, password } }) {
    try {
      const { user } = yield auth.signInWithEmailAndPassword(email, password);
      yield getSnapshotFromUserAuth(user);
    } catch (error) {
      yield put(signInFailure(error));
      alert("The password is invalid or the user does not have a password.")
    }
  }
  export function* isUserAtuhenticated(){
    try{
        const userAuth = yield getUtilizatorCurent();
        if(!userAuth) return ;
        yield getSnapshotFromUserAuth(userAuth);
    }catch(error){
        yield put(signInFailure(error))
    }
  }
export function* onGoogleSignInStart() {
    yield takeLatest(UserActionType.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signOut() {
    try {
      yield auth.signOut();
      yield put(signOutSuccess());
    } catch (error) {
      yield put(signOutFailure(error));
    }
  }
  export function* signUp({ payload: { email, password, displayName } }) {
    try {
      const { user } = yield auth.createUserWithEmailAndPassword(email, password);
      yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {  
      yield put(signUpFailure(error));
    }
  }
  export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
  }
export function* onEmailSignInStart(){
    yield takeLatest(UserActionType.EMAIL_SIGN_IN_START, signInWithEmail)
}
export function* onCheckUserSession(){
    yield takeLatest(UserActionType.CHECK_USER_SESSION,isUserAtuhenticated )
}

export function* onSignOutStart(){
    yield takeLatest(UserActionType.SIGN_OUT_START,signOut)
}
export function* onSignUpStart(){
    yield takeLatest(UserActionType.SIGN_UP_START, signUp)
}
export function* onSignUpSuccess() {
    yield takeLatest(UserActionType.SIGN_UP_SUCCESS, signInAfterSignUp);
  }
  
export function* userSagas(){
    yield all([
         call(onGoogleSignInStart),
         call(onEmailSignInStart), 
         call(isUserAtuhenticated),
         call(onSignOutStart),
         call(onSignUpStart),
         call(onSignUpSuccess)

        ])
}