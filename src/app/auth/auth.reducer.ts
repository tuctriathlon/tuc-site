import {Action, createReducer, on} from '@ngrx/store';
import {login, logout} from './auth.actions';
import {UserModel} from './user.model';

interface AuthState {
  currentUser: null | UserModel;
}

export const initialState: AuthState = {
  currentUser: null
};
const authReducer = createReducer(
  initialState,
  on(login, (state: AuthState, {currentUser}) => ({currentUser})),
  on(logout, () => ({currentUser: null}))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
